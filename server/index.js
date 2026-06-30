require("dotenv").config();
const app = require("./src/app");
const { sequelize } = require("./src/model");

const PORT = process.env.PORT || 6565;

const createSuperAdmin = require("./src/seed/superAdminSeeder");

const startServer = async () => {
    try {
        await sequelize.sync();
        console.log("Db ulandi");

        await createSuperAdmin();

        app.listen(PORT, () => {
            console.log(`Server shu portda ishladi: ${PORT}`);
        });
    } catch (err) {
        console.error("Db error:", err);
    }
};

startServer();
