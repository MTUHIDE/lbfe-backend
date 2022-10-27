module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Drivers',
        {
            driverId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "id",
                primaryKey: true,
                autoIncrement: true,
                searchable: true,
                alias: "Driver ID",
                aliasValue: "driverId",
            },
            driverName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "driver_name",
                searchable: true,
                alias: "Driver Name",
                aliasValue: "driver_name",
            },
            driverInsuranceType: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "driver_insurance_type",
                searchable: true,
                alias: "Driver Insurance Type",
                aliasValue: "driver_insurance_type",
            },
            elderPhoneNumber: {
                type: DataTypes.STRING,
                field: "elder_phone_number",
                searchable: true,
                alias: "Elder Phone Number",
                aliasValue: "elder_phone_number",
            },
            driverAddress: {
                type: DataTypes.STRING,
                field: "driver_address",
                searchable: true,
                alias: "Driver Address",
                aliasValue: "driver_address",
            },
            driverNotes: {
                type: DataTypes.STRING,
                field: "driver_notes",
                searchable: true,
                alias: "Driver Notes",
                aliasValue: "driver_notes",
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
            tableName: "Drivers",
            timestamps: false,
        },
    )
};