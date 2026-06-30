const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Category", {
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
            type: DataTypes.ENUM(
                "ACTIVE",
                "INACTIVE",
                "DELETED"
            ),
            defaultValue: "ACTIVE",
        },
        history: {
            type: DataTypes.JSON,
            defaultValue: [],
        },
    }, { timestamps: true });
    return Category
}