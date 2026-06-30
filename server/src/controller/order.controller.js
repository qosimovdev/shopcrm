const {
    OrderHistory,
    CartHistory,
    Product,
    sequelize,
} = require("../model");
const sendTelegramMessage = require("../util/sendTelegramMessage");


exports.checkout = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { phone, paymentMethod } = req.body;
        const userId = req.user.id;
        const cartItems = await CartHistory.findAll({
            where: { userId },
        });
        if (!cartItems.length) {
            return res.status(400).json({
                message: "Cart is empty",
            });
        }
        let message = `🛒 New Order\n`;
        message += `📞 Phone: ${phone}\n`;
        message += `💳 Payment: ${paymentMethod}\n\n`;
        for (const item of cartItems) {
            const product = await Product.findByPk(item.productId);
            if (!product || product.quantity < item.quantity) {
                await transaction.rollback();
                return res.status(400).json({
                    message: `Stock not enough for ${product?.name}`,
                });
            }
            product.quantity -= item.quantity;
            if (product.quantity === 0) {
                product.status = "INACTIVE";
            }
            await product.save({ transaction });
            await OrderHistory.create(
                {
                    userId,
                    productId: item.productId,
                    quantity: item.quantity,
                    phone,
                    paymentMethod,
                },
                { transaction }
            );
            message += `📦 ${product.name} x ${item.quantity}\n`;
        }
        await CartHistory.destroy({
            where: { userId },
            transaction,
        });
        await transaction.commit();
        await sendTelegramMessage(message);
        res.status(200).json({
            message: "Order placed successfully",
        });
    } catch (error) {
        await transaction.rollback();

        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await OrderHistory.findAll({
            where: {
                userId: req.user.id,
            },
            include: ["Product"],
        });
        res.status(200).json({
            orders,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};