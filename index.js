const cron = require("node-cron");
const { exec } = require("child_process");
require("dotenv").config();

const sendNotification = (title, message) => {
  const command = `onesignal notification create --app-id ${process.env.APP_ID} --rest-api-key ${process.env.REST_API_KEY} \
--included-segments "Subscribed Users" \
--headings '{"en": "${title}"}' \
--contents '{"en": "${message}"}'`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao enviar notificação: ${error.message}`);
      return;
    }
    console.log(`Enviado: ${title} - ${message}`);
  });
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
