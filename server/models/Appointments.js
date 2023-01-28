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
            destinationAddress: {
                type: DataTypes.STRING,
                field: "destinationAddress",
                searchable: true,
                alias: "Destination Address",
            },
            createdAt: {
                type: DataTypes.DATE,
                field: "createdAt",
                searchable: true,
                alias: "Created At",
                aliasValue: "createdat",
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: "updatedAt",
                searchable: true,
                alias: "Updated At",
                aliasValue: "updatedat",
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
        },
        {
            tableName: "Appointments",
            timestamps: false,
        },
    )
};