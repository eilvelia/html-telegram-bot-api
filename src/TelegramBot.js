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
    commands.forEach(command => this.addCommand(command))
  }

  /**
   * addCommand
   * @method addCommand
   * @param {Command} command
   */
  addCommand (command) {
    const isRegex = command.hears instanceof RegExp

    this.bot.hears(command.hears, (ctx, next) => {
      command.methods.forEach(method => {
        let { text } = method.options

        if (text && isRegex) {
          ctx.match.forEach((substr, i) => {
            if (i && substr) {
              text = text.replace(new RegExp('\\$' + i, 'g'), substr)
            }
          })
        }

        const options = Object.assign(
          {},
          method.options,
          { chat_id: ctx.message.chat.id },
          text && { text }
        )

        ctx.telegram.callApi(method.name, options)
      })

      next()
    })
  }

  startPolling () {
    return this.bot.startPolling()
  }
}

module.exports = TelegramBot
