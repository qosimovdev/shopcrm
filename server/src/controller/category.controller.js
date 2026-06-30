const { Category } = require("../model");

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json({
            message: "Category created",
            category,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.update(req.body, {
            where: { id },
        });
        res.status(200).json({
            message: "Category updated",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await Category.destroy({
            where: { id },
        });
        res.status(200).json({
            message: "Category deleted",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};