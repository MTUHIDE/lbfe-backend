module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'PhoneNumbers', // Leave as non-spaced word
        {
            // The issue seems to be limited to the constraints. For future reference, here is a link to the docs:
            // https://sequelize.org/docs/v7/core-concepts/validations-and-constraints/
            // TODO: Delete me! - There can only be one primary key

            phoneNumberId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'phoneNumberId',
                primaryKey: true,
                autoIncrement: true,
                searchable: true,
                alias: 'Phone Number ID',
                aliasValue: 'phoneNumberId',
            },
        
            // TODO: Delete me! - Removing primary key from all other attributes will fix it
            // TODO: Delete me! - There is another issue. autoIncrement will do a +1 in the SQL table.
            // TODO: Delete me! - Since this is a reference to driverID/elderID, we don't want that (we want to specify the ID manually)
            // TODO: Delete me! - So, we can remove the autoIncrement as well. Additionally, this should be an int
            referenceId:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'referenceId',
                searchable: true,
                alias: 'Reference ID',
                aliasValue: 'referenceId',
            },

            // TODO: Delete me! - If an attribute is empty, leave it commented out until you know what to do with it. 
            // referenceType:{

            // },

            phoneNumber:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'phoneNumber',
                searchable: true,
                alias: 'Phone Number',
                aliasValue: 'phoneNumber',
            },

            phoneExtension:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'phoneExtension',
                searchable: true,
                alias: 'Phone Extension',
                aliasValue: 'phoneExtension',
            },

            description:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'description',
                searchable: true,
                alias: 'Description',
                aliasValue: 'description',
            },

            order:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'order',
                searchable: true,
                alias: 'Order',
                aliasValue: 'order',
            },
        },
        {
            tableName: "PhoneNumbers", // leave as non-spaced word
            timeStamps: false,
        }   
        )     
    };