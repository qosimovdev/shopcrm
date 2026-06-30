module.exports = (sequelize, DataTypes) => {
    const LikesHistory = sequelize.define("LikesHistory", {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        likedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });
    return LikesHistory
}
