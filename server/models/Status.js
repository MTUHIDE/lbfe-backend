module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Status',
        {
            statusId: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'statusId',

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
            tableName: "Status ID",
            timeStamps: false,
        }
        )
    };