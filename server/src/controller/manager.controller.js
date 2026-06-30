const bcrypt = require("bcrypt");
const { Admin } = require("../model");

exports.createManager = async (req, res) => {
    try {
        const { username, name, phone, email, password } = req.body;
        const existingManager = await Admin.findOne({
            where: { username },
        });
        if (existingManager) {
            return res.status(400).json({
                message: "Username already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const manager = await Admin.create({
            username,
            name,
            phone,
            email,
            password: hashedPassword,
            role: "MANAGER",
            status: "ACTIVE",
        });
        const managerData = manager.toJSON();
        delete managerData.password;
        res.status(201).json({
            message: "Manager created successfully",
            manager: managerData,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getManagers = async (req, res) => {
    try {
        const managers = await Admin.findAll({
            where: {
                role: "MANAGER",
                status: ["ACTIVE", "INACTIVE"],
            },
            attributes: {
                exclude: ["password"],
            },
            order: [["createdAt", "DESC"]],
        });
        res.status(200).json({
            count: managers.length,
            managers,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getManagerById = async (req, res) => {
    try {
        const { id } = req.params;
        const manager = await Admin.findOne({
            where: {
                id,
                role: "MANAGER",
            },
            attributes: {
                exclude: ["password"],
            },
        });
        if (!manager) {
            return res.status(404).json({
                message: "Manager not found",
            });
        }
        res.status(200).json({
            manager,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.updateManager = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, name, phone, email } = req.body;

        const manager = await Admin.findOne({
            where: {
                id,
                role: "MANAGER",
            },
        });

        if (!manager) {
            return res.status(404).json({
                message: "Manager not found",
            });
        }

        await manager.update({
            username,
            name,
            phone,
            email,
        });
        const managerData = manager.toJSON();
        delete managerData.password;
        res.status(200).json({
            message: "Manager updated successfully",
            manager: managerData,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.deleteManager = async (req, res) => {
    try {
        const { id } = req.params;
        const manager = await Admin.findOne({
            where: {
                id,
                role: "MANAGER",
            },
        });
        if (!manager) {
            return res.status(404).json({
                message: "Manager not found",
            });
        }
        await manager.update({
            status: "DELETED",
        });
        res.status(200).json({
            message: "Manager deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};