const express = require("express")
const cors = require("cors")
const { bot } = require("./services/telegram.service");

const app = express()
app.use(express.json())
app.use(cors())
bot.launch();


app.use("/api/auth", require("./routes/admin.routes"))
app.use("/api/manager", require("./routes/manager.routes"))
app.use("/api/product", require("./routes/product.routes"))
app.use("/api/category", require("./routes/category.routes"))
app.use("/api/likes", require("./routes/like.route"))
app.use("/api/cart", require("./routes/cart.routes"))
app.use("/api/orders", require("./routes/order.routes"))
app.use("/api/user", require("./routes/user.routes"))

console.log("🤖 Telegram bot running...");
module.exports = app