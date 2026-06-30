const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (adminId, userRole) => {
    return jwt.sign(
        {
            id: adminId,
            role: userRole
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES,
        }
    );
};

module.exports = generateToken;