const express = require("express");
const cron = require("node-cron");
const { exec } = require("child_process");
require("dotenv").config();
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Rota só para manter o app "vivo"
app.get("/", (req, res) => {
  res.send("Onesignal cron server is running! 🚀");
});

// Notificação via CLI
const sendNotification = async (title, message) => {
  const options = {
  method: 'POST',
  url: 'https://api.onesignal.com/notifications?c=push',
  headers: {
    accept: 'application/json',
    Authorization: `Key ${process.env.REST_API_KEY}`,
    'content-type': 'application/json'
  },
  data: {
    app_id: process.env.APP_ID,
    headings: {en: title},
    contents: {en: message},
    included_segments: ['Active Subscriptions']
  }
}
  try {
    const response = await axios.request(options);

    console.log("Notificação enviada:", response);
  } catch (error) {
    console.error("Erro ao enviar notificação:", error.response?.data || error.message);
  }
};

// Bom dia – todos os dias às 08:00
cron.schedule("0 8 * * *", () => {
  sendNotification("Bom dia gatinha ❤️☀", "O mundo merece sua luz, que voce brilhe mais um dia! Te amo minha novinha ❤️");
});

// Tomar água – todos os dias às 09:00
cron.schedule("0 9 * * *", () => {
  sendNotification("Água, minha vida! 🚿", "Se não beber por você, beba por nós! Quero te ver saudável pra me aturar por muitos e muitos anos 💘💦");
});

// Tomar água – todos os dias às 15:00
cron.schedule("0 15 * * *", () => {
  sendNotification("Bora tomar agua 💦?", "Você é 70% água e 100% meu amorzinho. Vai beber uma aguinha pra nao passar o velhote na velhice 🥹❤️");
});

// Carregar patinete – todos os dias às 00:15
cron.schedule("15 0 * * *", () => {
  sendNotification("Amor… e o patinete? 🛴🔌", "Magina poder tirar a sonequinha de meio dia e nao ter bateria ? 🫠");
});

// Carregar patinete – todos os dias às 17
cron.schedule("0 17 * * *", () => {
  sendNotification("Amor… e o patinete? 🛴🔌", "Magina poder tirar a sonequinha de meio dia e nao ter bateria ? 🫠");
});

// Teste temporário – às 14:20
cron.schedule("* * * * *", () => {
  sendNotification("Teste agora", "Funcionou! São 14:20 e sua notificação foi enviada 🚀");
});

// Inicia o servidor web (Render exige isso)
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});