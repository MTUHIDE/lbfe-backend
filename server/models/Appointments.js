module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Appointments',
        {
            appointmentId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "appointmentId",
                primaryKey: true,
                autoIncrement: true,
                searchable: true,
                alias: "Appointment ID",
                aliasValue: "appointmentid",
            },
            startDateTime: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "startDateTime",
                searchable: true,
                alias: "Start Date Time",
                aliasValue: "startdate",
            },
            endDateTime: {
                type: DataTypes.DATE,
                field: "endDateTime",
                searchable: true,
                alias: "End Date Time",
                aliasValue: "enddate",
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
            dropoffAddress: {
                type: DataTypes.STRING,
                field: "dropoffAddress",
                searchable: true,
                alias: "Dropoff Address",
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