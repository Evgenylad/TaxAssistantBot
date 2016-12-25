const botBuilder = require('claudia-bot-builder');
const telegramTemplate = require('claudia-bot-builder').telegramTemplate;

module.exports = botBuilder(function (message, originalApiRequest) {
  if (message.text === '/start')
    return [
      'Hi! I am your Tax Assistant and I will help you to fullfil your tax declaration.',
      new telegramTemplate.Text(`What type of business do you owe: LLC or self-employed?`)
        .addReplyKeyboard([['LLC'], ['ИП']])
        .get()
    ];

  if (message.text === 'LLC')
    return new Promise(function(resolve, reject) {
      resolve('Please provide us BIC of your bank')
    });

  if (message.text === 'self-employed') {
      return 'Please provide us BIC of your bank'
    }

  if (message.text.length === 7) {
     return new telegramTemplate.Text('Please check you bank details: <Bank details>. Press CORRECT, if everything ok or ERROR, if the details are NOT correct')
      .addReplyKeyboard([['CORRECT'], ['ERROR']])
      .get()
  } else {
     return 'Error: Please check the BIC.'
  }

}, { platforms: ['telegram'] });
