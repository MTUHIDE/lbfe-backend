module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Elders',
        {
            elderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "id",
                primaryKey: true,
                autoIncrement: true,
                searchable: true,
                alias: "Elder ID",
                aliasValue: "elderId",
            },
            elderName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "elder_name",
                searchable: true,
                alias: "Elder Name",
                aliasValue: "elder_name",
            },
            elderAddress: {
                type: DataTypes.STRING,
                field: "elder_address",
                searchable: true,
                alias: "Elder Address",
                aliasValue: "elder_address",
            },
            elderPhoneNumber: {
                type: DataTypes.STRING,
                field: "elder_phone_number",
                searchable: true,
                alias: "Elder Phone Number",
                aliasValue: "elder_phone_number",
            },
            mobility: {
                type: DataTypes.STRING,
                field: "mobility",
                searchable: true,
                alias: "Mobility",
                aliasValue: "mobility",
            },
            elderNotes: {
                type: DataTypes.STRING,
                field: "elder_notes",
                searchable: true,
                alias: "Elder Notes",
                aliasValue: "elder_notes",
            },
            numOfCancels: {
                type: DataTypes.INTEGER,
                field: "#ofcancels",
                searchable: true,
                alias: "Number of Cancels",
                aliasValue: "#ofcancels",
            },
            createdOn: {
                type: DataTypes.DATE,
                field: "createdOn",
                searchable: true,
                alias: "Created On",
                aliasValue: "createdon",
            },
            updatedOn: {
                type: DataTypes.DATE,
                field: "updatedOn",
                searchable: true,
                alias: "Updated On",
                aliasValue: "updatedon",
            },
        },
        {
            tableName: "Elders",
            timestamps: false,
        },
    )
};