const bcrypt = require("bcrypt");
const { Admin } = require("../model");

const createSuperAdmin = async () => {
    const existingAdmin = await Admin.findOne({
        where: { role: "SUPERADMIN" },
    });

    if (!existingAdmin) {
        await Admin.create({
            username: "superadmin",
            name: "Super Admin",
            phone: "+998901234567",
            email: "superadmin@gmail.com",
            password: await bcrypt.hash("123456", 10),
            role: "SUPERADMIN",
            status: "ACTIVE",
        });

        console.log("Super Admin created");
    }
};

module.exports = createSuperAdmin;