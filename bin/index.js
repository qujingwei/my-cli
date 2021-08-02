#!/usr/bin/env node

const { program } = require('commander');
const packageData = require('../package.json')
const chalk = require('chalk')

program.version(packageData.version)

program
    .command('create <app-name>')
    .option('-f,-force', 'overwrite project if it exists')
    .description('create a new project')
    .action(require('../libs/command/create'))

program.on('--help', () => {
    console.log(`Run ${chalk.red(`${packageData.name} <command> --help`)} show details`)
})

program.parse(process.argv)
