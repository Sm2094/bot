const axios = require("axios");

async function sendMessage(to, text, token) {
  console.log("➡️ Sending message to:", to);

  const metaToken = token; // MUST be the long-lived token
  if (!metaToken) throw new Error("No META_TOKEN provided");

  await axios.post(
    `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to,
      text: { body: text },
    },
    {
      headers: {
        Authorization: `Bearer ${metaToken}`,
      },
    }
  );
}

module.exports = sendMessage;