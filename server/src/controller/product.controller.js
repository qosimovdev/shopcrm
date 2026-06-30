const { Product, Category } = require("../model");

exports.createProduct = async (req, res) => {
    try {
        const imagePaths = req.files?.map((file) => file.path) || [];
        const product = await Product.create({
            ...req.body,
            images: imagePaths,
            status: req.body.quantity > 0 ? "ACTIVE" : "INACTIVE",
        });
        res.status(201).json({
            message: "Product created",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getProducts = async (req, res) => {
    try {
        let where = {
            status: "ACTIVE",
        };
        if (
            req.admin?.role === "SUPERADMIN" ||
            req.admin?.role === "MANAGER"
        ) {
            where = {
                status: ["ACTIVE", "INACTIVE"],
            };
        }
        const products = await Product.findAll({
            where,
            include: [
                {
                    model: Category,
                    as: "category",
                },
            ],
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: ["category"],
        });
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = {
            ...req.body,
        };
        if (req.body.quantity !== undefined) {
            updateData.status =
                req.body.quantity > 0
                    ? "ACTIVE"
                    : "INACTIVE";
        }
        await Product.update(updateData, {
            where: { id },
        });
        res.status(200).json({
            message: "Product updated",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await Product.update(
            {
                status: "DELETED",
            },
            {
                where: { id },
            }
        );
        res.status(200).json({
            message: "Product deleted",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};