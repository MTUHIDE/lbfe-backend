module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Phone Numbers',
        {
            phoneNumberId:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'phoneNumberId',
                primaryKey: true,
                autoIncrement: true,
                searchable: true,
                alias: 'Phone Number ID',
                aliasValue: 'phoneNumberId',
            },
        
            referenceId:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'referenceId',
                primaryKey: true,
                autoIncrement: true,
                searchable: true,
                alias: 'Reference ID',
                aliasValue: 'referenceId',
            },

            referenceType:{

            },

            phoneNumber:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'phoneNumber',
                primaryKey: true,
                autoIncrement: true,
                searchable: true,
                alias: 'Phone Number',
                aliasValue: 'phoneNumber',
            },

            phoneExtension:{
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'phoneExtension',
                primaryKey: true,
                autoIncrement: true,
                searchable: true,
                alias: 'Phone Extension',
                aliasValue: 'phoneExtension',
            },

            description:{
                type: DataTypes.ARRAY,
                allowNull: false,
                field: 'descrption',
                primaryKey: false,
                autoIncrement: true,
                searchable: true,
                alias: 'Description',
                aliasValue: 'description',
            },

            order:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'order',
                primaryKey: false,
                autoIncrement: true,
                searchable: true,
                alias: 'Order',
                aliasValue: 'order',
            },
        },
        {
            tableName: "Phone Numbers",
            timeStamps: false,
        }   
        )     
    };