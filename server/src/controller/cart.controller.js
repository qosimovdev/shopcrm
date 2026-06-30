const { CartHistory, Product } = require("../model");

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        if (product.quantity < quantity) {
            return res.status(400).json({
                message: "Not enough stock",
            });
        }
        const existingCart = await CartHistory.findOne({
            where: {
                userId,
                productId,
            },
        });
        if (existingCart) {
            existingCart.quantity += quantity;
            await existingCart.save();
            return res.status(200).json({
                message: "Cart updated",
                cart: existingCart,
            });
        }
        const cart = await CartHistory.create({
            userId,
            productId,
            quantity,
        });
        console.log("CART ITEM:", existingCart);
        console.log("NEW CART:", cart);
        res.status(201).json({
            message: "Added to cart",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getMyCart = async (req, res) => {
    try {
        const cart = await CartHistory.findAll({
            where: {
                userId: req.user.id,
            },
            include: ["Product"],
        });
        res.status(200).json({
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await CartHistory.findOne({
            where: {
                id,
                userId: req.user.id,
            },
        });
        if (!cart) {
            return res.status(404).json({
                message: "Cart item not found",
            });
        }
        await cart.destroy();
        res.status(200).json({
            message: "Removed from cart",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};