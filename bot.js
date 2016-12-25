const botBuilder = require('claudia-bot-builder');
const telegramTemplate = require('claudia-bot-builder').telegramTemplate;

module.exports = botBuilder(function (message, originalApiRequest) {
  if (message.text === '/start')
    return [
      'Добрый день! Я помогу вам выбрать музей и купить электронный билет. Например, прямо сейчас есть отличное предложение:',
      new telegramTemplate.Text(`У вас ООО или ИП?`)
        .addReplyKeyboard([['ООО'], ['ИП']])
        .get()
    ];

  if (message.text === 'ООО')
    return new Promise(function(resolve, reject) {
      resolve('Введите БИК вашего банка')
    });

  if (message.text === 'ИП') {
      return 'Введите БИК вашего банка'
    }

  if (message.text.length === 7) {
     return new telegramTemplate.Text('Полные реквизиты вашего банка: <Реквизиты>. Нажмите кнопку ВЕРНО, если все правильно или ОШИБКа, если данные не верны')
      .addReplyKeyboard([['ВЕРНО'], ['ОШИБКА']])
      .get()
  } else {
     return 'БИК введен не корректно'
  }

}, { platforms: ['telegram'] });
