module.exports = (sequelize, DataTypes) => {
    const CartHistory = sequelize.define("CartHistory", {
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
            defaultValue: 1,
        },
        history: {
            type: DataTypes.STRING,
            defaultValue: "ADDED_TO_CART",
        },
    });
    return CartHistory
}
