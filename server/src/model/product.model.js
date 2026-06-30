module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("ACTIVE", "INACTIVE", "DELETED"),
            defaultValue: "ACTIVE",
        },
        history: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
        images: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        price: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
        },
        salePrice: {
            type: DataTypes.DECIMAL(12, 2),
        },
        salePercent: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    }, { timestamps: true });
    return Product
}