// utils/sendMessage.js
const axios = require("axios");

async function sendMessage(to, text, token) {
  if (!token) throw new Error("No META_TOKEN provided");
  if (!to) throw new Error("No recipient number provided");

  console.log("➡️ Sending message to:", to, "| Text:", text);

  try {
    const res = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        text: { body: text },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Message sent:", res.data);
  } catch (err) {
    console.error("❌ Failed to send message:", err.response?.data || err.message);
  }
}

module.exports = sendMessage;