const { Telegraf, Markup } = require("telegraf");
const { Order } = require("../model");

const bot = new Telegraf(process.env.BOT_TOKEN);
const sendOrderToTelegram = async (order) => {
    const products = order.items
        .map((item) => {
            return `• ${item.product.name} × ${item.quantity} = ${(item.total).toLocaleString("uz-UZ")} so'm`;
        })
        .join("\n");
    const message = `
🛒 <b>YANGI BUYURTMA #${order.id}</b>

━━━━━━━━━━━━━━━━━━

📞 <b>Telefon:</b>
<code>${order.phone}</code>

📦 <b>Mahsulotlar:</b>

${products}

💳 <b>To'lov:</b>
${order.paymentMethod}

💰 <b>Jami:</b>
<b>${Number(order.total).toLocaleString("uz-UZ")} so'm</b>

🕒 <b>Vaqti:</b>
${new Date().toLocaleString("uz-UZ")}

━━━━━━━━━━━━━━━━━━
`;

    await bot.telegram.sendMessage(process.env.CHAT_ID, message, {
        parse_mode: "HTML",
        ...Markup.inlineKeyboard([
            [
                Markup.button.callback("✅ Tasdiqlash", `confirm_${order.id}`),
                Markup.button.callback("❌ Bekor qilish", `cancel_${order.id}`),
            ],
        ]),
    });
};

// CONFIRM
bot.action(/confirm_(\d+)/, async (ctx) => {
    const orderId = ctx.match[1];

    await Order.update(
        { status: "CONFIRMED" },
        { where: { id: orderId } }
    );

    await ctx.answerCbQuery("Buyurtma tasdiqlandi");

    await ctx.editMessageText(
        `✅ <b>BUYURTMA TASDIQLANDI</b>

🆔 #${orderId}

🟢 Holat: <b>CONFIRMED</b>`,
        {
            parse_mode: "HTML",
        }
    );
});

// CANCEL
bot.action(/cancel_(\d+)/, async (ctx) => {
    const orderId = ctx.match[1];

    await Order.update(
        { status: "CANCELLED" },
        { where: { id: orderId } }
    );

    await ctx.answerCbQuery("Buyurtma bekor qilindi");

    await ctx.editMessageText(
        `❌ <b>BUYURTMA BEKOR QILINDI</b>

🆔 #${orderId}

🔴 Holat: <b>CANCELLED</b>`,
        {
            parse_mode: "HTML",
        }
    );
});

module.exports = {
    bot,
    sendOrderToTelegram,
};