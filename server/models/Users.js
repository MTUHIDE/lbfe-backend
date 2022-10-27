module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'Users',
            // Haven't decided if we're doing a joint user table or not
        {
            tableName: "Users",
            timestamps: false,
        },
    )
};