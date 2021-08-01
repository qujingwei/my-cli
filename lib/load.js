
const download = require('download-git-repo')
const ora = require('ora')

module.exports = async function clone(repo, path){
    const process = ora(`下载中... ${repo}`)
    process.start()
    await new Promise((resolve, reject) => {
        download(repo, path, (err => {
            if (err) {
                console.log(err)
                return reject(err)
            }
            resolve()
        }))
    })
    process.succeed()
}