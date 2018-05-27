const cheerio = require('cheerio')
const Method = require('./Method')
const Command = require('./Command')

/**
 * parseParameters
 * @param {cheerio} $
 * @param {cheerio} $params
 * @return {Object}
 */
const parseParameters = ($, $params) => {
  const params = {}

  $params.each((i, paramEl) => {
    const $param = $(paramEl)

    const key = paramEl.attribs['data-tg-param']
    const value = $param.html()

    params[key] = value
  })

  return params
}

/**
 * parseMethods
 * @param {cheerio} $
 * @param {cheerio} $methods
 * @return {Array<Method>}
 */
const parseMethods = ($, $methods) =>
  Array.from($methods)
    .map(methodEl => {
      const $method = $(methodEl)

      const methodName = methodEl.attribs['data-tg-method']
      const text = $method.html()

      const $params = $method.find('[data-tg-param]')

      const options = parseParameters($, $params)

      if (Object.keys(options).length === 0) {
        options.text = text
      }

      const method = new Method(methodName, options)

      return method
    })

/**
 * parseCommands
 * @param {cheerio} $
 * @param {cheerio} $commands
 * @return {Array<Command>}
 */
const parseCommands = ($, $commands) =>
  Array.from($commands)
    .map(commandEl => {
      const $command = $(commandEl)

      const isRegex = commandEl.attribs['data-tg-regex'] != null

      const commandAttrib = commandEl.attribs['data-tg-command']

      const $methods = $command.find('[data-tg-method]')

      const trigger = isRegex ? new RegExp(commandAttrib) : commandAttrib
      const methods = parseMethods($, $methods)

      const command = new Command(trigger, methods)

      return command
    })

/**
 * parseHTML
 * @param {string} html
 * @return {{ token: string, commands: Array<Command> }}
 */
const parseHTML = html => {
  const $ = cheerio.load(html)

  const $root = $('[data-tg-root]').first()

  const $token = $root.find('[data-tg-token]').first()

  const $commandsRoot = $root.find('[data-tg-commands]').first()

  const $commands = $commandsRoot.find('[data-tg-command]')

  const token = $token.html()
  const commands = parseCommands($, $commands)

  return { token, commands }
}

module.exports = { parseHTML }
