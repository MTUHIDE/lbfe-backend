const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const CONFIG = require("../config/config");

const basename = path.basename(__filename);

// Define a struct for calling our DB connection
const db = {
    driverScheduler: new Sequelize(
        CONFIG.db_name,
        CONFIG.db_user,
        CONFIG.db_password,
        {
            host: CONFIG.db_host,
            dialect: 'mssql',
            port: CONFIG.db_port,
            logging: CONFIG.db_logging,
            pool: {
                max: 25,
                min: 0,
                acquire: 20000,
                idle: 10000,
                eviction: 10000,
            },
            dialectOptions: {
                encrypt: true,
                requestTimeout: 30000,
                packetSize: 32768,
                options: {
                    validateBulkLoadParameters: true,
                }
            }
        }
    )
};

// Build our sequalize connection to the driver scheduler database
db.Sequelize = Sequelize;

// Trims files from 'this' directory to use for casting to the appropriate model
// This lets us import everything in './models' by simply just having it in './models'
fs.readdirSync(__dirname)
    .filter(file => {
        // Trim extension
        return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
    })
    .forEach(file => {
        // Export models under 'db.models' --> Lets us use sequelize to call our tables in javascript by using 'db.modelName'
        const model = require(path.join(__dirname, file))(db.driverScheduler, DataTypes);
        db[model.name] = model;
        model.sync()
    });

// Load Foreign Keys into sequelize so it doesn't autogenerate
Object.keys(db).forEach(modelName => {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

module.exports = db;
