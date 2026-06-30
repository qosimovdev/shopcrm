const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const sendTelegramMessage = async (message) => {
    try {
        await axios.post(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
                chat_id: CHAT_ID,
                text: message,
            }
        );
    } catch (error) {
        console.log("Telegram error:", error.message);
    }
};

module.exports = sendTelegramMessage;
