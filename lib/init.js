const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const chalk = require('chalk')
const clone = require('./load')

const log = content => { console.log(chalk.green(content)) }

module.exports = async name => {
    const data = await figlet(`${name} welcome`)
    log(data)
    await clone('github:vuejs/vue',name)
}