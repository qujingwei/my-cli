
const download = require('download-git-repo')
const ora = require('ora')
let num = 0
async function sleep(n){
    let timer = null;
    return new Promise((resolve,reject)=>{
        timer= setTimeout(() => {
            resolve();
            clearTimeout(timer)
        }, n);
    })
}

module.exports = async function clone(repo, path){
    const process = ora(`项目正在初始化 ${repo}`)
    try{
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
    }catch (e) {
        num++
        if(num >= 5){
            process.fail(`下载失败:${repo}，请检查网络相关问题`)
            return
        }
        process.fail(`download failed, 正在尝试第${num}次初始化`)
        await sleep(2000)
        clone(repo, path)
    }

}