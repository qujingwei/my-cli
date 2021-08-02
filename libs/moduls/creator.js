const { typeList, repoMap }  = require('../config/projectTypes')
const inquirer = require('inquirer')
const clone = require('./load')

module.exports = class Creator {
    constructor(projectName, targetDir) {
        this.name = projectName;
        this.target = targetDir
    }

    async create() {
        const action = await this.getProjectType()
        await clone(repoMap[action], this.target)
    }

    async getProjectType (){
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                message: '请选择需要创建的项目类型',
                name: 'action',
                choices: typeList
            }
        ])
        return action
    }
}