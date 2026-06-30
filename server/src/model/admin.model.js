module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
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
        role: {
            type: DataTypes.ENUM("SUPERADMIN", "MANAGER"),
            defaultValue: "MANAGER",
        },
        history: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
        { timestamps: true }
    )
    return Admin
}