const fs = require('fs')
const program = require('commander')
const { parseHTML } = require('./Parser')
const TelegramBot = require('./TelegramBot')
const pkg = require('../package.json')

program
  .version(pkg.version)
  .arguments('<path/to/html/file>')
  .action(start)
  .parse(process.argv)

if (program.args.length === 0) {
  console.error('filename is required')
  process.exit(1)
}

function start (filename) {
  const html = fs.readFileSync(filename).toString()

  const { token, commands } = parseHTML(html)

  const bot = new TelegramBot(token)

  bot.addCommands(commands)
  bot.startPolling()
}
