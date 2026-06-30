const {
    OrderItem,
    CartHistory,
    Product,
    Order,
    sequelize,
} = require("../model");
const { sendOrderToTelegram } = require("../services/telegram.service");

exports.checkout = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { phone, paymentMethod } = req.body;
        const userId = req.user.id;
        const cartItems = await CartHistory.findAll({
            where: { userId },
            transaction,
        });
        if (!cartItems.length) {
            await transaction.rollback();
            return res.status(400).json({
                message: "Cart is empty",
            });
        }
        const order = await Order.create(
            {
                userId,
                phone,
                paymentMethod,
                total: 0,
                status: "PENDING",
            },
            { transaction }
        );
        let total = 0;
        for (const item of cartItems) {
            const product = await Product.findByPk(item.productId, {
                transaction,
            });
            if (!product) {
                throw new Error("Product not found");
            }
            if (product.quantity < item.quantity) {
                throw new Error(`Not enough stock for ${product.name}`);
            }
            const itemTotal = product.price * item.quantity;
            total += itemTotal;
            await OrderItem.create(
                {
                    orderId: order.id,
                    productId: product.id,
                    quantity: item.quantity,
                    price: product.price,
                    total: itemTotal,
                },
                { transaction }
            );
            product.quantity -= item.quantity;
            if (product.quantity === 0) {
                product.status = "INACTIVE";
            }
            await product.save({ transaction });
        }
        order.total = total;
        await order.save({ transaction });
        await CartHistory.destroy({
            where: { userId },
            transaction,
        });
        await transaction.commit();
        const fullOrder = await Order.findByPk(order.id, {
            include: [
                {
                    model: OrderItem,
                    as: "items",
                    include: [
                        {
                            model: Product,
                            as: "product",
                        },
                    ],
                },
            ],
        });
        if (fullOrder) {
            try {
                await sendOrderToTelegram(fullOrder);
            } catch (err) {
                console.error("Telegram Error:", err.message);
            }
        }
        return res.status(201).json({
            message: "Order created successfully",
            orderId: order.id,
            total,
        });
    } catch (error) {
        if (!transaction.finished) {
            await transaction.rollback();
        }
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.user.id },
            include: [
                {
                    model: OrderItem,
                    as: "items",
                    include: ["Product"],
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: OrderItem,
                    as: "items",
                },
            ],
            order: [["createdAt", "DESC"]],
        });
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                {
                    model: OrderItem,
                    as: "items",
                },
            ],
        });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.json({ order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = status;
        await order.save();
        res.json({ message: "Status updated", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};