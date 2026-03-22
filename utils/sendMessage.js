// utils/sendMessage.js
const axios = require("axios");

/**
 * Send a WhatsApp message using the provided token
 * @param {string} to - recipient number
 * @param {string} text - message text
 * @param {string} token - current long-lived token
 */
async function sendMessage(to, text, token) {
  if (!token) {
    console.error("❌ sendMessage failed: no META_TOKEN provided");
    return;
  }

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

    console.log(`✅ Message sent to ${to}: "${text}"`);
    return res.data;
  } catch (err) {
    console.error("❌ Failed to send message:", err.response?.data || err.message);
  }
}

module.exports = sendMessage;