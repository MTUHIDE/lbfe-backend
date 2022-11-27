'use-strict';

const config = require("../config/config")
const fs = require("fs");
const db = require("../models")
const logger = require("../logger/logger")
const { DataTypes } = require("sequelize");
const path = require("path");
const _ = require("lodash");

// We will leverage our structs created in 'Models' to populate some tables
// Each function assumes you are passing it a sequelize object

// Replicate the useful things we need from a table
var TableObject = function (name, columns, columnCount, rows) {
    this.name = name
    this.columns = columns
    this.columnCount = columnCount
    this.rows = rows
}

// Global counters to help show things at the end
let warningCount = 0;
let errorCount = 0;

module.exports = {

    // Some simple functions to standardize our output to the logs
    logMessage(message) {
        logger.info(`[DB-Manager] ${message}`)
    },

    logWarning(message) {
        this.logMessage(`[WARNING]: ${message}`)
        warningCount++
    },

    logError(message) {
        this.logMessage(`[ERROR]: ${message}`)
        errorCount++
    },

    // Loads all current tables and their connected columns into a tables object
    async loadConnectedDBSchema(sequelize) {
        let dbTables = []

        const raw = (await sequelize.query(`
            SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES;
        `, { raw: true })).map((res) => {
            return res
        })

        // Snag the name of the tables + total table count
        const tables = raw[0]
        const tableCount = raw[1]

        // Load all table schema
        for (var i = 0; i < tableCount; i++) {
            const name = tables[i].TABLE_NAME
            const { columns, columnCount } = await this.getTableAttributes(sequelize, name)
            dbTables.push(new TableObject(name, columns, columnCount))
        }

        return dbTables
    },

    async getTableAttributes(sequelize, tableName) {
        const results = (await sequelize.query(`
                SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
                    WHERE TABLE_NAME='${tableName}';
            `, { raw: true }))

        // Scrape the 'COLUMN_NAME' off the objects 
        let columns = results[0]
        columns = columns.map((c) => {
            return c.COLUMN_NAME
        })
        const columnCount = results[1]

        return {columns, columnCount}
    },

    // Load all models from the '/models' directory 
    async loadLocalModels(parentDir) {
        const basename = 'index.js'; // This is not a table
        const dir = parentDir + "/models"
        let localTables = []

        fs.readdirSync(dir)
            .filter(file => {
                // Trim extension
                return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
            })
            .forEach(file => {
                // Export models under 'db.models' --> Lets us use sequelize to call our tables in javascript by using 'db.modelName'
                const model = require(path.join(dir, file))(db.driverScheduler, DataTypes);
                model.sync() // Cheat code, auto instantiates if it doesn't exist
                const columns = model.rawAttributes

                // Snag columnCount
                let columnCount = 0;
                for (c in columns) { columnCount++ }

                localTables.push(new TableObject(model.name, columns, columnCount))
            });

        return localTables
    },

    // Search the '/seeders' folder for matching 'tableName' to seed
    async loadLocalSeedData(parentDir, tableName) {
        const seedFile = parentDir + "/seeders/" + tableName + "SeedMeta.js"

        try { // Try to read the meta. If we can, then return true (since we did load and ran whatever was in there)
            const data = fs.readFileSync(seedFile, 'utf8');
            console.log(data);
          } catch (err) {
            console.error(err);
          }

        return false

    },

    // If the databases are entirely empty, and we are in a dev environment, 
    // and there is meta for it --> seed it
    async checkIfEmpty(sequelize, dbTable, parentDir) {
        if ((dbTable.name) && config.app === 'dev') {
            // Look for rows in the table
            const result = await sequelize.query(
                `SELECT 1 FROM [dbo].[${dbTable.name}]
                    WHERE EXISTS( SELECT [${dbTable.columns[0]}] FROM [dbo].[${dbTable.name}]);`
                , { raw: true })
            
            const tableName = dbTable.name
            if (result[1] == 0 && tableName != "Sessions") { // If there's nothing, seed it
                if (config.db_dev_auto_seed) {
                    this.logMessage(`The following table is empty: '[dbo].[${tableName}]'`)
                    this.logMessage(`Auto seed is on! Loading seed meta for '[dbo].[${tableName}]'...`)

                    const foundMeta = await this.loadLocalSeedData(parentDir, tableName )

                    if (foundMeta) {
                        this.logMessage(`--> Loaded seed meta for '[dbo].[${tableName}]'.`)
                        this.logMessage(`--> Successfully seeded '[dbo].[${tableName}]'!`)
                    } else {
                        this.logWarning(`No seed data for '[dbo].[${tableName}]'`);
                        this.logMessage(`--> Failed to seed data for '[dbo].[${tableName}]'`);
                    }

                } else {
                    this.logWarning(`The following table is empty: '[dbo].[${tableName}]'.`)
                    this.logMessage(`Try setting 'DB_DEV_AUTO_SEED=true' in your local environment.`)
                }
            }
        }
    },

    // Brute force check all local models against loaded db schemas (this gets nasty)
    async compareSchema(sequelize, db, local, parentDir) {
        let synced = false

        // Loop Local Models
        for (let i = 0; i < local.length; i++) {
            let localTable = local[i]

            // If we stalling start balling (our eyes out)
            // Loop DB Models
            for (let j = 0; j < db.length; j++) {
                let dbTable = db[j]

                // Find a matching table name
                if (localTable.name === dbTable.name) {

                    // There's no way they match if we have more columns in '/models'...
                    if (localTable.columnCount > dbTable.columnCount) {
                        await this.attemptAutoRefresh(sequelize, dbTable, localTable)
                    }

                    // If we can't cheat and use column names, deep look at every column
                    for (localColumn in localTable.columns) {
                        synced = false; // Reset on every column
                        for (let k = 0; k < dbTable.columns.length; k++) {
                            dbColumn = dbTable.columns[k]

                            // If we find a match -> die
                            if (localColumn === dbColumn) {
                                synced = true;
                                break;
                            }
                        }
                        if (!synced) {
                            await this.attemptAutoAlter(sequelize, dbTable, localTable, localColumn)
                        }
                    }

                    // Be nice to the devs, maybe they want free seed data
                    await this.checkIfEmpty(sequelize, dbTable, parentDir)
                }
            }
            // If we bottom out to here, them somehow this table didn't get synced. Make sure it's known
            if (!synced) this.logWarning(`Unsynced table: '[dbo].[${localTable.name}]' !!!`)
        }
        return synced
    },

    // Try to alter the table. On fail, abort to refresh
    async attemptAutoAlter(sequelize, dbTable, localTable, missingColumn) {

        if (config.app === 'dev') {
            if (config.db_dev_auto_fix) { // If we have the right to auto-fix, do it
                this.logWarning(`Missing column: '[${missingColumn}]' on '[dbo].[${dbTable.name}]'`)
                this.logMessage(`--> Auto Resolve enabled! Attempting to add column...`)

                const columnMeta = localTable.columns[`${missingColumn}`]
                let columnType = columnMeta.type
                if (columnType.toString() === 'NVARCHAR(255)')
                    columnType = 'VARCHAR(255)'

                // Find the meta for our missing column and try to add it
                // NOTE: We're using raw queries here. This is not best practice
                await sequelize.query(
                    `ALTER TABLE ${dbTable.name} ADD ` +
                    `[${missingColumn}] [${columnType}];`,
                    { raw: true, logging: console.log }
                )

                const { columns, columnCount } = await this.getTableAttributes(sequelize, dbTable.name)

                console.log(columns, columnCount)

            } else {
                this.logError(`Missing column: '[${missingColumn}]' on '[dbo].[${dbTable.name}]'`)
                this.logMessage(`--> Auto resolve is disabled by default. Try to resolve manually first.`)
                if (config.app === 'dev')
                    this.logMessage(`--> Alternatively, set 'DB_DEV_AUTO_FIX=true' in your env file.`)
            }
        } else {
            this.logError(`Missing column: '[${missingColumn}]' on '[dbo].[${dbTable.name}]'`)
            this.logMessage(`--> Not a development environment. Contact your adminstration.`)
        }

    },

    // Attempt a refresh cycle on a given table. We basically just kill the service
    // to force the user to restart, where sequelize will detect and fix the tables
    // for us. Returns true on success, false otherwise
    async attemptAutoRefresh(sequelize, dbTable, localTable) {
        const totalAttempts = 5;
        let attemptCount = 0;

        // Spin for a minute (sometimes SQL gets backed up with traffic)
        for (; attemptCount < totalAttempts;) {

            const success = await this.refreshTable(sequelize, dbTable, localTable)
            await setTimeout(() => {
                // Stalling here to wait for SQL
                sequelize.sync();
            }, 2);
            if (success) { return true; }
            attemptCount++ // Force hold on whatever SQL is working on
        }
        return false; // Choose to die by default
    },


    // Drop, and Recreate the table (in dev mode only) Return true on success, else false
    async refreshTable(sequelize, db, local) {
        try {
            // Drop the table --> This kills sequelize internally, killing the service
            // ! This is dangerous (Don't be playing around with droping tables)
            // This is only a feature if you need to hard reset tables until things are functional
            // In most cases, going to SQL and manually dropping will be easier. Promise.

            // DO NOT RUN THIS OUTSIDE OF YOUR DEVELOPMENT ENVIRONMENT
            if (config.app === 'dev') {


                // Commenting out the below block so YOU don't do anything stupid
                // =================================
                // this.logWarning(`Calling drop of ${db.name}. Hold on to your butts!`) // TODO - Add userId, IP, whatever to this log
                // this.logMessage(`You will need to restart the service.`)
                // await sequelize.query(
                //     `DROP TABLE ${db.name};`,
                //     { raw: true, logging: console.log })
                // =================================


                // Comment out this next block (upon uncommenting the above)
                // if you want your logs to be pretty
                // =================================
                this.logMessage(`--> Auto resolve is disabled by default. Try to resolve manually first.`)
                this.logMessage(`--> code can be found in '/server/migrations/dbManager.js:214:214'`)
                // =================================

                // DO NOT EVER PUSH CHANGES TO THIS TO REMOTE

            } else {
                this.logError(`Not a development environment. Contact your adminstration.`)
            }
            sequelize.sync()
            return true
        } catch (err) { console.log(err) }

        return false; // default to stop whatever refresh cycles are happening
    },

    // Promises are funky, we need to wait while we calculate 
    // ==> SO this job happens asyncronously and might crash regardless of us
    //     trying to resolve any issues... (yeehaw)
    async detectDatabase(sequelize, parentDir) {
        try {
            this.logMessage(`Running db verification...`)
            const dbModels = await this.loadConnectedDBSchema(sequelize)
            const localModels = await this.loadLocalModels(parentDir)

            // If there are no tables, we can call it quits now
            if (!dbModels)
                this.logMessage(`No database schema found. Check Connection.`)
            else if (!localModels)
                this.logMessage(`No local schema found. Check Configuration.`)
            else {
                // Deep compares each row in every table
                await this.compareSchema(sequelize, dbModels, localModels, parentDir)
            }

            // In theory, we'll error out or die before we get here
        } catch (err) { console.log(err) }

        if ((warningCount != 0) || (errorCount != 0))
            this.logMessage(`Finished with ${errorCount} errors and ${warningCount} warnings.`)
        else
            this.logMessage(`Done! Happy coding :) `)
    },

    // This function takes all loaded connected DB schema, and generates a backup json object.
    // This solves several problems. One, it logs everything so we can always come back to blame,
    // Two, we call this function before any other function is permitted to make changes to 
    // the DB. This helps us because now we have a version controlled history of migrations,
    // and can use these schema to revert changes in a pinch if need be. 
    async generateBackup() {
        let migrationFileName = "SomethingCool.js" // TODO - this whole function lol
        this.logMessage(`Generating backup... `)
        this.logMessage(`Done! --> '/server/migrations/${migrationFileName}.js'`)
    },

}