const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUFQMmxibVFmM2FjNng1THhGQzgwZFFKYjB2NDVRdFVUVHVKcm9oTDNrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNDFpNnpKS1k3UEJmbTZkS0R0WFNMZEh3bEFtOG9MMXdlRDJsOVpqaXh5ND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQjR4Z2JPNjkxSVhWVHkxcWZqQ0s1cjAyUVBGRm83R1RnR2NoOGFpRkU0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuSjJDU2NTWTNrTlZvb29NeHdxTGwwWnVoQ1cxdDcrUnhZK2d2OGh4RkJBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdFTmJWR2t4cm9ORXVmcGRXOGNPOVI3UXhPQURoOU84L2puTTZQbEJiMTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inh6TUg5eUNLREgyZWE4NlFBaGxIM2pZUm91Y210NHd1ckQ4ZHFVQmxRV2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMk1WNXUvckxzT0tJelRnZ05sWnpQKzhSdmVmcTNoZ0JSTEpWdllxZ1JXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXl4anpWSDM2TWJWOUpoUEY5RkN0Y0s4ZkJUL09JQVc3SldlTXo3V3QyOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjA3M1ZXc2VUME40cUZqY1M5Y1lDS2RyV1lzelRWdFpKMG82di9jWGl0NG0wVHNxc2FNNVh3aFJVSGxIQ1RaczBLUE1udzFQZ3YzMTFMM1g3aDVHTmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc3LCJhZHZTZWNyZXRLZXkiOiJNRVBkWUhpQysxb0dWSW0yLzNhMDdjSVpPbFJZT3NWbFNuOEtDUFRtSVJJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJCQ3VfdjhXU1MxZWNwMGV3alppc3BRIiwicGhvbmVJZCI6Ijc2MjM5NDQwLWY3NzMtNDVkOS05MmQzLWIxNTViNmRiNTIyNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJkaDR3dXd3YWJqUUNYelYwaXhBN1krMmpUVE09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiamN3M1RJb0ludEZVKzFURXVxc2pRY2llQzJjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhQTjRLRVA2IiwibWUiOnsiaWQiOiIyMzQ5MTEzNjMwNzgyOjUyQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKbWg5cHdDRU5lY3RyVUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJSNDdmdEVIRWEzNjducGxVR0tvRHdBVUF2b3YvQkJ6dCt6REE4UDQ5Y2tRPSIsImFjY291bnRTaWduYXR1cmUiOiJ2WlJXalNaV20zMUUxUkY2NFdyeUdSU3NvYmRqRzRnSXdUY0NyQ3BtZVBLYm93V2xJR3hEaS9ZMG01emxtRTNTbmZOeWtaNXp6SkJ3U1BqYjdmLytCdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUmI5S1E2UWZZdWs1NEJyZ2FSd0x3TnBwWSsxRjFjQ1Ftd3JxOHZvaUNEcTl5R1hxMjRNZHYxZGdIZFJrUlRPODV2c093c1RZbkJ3ajJjanhnMFE1Z2c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTEzNjMwNzgyOjUyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVlTzM3UkJ4R3QrdTU2WlZCaXFBOEFGQUw2TC93UWM3ZnN3d1BEK1BYSkUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI2NTAyMTJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ï Â𝖒 Ã𝖉é 𝕾𝖆𝖒🕊️🗣️🤍",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || 'composing',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
