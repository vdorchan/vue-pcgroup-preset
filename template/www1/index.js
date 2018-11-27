const fs = require('fs')
const archiver = require('archiver')
const www1 = require('pc-www1')
const homedir = require('os').homedir()
const path = require('path')

let user
try {
  user = JSON.parse(fs.readFileSync(path.resolve(homedir, '.pcuserconf')))
} catch (error) {
  throw new Error('无法获取账号密码，请前往用户目录确认配置文件（.pcuserconf）是否存在！')
}

const {
  www1: {
    targetPath,
    site
  },
  zipname
} = require('../pc.config.js')

const ask = function (question) {
  const r = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  })
  return new Promise((resolve, reject) => {
    r.question(question, answer => {
      r.close()
      resolve(answer)
    })
  })
}

try {
  fs.unlinkSync('dist/.DS_Store')
  fs.unlinkSync('dist/js/.DS_Store')
  fs.unlinkSync('dist/css/.DS_Store')
  fs.unlinkSync('dist/img/.DS_Store')
  fs.unlinkSync('dist/fonts/.DS_Store')

  fs.unlinkSync('dist/desktop.ini')
  fs.unlinkSync('dist/js/desktop.ini')
  fs.unlinkSync('dist/css/desktop.ini')
  fs.unlinkSync('dist/img/desktop.ini')
  fs.unlinkSync('dist/fonts/desktop.ini')
} catch (error) {

}

try {
  fs.mkdirSync('zip')
} catch (error) {

}

const output = fs.createWriteStream(path.join(process.cwd(), 'zip', `${zipname}.zip`))
const archive = archiver('zip')

output.on('close', async function () {
  console.log(`打包成功：${(archive.pointer() / 1024 / 1024).toFixed(2)} total MB`)

  const answers = await ask(`
chenwudong, 你将上传 ${zipname}.zip 到 \u001b[40;32mwww1.${site}.com.cn/${targetPath.replace(/([^/]$)/, '$1/')}\u001b[0m
输入 y 确认操作，否则输入n: `)

  if (answers === 'y') {
    try {
      const session = await www1.verifyUser(Object.assign({}, user, {
        site
      }))

      await www1.upload(output.path, {
        targetPath
      }, session)
    } catch (err) {
      console.error(err.message)
    }
  } else {
    console.log('已取消上传')
  }
})

output.on('end', function () {
  console.log('Data has been drained')
})

archive.on('warning', function (err) {
  console.log(err)
})

archive.on('error', function (err) {
  throw err
})

archive.pipe(output)

archive.directory(path.join(process.cwd(), 'dist'), false)

archive.finalize()
