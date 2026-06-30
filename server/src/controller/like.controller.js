const { LikesHistory, Product } = require("../model");

exports.toggleLike = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        const existingLike = await LikesHistory.findOne({
            where: {
                userId,
                productId,
            },
        });
        if (existingLike) {
            await existingLike.destroy();
            return res.status(200).json({
                message: "Like removed",
            });
        }
        await LikesHistory.create({
            userId,
            productId,
        });
        res.status(201).json({
            message: "Product liked",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getMyLikes = async (req, res) => {
    try {
        const likes = await LikesHistory.findAll({
            where: {
                userId: req.user.id,
            },
            include: ["Product"],
        });
        res.status(200).json({
            likes,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};