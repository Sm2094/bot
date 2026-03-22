// server.js
require("dotenv").config();
const express = require("express");
const sendMessage = require("./utils/sendMessage.js");

// Use your long-lived token here for now
const META_TOKEN = process.env.META_TOKEN || "PASTE_YOUR_LONG_LIVED_TOKEN_HERE";

const app = express();
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("WhatsApp Bot running 🚀"));

// Webhook
app.post("/webhook", async (req, res) => {
  try {
    const messages = req.body.entry?.[0]?.changes?.[0]?.value?.messages;
    if (!messages || messages.length === 0) return res.sendStatus(200);

    const messageObj = messages[0];
    const from = messageObj.from;
    let text;

    if (messageObj.type === "text") text = messageObj.text.body;
    else return res.sendStatus(200);

    console.log("📩 Incoming message from", from, ":", text);

    // Respond immediately
    await sendMessage(from, `You said: "${text}"`, META_TOKEN);

    res.sendStatus(200);
  } catch (err) {
    console.error("Webhook error:", err.response?.data || err.message);
    res.sendStatus(500);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));