const axios = require("axios");

async function sendMessage(to, text, token = process.env.META_TOKEN) {
  try {
    console.log("➡️ Sending message to:", to);
    console.log("➡️ Message body:", text);
    console.log("➡️ Using token:", token ? token.slice(0, 10) + "..." : "undefined");

    const res = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        text: { body: text },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("✅ API response:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ Failed to send message:", err.response?.data || err.message);
  }
}

module.exports = sendMessage;