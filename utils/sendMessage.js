// utils/sendMessage.js
const axios = require('axios');

/**
 * Send a WhatsApp message
 * @param {string} to - recipient phone number
 * @param {string} text - message body
 * @param {string} token - long-lived META_TOKEN
 */
async function sendMessage(to, text, token) {
  if (!token) throw new Error("No META_TOKEN provided to sendMessage");

  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: to,
        text: { body: text }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(`Message sent to ${to}: ${text}`);
  } catch (err) {
    console.error("❌ Failed to send message:", err.response?.data || err.message);
  }
}

module.exports = sendMessage;