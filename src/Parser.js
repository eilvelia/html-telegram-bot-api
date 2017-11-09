const cheerio = require('cheerio')
const Method = require('./Method')
const Command = require('./Command')

class Parser {
  /**
   * Parser
   * @param {string} html
   */
  constructor (html) {
    this.$ = cheerio.load(html)
  }

  /**
   * parseHTML
   * @method parseHTML
   * @return {{ token: string, commands: Array<Command> }}
   */
  parseHTML () {
    const { $ } = this

    const $root = $('[data-tg-root]').first()

    const $token = $root.find('[data-tg-token]').first()

    const $commandsRoot = $root.find('[data-tg-commands]').first()

    const $commands = $commandsRoot.find('[data-tg-command]')

    const token = $token.html()
    const commands = this.parseCommands($commands)

    return { token, commands }
  }

  /**
   * parseCommands
   * @method parseCommands
   * @param {NodeList} $commands
   * @return {Array<Command>}
   */
  parseCommands ($commands) {
    const { $ } = this

    const commands = []

    $commands.each((i, commandEl) => {
      const $command = $(commandEl)

      const isRegex = commandEl.attribs['data-tg-regex'] != null

      const commandAttrib = commandEl.attribs['data-tg-command']

      const $methods = $command.find('[data-tg-method]')

      const hears = isRegex ? new RegExp(commandAttrib) : commandAttrib
      const methods = this.parseMethods($methods)

      const command = new Command(hears, methods)

      commands.push(command)
    })

    return commands
  }

  /**
   * parseMethods
   * @method parseMethods
   * @param {NodeList} $methods
   * @return {Array<Method>}
   */
  parseMethods ($methods) {
    const { $ } = this

    const methods = []

    $methods.each((i, methodEl) => {
      const $method = $(methodEl)

      const methodName = methodEl.attribs['data-tg-method']
      const text = $method.html()

      const options = { text }

      const method = new Method(methodName, options)

      methods.push(method)
    })

    return methods
  }
}

module.exports = Parser
