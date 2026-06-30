const jwt = require("jsonwebtoken");
const { Admin } = require("../model");
require("dotenv").config();

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        const admin = await Admin.findByPk(decoded.id);
        if (!admin) {
            return res.status(401).json({
                message: "Admin not found",
            });
        }
        if (admin.status !== "ACTIVE") {
            return res.status(403).json({
                message: "Admin is blocked",
            });
        }
        req.admin = {
            id: admin.id,
            role: admin.role,
        };
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};