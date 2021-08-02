const fs = require('fs-extra')
const inquirer = require('inquirer')
const path = require('path')
const Create = require('../moduls/creator')

module.exports = async function(projectName, options) {
    const targetDir = path.join(process.cwd(), projectName)

    if(fs.pathExistsSync(targetDir)){
        if(options && options.Force){
            await fs.remove(targetDir)
        }else {
            const { action } = await inquirer.prompt([{
                type: 'list',
                message: `${projectName} 已经存在，是否需要覆盖？`,
                name: 'action',
                choices: [
                    {name:"是", value:true},
                    {name:"否", value:false},
                ]
            }])
            if(!action) return

            console.log(`正在删除项目${projectName}...`)
            await fs.remove(targetDir)
            console.log(`删除成功!`)
        }
    }

    const create  = new Create(projectName, targetDir)
    await create.create()
}