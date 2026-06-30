const bcrypt = require("bcrypt");
const { Admin } = require("../model");
const {
    loginSchema,
} = require("../validation/adminAuthValidation");
const generateToken = require("../utils/genereteAdminToken");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const { username, password } = req.body;
        const admin = await Admin.findOne({
            where: { username, status: "ACTIVE" },
        });
        if (!admin) {
            return res.status(404).json({
                message: "Admin not found",
            });
        }
        const comparePassword = await bcrypt.compare(
            password,
            admin.password
        );
        if (!comparePassword) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        const token = generateToken(admin.id, admin.role)
        const adminData = admin.toJSON();
        delete adminData.password;
        res.status(200).json({
            message: "Login successful",
            token,
            admin: adminData
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getMe = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.admin.id, {
            attributes: {
                exclude: ["password"],
            },
        });
        if (!admin) {
            return res.status(404).json({
                message: "Admin not found",
            });
        }
        res.status(200).json({
            admin,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};