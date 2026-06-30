const bcrypt = require("bcrypt");
const { User } = require("../model");
const { registerSchema, loginSchema } = require("../validation/adminAuthValidation");
const generateToken = require("../utils/genereteAdminToken");

exports.register = async (req, res) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const { name, email, username, phone, password } = req.body;
        const existingUser = await User.findOne({
            where: { username },
        });
        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            username,
            phone,
            password: hashedPassword,
        });
        const token = generateToken(user.id, "USER");
        const userData = user.toJSON();
        delete userData.password;
        res.status(201).json({
            message: "User registered successfully",
            user: userData,
            token
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const { username, password } = req.body;
        const user = await User.findOne({
            where: { username },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const comparePassword = await bcrypt.compare(
            password,
            user.password
        );
        if (!comparePassword) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        const token = generateToken(user.id, "USER");
        const userData = user.toJSON();
        delete userData.password;
        res.status(200).json({
            message: "Login successful",
            token,
            user: userData,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

exports.getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: {
                exclude: ["password"],
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};