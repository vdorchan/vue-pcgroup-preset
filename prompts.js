const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir()

const prompts = []

const pcuserconf = path.resolve(homedir, '.pcuserconf')

try {
  const user = JSON.parse(fs.readFileSync(pcuserconf, 'utf-8'))
  console.log(`${user.username}，你好`)
} catch (error) {
  console.log('当前用户是第一次使用，将会询问一些用户信息，这些信息将存储在用户目录下的 .pcuserconf，后续将不再询问，当信息有所变化时，可前往用户目录下修改')

  prompts.push({
    type: 'input',
    name: 'username',
    message: '请输入账号'
  }, {
    type: 'password',
    name: 'password',
    message: '请输入密码'
  }, {
    type: 'city',
    name: 'city',
    message: '所在城市（拼音首字母简写）',
    default: 'gz'
  })
}

prompts.push({
  type: 'list',
  name: 'platform',
  message: '所属平台?',
  choices: [
    'PC (utf-8)',
    'PC (cms)',
    'WAP (rem)',
    'WAP (vd)',
    'WAP (两倍图)'
  ]
}, {
  type: 'list',
  name: 'website',
  message: '所属网站?',
  choices: [{
    name: '电脑网',
    value: 'pconline-太平洋电脑'
  }, {
    name: '汽车网',
    value: 'pcauto-太平洋汽车'
  }, {
    name: '时尚网',
    value: 'pclady-太平洋时尚'
  }, {
    name: '亲子网',
    value: 'pcbaby-太平洋亲子'
  }, {
    name: '家居网',
    value: 'pchouse-太平洋家居'
  }]
}, {
  type: 'input',
  name: 'svnPath',
  message: 'svn 路径？',
  default: ''
}, {
  type: 'input',
  name: 'brand',
  message: '专题品牌？',
  default: '',
  when: answers => answers.website.indexOf('pcauto') !== -1
}, {
  type: 'input',
  name: 'pageTitle',
  message: '页面标题？'
}, {
  type: 'input',
  name: 'pageAuthor',
  message: '你的名字和地区(zhangshuaige_gz)？',
  default: answers => answers.username && answers.city ? `${answers.username.replace(/\d/g, '')}_${answers.city}` : 'none'
}, {
  type: 'input',
  name: 'pageDesigner',
  message: '设计师的名字和地区(liumenv_gz)？',
  default: 'none'
})

const notice = '默认支持 PostCSS, Autoprefixer and CSS Module'

prompts.push({
  name: 'cssPreprocessor',
  type: 'list',
  message: `选择一个 css 预处理器${process.env.VUE_CLI_API_MODE ? '' : ` (${notice})(空格键选择)`}:`,
  choices: [{
    name: '不需要',
    value: 'css'
  },
  {
    name: 'Sass/SCSS',
    value: 'sass'
  },
  {
    name: 'Less',
    value: 'less'
  },
  {
    name: 'Stylus',
    value: 'stylus'
  }
  ]
})

prompts.push({
  type: 'checkbox',
  name: 'features',
  message: '需要哪些功能？(空格键选择)',
  choices: answers => {
    answers.isRem = answers.platform.indexOf('rem') !== -1
    answers.isVd = answers.platform.indexOf('vd') !== -1
    answers.isWap = answers.platform.indexOf('WAP') !== -1
    answers.isCms = answers.platform.indexOf('cms') !== -1

    const choices = []

    answers.isRem && choices.push({
      name: '开启：REM         // 自动将样式文件中的 rem 转为 px',
      value: 'includeRem',
      checked: true
    })

    choices.push({
      name: '开启：font spider // 分析页面中文字体并进行压缩',
      value: 'includeFontSpider',
      checked: false
    })
    answers.isWap && choices.push({
      name: '开启：微信分享      // 微信自定义内容分享',
      value: 'includeWx',
      checked: false
    })

    answers.isWap && choices.push({
      name: '开启：公共头部      // 网站公共 ssi 头部',
      value: 'includeHeader',
      checked: false
    })
    answers.isWap && choices.push({
      name: '开启：公共底部      // 网站公共 ssi 底部',
      value: 'includeFooter',
      checked: false
    })
    return choices
  }
})

module.exports = prompts
