module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Appointments',
        {
            appointmentId: {
                type: DataTypes.INTEGER,
                // allowNull: false, --> Auto increment protects us
                field: "appointmentId",
                primaryKey: true,
                autoIncrement: true,
                searchable: true,
                alias: "Appointment ID",
                aliasValue: "appointmentid",
            },
            startDate: {
                type: DataTypes.STRING, // TODO - FIX UTC Conversion
                allowNull: false,
                field: "startDate",
                searchable: true,
                alias: "Start Date",
                aliasValue: "startdate",
            },
            endDate: {
                type: DataTypes.STRING, // TODO - FIX UTC Conversion
                field: "endDate",
                searchable: true,
                alias: "End Date",
                aliasValue: "enddate",
            },
            notes: {
                type: DataTypes.STRING,
                field: "notes",
                searchable: false, // Theres no need to search this
                alias: "Notes",
            },
            title: {
                type: DataTypes.STRING,
                field: "title",
                searchable: true,
                alias: "Title",
            },
            pickupAddress: {
                type: DataTypes.STRING,
                field: "pickupAddress",
                searchable: true,
                alias: "Pickup Address",
            },
            marquette: {
                type: DataTypes.BOOLEAN,
                field: "marquette",
                searchable: true,
                alias: "Marquette",
            },
            baraga: {
                type: DataTypes.BOOLEAN,
                field: "baraga",
                searchable: true,
                alias: "Baraga",
            },
            destinationAddress: {
                type: DataTypes.STRING,
                field: "destinationAddress",
                searchable: true,
                alias: "Destination Address",
            },
            driverId: {
                type: DataTypes.INTEGER,
                field: "driverId",
                searchable: true,
                alias: "Driver ID",
                aliasValue: "driverid",
            },
            elderId: {
                type: DataTypes.INTEGER,
                field: "elderId",
                searchable: true,
                alias: "Elder ID",
                aliasValue: "elderid",
            },
            isCancelled: {
                type: DataTypes.BOOLEAN,
                field: "isCancelled",
                searchable: true,
                alias: "Is Cancelled",
                aliasValue: "iscancelled",
            },
            isArchived: {
                type: DataTypes.BOOLEAN,
                field: "isArchived",
                searchable: true,
                alias: "Is Archived",
                aliasValue: "isarchived",
            },
            isAllDay: {
                type: DataTypes.BOOLEAN,
                field: "isAllDay",
                searchable: true,
                alias: "Is All Day",
                aliasValue: "isallday",
            },
            needsLBFEVehicle: {
                type: DataTypes.BOOLEAN,
                field: "needsLBFEVehicle",
                searchable: true,
                alias: "Needs LBFE Vehicle",
                aliasValue: "needLBFEVehicle",
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
            updatedBy:{
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
            tableName: "Appointments",
            timestamps: false,
        },
    )
};