const fs = require('fs')
const program = require('commander')
const Parser = require('./Parser')
const TelegramBot = require('./TelegramBot')
const pkg = require('../package.json')

let filename = ''

program
  .version(pkg.version)
  .arguments('<html_file>')
  .action(arg => (filename = arg))
  .parse(process.argv)

const html = fs.readFileSync(filename).toString()

const parser = new Parser(html)

const { token, commands } = parser.parseHTML()
// commands.map(e => console.log(e))
const bot = new TelegramBot(token)

bot.addCommands(commands)
bot.startPolling()
