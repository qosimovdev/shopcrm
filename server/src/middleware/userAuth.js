const jwt = require("jsonwebtoken");
const { User } = require("../model");

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
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: "User not found",
            });
        }
        req.user = {
            id: user.id,
        };
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};