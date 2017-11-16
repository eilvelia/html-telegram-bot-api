# html-telegram-bot-api

[![npm](https://img.shields.io/npm/v/html-telegram-bot-api.svg)](https://www.npmjs.com/package/html-telegram-bot-api)
[![GitHub repo size in bytes](https://img.shields.io/github/repo-size/Bannerets/html-telegram-bot-api.svg)](https://github.com/Bannerets/html-telegram-bot-api)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![license](https://img.shields.io/github/license/Bannerets/html-telegram-bot-api.svg)](https://github.com/Bannerets/html-telegram-bot-api/blob/master/LICENSE)

Now you can write Telegram bots in HTML.

## Installation

#### Requirements

- node v6.0.0+

```console
$ [sudo] npm i -g html-telegram-bot-api
```

## Usage

```console
$ html-telegram-bot [options] <path-to-html-file>
```

**or**

```console
$ html-telegram-bot-api [options] <path-to-html-file>
```

## Example

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>html-telegram-bot-api</title>
  </head>
  <body data-tg-root>
    <!-- Replace the value below with the API token you receive from Bot Father -->
    <div data-tg-token>254259451:AA5cAlGQj51K9AD37v_522HC-5lFgB</div>
    <div data-tg-commands>
      <div data-tg-command="/start">
        <div data-tg-method="sendMessage">Start</div>
      </div>
      <div data-tg-command="/help">
        <div data-tg-method="sendMessage">Help</div>
      </div>
      <div data-tg-command="/.*" data-tg-regex>
        <div data-tg-method="sendMessage">Received your command.</div>
      </div>
      <div data-tg-command="/echo (.+)" data-tg-regex>
        <div data-tg-method="sendMessage">$1</div>
      </div>
      <div data-tg-command="/photo">
        <div data-tg-method="sendPhoto">
          <div data-tg-param="photo">https://www.w3.org/html/logo/downloads/HTML5_Badge_64.png</div>
        </div>
      </div>
    </div>
  </body>
</html>
```

## CLI Options

- `-V`, `--version` - output the version number

- `-h`, `--help` - output usage information
