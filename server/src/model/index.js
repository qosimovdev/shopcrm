const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Admin = require("./admin.model")(sequelize, Sequelize.DataTypes);
db.Category = require("./category.model")(sequelize, Sequelize.DataTypes);
db.Product = require("./product.model")(sequelize, Sequelize.DataTypes);
db.User = require("./user.model")(sequelize, Sequelize.DataTypes);
db.LikesHistory = require("./likesHistory.model")(sequelize, Sequelize.DataTypes);
db.CartHistory = require("./cartHistory.model")(sequelize, Sequelize.DataTypes);
db.OrderItem = require("./orderItem.model")(sequelize, Sequelize.DataTypes);
db.Order = require("./order.model")(sequelize, Sequelize.DataTypes)

// Category ↔ Product
db.Category.hasMany(db.Product, {
    foreignKey: "categoryId",
    as: "products",
});

db.Product.belongsTo(db.Category, {
    foreignKey: "categoryId",
    as: "category",
});

// User ↔ LikesHistory
db.User.hasMany(db.LikesHistory, {
    foreignKey: "userId",
    as: "likesHistory",
});

db.LikesHistory.belongsTo(db.User, {
    foreignKey: "userId",
});

db.Product.hasMany(db.LikesHistory, {
    foreignKey: "productId",
});

db.LikesHistory.belongsTo(db.Product, {
    foreignKey: "productId",
});

// User ↔ CartHistory
db.User.hasMany(db.CartHistory, {
    foreignKey: "userId",
    as: "cartHistory",
});

db.CartHistory.belongsTo(db.User, {
    foreignKey: "userId",
});

db.Product.hasMany(db.CartHistory, {
    foreignKey: "productId",
});

db.CartHistory.belongsTo(db.Product, {
    foreignKey: "productId",
});

// Order ↔ OrderItem
db.Order.hasMany(db.OrderItem, {
    foreignKey: "orderId",
    as: "items",
});

db.OrderItem.belongsTo(db.Order, {
    foreignKey: "orderId",
    as: "order",
});

db.User.hasMany(db.Order, {
    foreignKey: "userId",
    as: "orders",
});

db.Order.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user",
});
db.Product.hasMany(db.OrderItem, {
    foreignKey: "productId",
    as: "orderItems",
});

db.OrderItem.belongsTo(db.Product, {
    foreignKey: "productId",
    as: "product",
});
module.exports = db;