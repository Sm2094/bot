// refreshToken.js
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;
const SHORT_LIVED_TOKEN = process.env.SHORT_LIVED_TOKEN;

async function refreshToken() {
  try {
    const url = `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${SHORT_LIVED_TOKEN}`;

    const res = await axios.get(url);
    const newToken = res.data.access_token;

    console.log("✅ New long-lived token:", newToken);

    
    console.log("✅ .env updated with new META_TOKEN");

    return newToken;
  } catch (err) {
    console.error("❌ Failed to refresh token:", err.response?.data || err.message);
  }
}

// Run immediately if called directly
if (require.main === module) {
  refreshToken();
}

module.exports = refreshToken;