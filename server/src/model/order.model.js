module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentMethod: {
            type: DataTypes.ENUM("CASH", "CARD"),
            allowNull: false,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
        status: {
            type: DataTypes.ENUM(
                "PENDING",
                "CONFIRMED",
                "DELIVERED",
                "CANCELLED"
            ),
            defaultValue: "PENDING",
        },
    });

    return Order;
};