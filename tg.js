const TelegramBot = require('node-telegram-bot-api');
const { Client } = require('rustrcon');
const { ip, port, pwd, tokenBot, admins, Exclude } = require('./tgconfig.json');
const fs = require('fs');
const { CronJob } = require('cron');
const _ = require('lodash');

const clearFileJob = new CronJob('0 30 14 * * *', () => {
  fs.writeFile('messages.txt', '', (err) => {
    if (err) throw err;
    console.log('Файл логирования очищен в 14:30!');
  });
});

clearFileJob.start();

const rcon = new Client({
  ip: ip,
  port: port,
  password: pwd,
});
const token = tokenBot;
const userIds = admins;

const bot = new TelegramBot(token, { polling: true });
rcon.login();


let isConnected = false;

rcon.on('connect', () => {
  if (!isConnected) {
    isConnected = true;
    console.log('Бот подключен!');
  }
});
rcon.on('error', (err) => {
  console.error(`Ошибка подключения: ${err.message}.`);
  setTimeout(() => {
    console.log('Повторное подключение...');
    rcon.login();
  }, 60000);
});


const messageTypes = {
  'Generic': '',
  'Warning': '⚠️WARNING',
  'Error': '🛑ERROR',
  'Debug': '🐞DEBUG'
};


rcon.on('message', message => {
  let content = '';
  
  if (message.Type && message.Type !== 'Generic') {
    const messageType = messageTypes[message.Type] || '';
    content = `${messageType}\n<code>${message.content}</code>`;
    for (let i = 0; i < Exclude.length; i++) {
      if (message.content.includes(Exclude[i])) {
        return;
      }
    }

    userIds.forEach(userId => {
      bot.sendMessage(userId, content, { parse_mode: 'HTML' });
    });
  } else {
    content = `[\`${new Date().toLocaleString()}\`] ${message.content}`;
  }

  fs.appendFileSync('messages.txt', `${content}\n`);
});

