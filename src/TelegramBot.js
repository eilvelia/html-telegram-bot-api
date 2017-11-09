const Telegraf = require('telegraf')

class TelegramBot {
  /**
   * TelegramBot
   * @param {string} token Bot API token
   */
  constructor (token) {
    this.bot = new Telegraf(token)
  }

  /**
   * addCommands
   * @method addCommands
   * @param {Array<Command>} commands
   */
  addCommands (commands) {
    commands.forEach(command => this.bot.hears(command.hears, (ctx, next) => {
      command.methods.forEach(method => {
        let text = method.options.text

        if (command.hears instanceof RegExp) {
          ctx.match.forEach((substr, i) => {
            if (i && substr) {
              text = text.replace(new RegExp('\\$' + i, 'g'), substr)
            }
          })
        }

        const options = Object.assign({
          chat_id: ctx.message.chat.id
        }, { text })

        ctx.telegram.callApi(method.name, options)
      })

      next()
    }))
  }

  startPolling () {
    return this.bot.startPolling()
  }
}

module.exports = TelegramBot
