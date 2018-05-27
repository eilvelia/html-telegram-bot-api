const Telegraf = require('telegraf')

const replaceSubmatchs = (match, inputText) =>
  match
    .filter(Boolean)
    .reduce((text, substr, i) =>
      text.replace(new RegExp('\\$' + i, 'g'), substr),
    inputText)

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
    commands.forEach(this.addCommand.bind(this))
  }

  /**
   * addCommand
   * @method addCommand
   * @param {Command} command
   */
  addCommand (command) {
    const isRegex = command.trigger instanceof RegExp

    this.bot.hears(command.trigger, (ctx, next) => {
      command.methods.forEach(method => {
        const text = isRegex
          ? replaceSubmatchs(ctx.match, method.options.text || '')
          : method.options.text

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
