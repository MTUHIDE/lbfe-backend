module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Elders',
        {
            elderId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "elderId",
                primaryKey: true,
                autoIncrement: true,
                searchable: true,
                alias: "Elder ID",
                aliasValue: "elderId",
            },

            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "firstName",
                searchable: true,
                alias: "First Name",
                aliasValue: "firstname",
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "lastName",
                searchable: true,
                alias: "Last Name",
                aliasValue: "lastname",
            },
            fullName: { // Concatenated on insert to match firstname and lastname
                type: DataTypes.STRING,
                allowNull: false,
                field: "fullName",
                searchable: true,
                alias: "Full Name",
                aliasValue: "fullname",
            },

            phoneNumber: {
                type: DataTypes.STRING,
                field: "phoneNumber",
                searchable: true,
                alias: "Phone Number",
                aliasValue: "phonenumber",
            },
            address: {
                type: DataTypes.STRING,
                field: "address",
                searchable: true,
                alias: "Driver Address",
                aliasValue: "driveraddress",
            },
            notes: {
                type: DataTypes.STRING,
                field: "notes",
                searchable: true,
                alias: "Driver Notes",
                aliasValue: "drivernotes",
            },
            mobility: {
                type: DataTypes.STRING,
                field: "mobility",
                searchable: true,
                alias: "Mobility",
                aliasValue: "mobility",
            },
            numOfCancels: {
                type: DataTypes.INTEGER,
                field: "numOfcancels",
                searchable: true,
                alias: "Number of Cancels",
                aliasValue: "numofcancels",
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
        },
        {
            tableName: "Elders",
            timestamps: false,
        },
        )
    };