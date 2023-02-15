module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'PhoneNumbers',
        {

            phoneNumberId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'phoneNumberId',
                primaryKey: true,
                autoIncrement: true,
                searchable: true,
                alias: 'Phone Number ID',
                aliasValue: 'phoneNumberId',
            },
            referenceId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'referenceId',
                searchable: true,
                alias: 'Reference ID',
                aliasValue: 'referenceId',
            },

            // referenceType:{

            // },

            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'phoneNumber',
                searchable: true,
                alias: 'Phone Number',
                aliasValue: 'phoneNumber',
            },
            phoneExtension: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'phoneExtension',
                searchable: true,
                alias: 'Phone Extension',
                aliasValue: 'phoneExtension',
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'description',
                searchable: true,
                alias: 'Description',
                aliasValue: 'description',
            },
            order: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'order',
                searchable: true,
                alias: 'Order',
                aliasValue: 'order',
            },
            createdBy: {
                type: DataTypes.STRING,
                field: "createdBy",
                searchable: true,
                alias: "Created By",
                aliasValue: "createdby",
            },
            createdAt: {
                type: DataTypes.DATE,
                field: "createdAt",
                searchable: true,
                alias: "Created At",
                aliasValue: "createdat",
            },
            updatedBy: {
                type: DataTypes.STRING,
                field: "updatedBy",
                searchable: true,
                alias: "Updated By",
                aliasValue: "updatedby"
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: "updatedAt",
                searchable: true,
                alias: "Updated At",
                aliasValue: "updatedat",
            },
        },
        {
            tableName: "PhoneNumbers",
            timeStamps: false,
        }   
        )     
    };