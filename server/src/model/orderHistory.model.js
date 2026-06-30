module.exports = (sequelize, DataTypes) => {
    const OrderHistory = sequelize.define("OrderHistory", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
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
        status: {
            type: DataTypes.ENUM(
                "PENDING",
                "CONFIRMED",
                "CANCELLED"
            ),
            defaultValue: "PENDING",
        },
        history: {
            type: DataTypes.STRING,
            defaultValue: "ORDERED",
        },
    });

    return OrderHistory;
};