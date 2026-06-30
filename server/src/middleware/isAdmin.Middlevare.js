exports.isAdmin = async (req, res, next) => {
    if (req.admin.role !== "ADMIN") {
        return res.status(403).json({
            message: "Only admin can create manager",
        });
    }
    next();
};