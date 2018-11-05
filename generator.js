const fs = require('fs')
const path = require('path')
const homedir = require('os').homedir()

module.exports = (api, options, rootOptions) => {
  for (let f of options.features) {
    this[f] = true
  }

  options = Object.assign({}, options, {
    websiteName: options.website.split('-')[1],
    website: options.website.split('-')[0]
  })

  console.log(options)

  if (typeof options.username === 'string') {
    const pcuserconf = path.resolve(homedir, '.pcuserconf')
    fs.writeFileSync(pcuserconf, JSON.stringify({
      username: options.username,
      password: options.password,
      city: options.city
    }, null, 2))
  }

  if (options.includeRem) {
    api.extendPackage({
      dependencies: {
        'postcss-pxtorem': '^4.0.1'
      }
    })
  }

  const deps = {
    sass: {
      'node-sass': '^4.9.0',
      'sass-loader': '^7.0.1'
    },
    less: {
      'less': '^3.0.4',
      'less-loader': '^4.1.0'
    },
    stylus: {
      'stylus': '^0.54.5',
      'stylus-loader': '^3.0.2'
    },
    css: {}
  }

  api.extendPackage({
    dependencies: deps[options.cssPreprocessor]
  })

  const htmlEjsOptions = {
    website: options.website,
    pageTitle: options.pageTitle,
    websiteName: options.websiteName,
    pageAuthor: options.pageAuthor,
    pageDesigner: options.pageDesigner,
    includeWx: options.includeWx,
    brand: options.brand || '',
    isRem: options.isRem,
    isVd: options.isVd,
    includeHeader: options.includeHeader,
    includeFooter: options.includeFooter,
    isCms: options.isCms,
    svnPath: options.svnPath
  }

  const styleEjsOptions = {
    isWap: options.isWap,
    includeSprites: options.includeSprites
  }

  const vueConfigOptions = {
    cssPreprocessor: options.cssPreprocessor,
    includeRem: options.includeRem
  }

  // copy and render all the files with ejs
  api.render('./template', Object.assign(htmlEjsOptions, styleEjsOptions, vueConfigOptions))

  // remove unnecessary files
  api.render(files => {
    console.log(222, Object.keys(files))

    const indexFile = options.isWap ? 'html/index_wap.html' : 'html/index_pc.html'

    const getStyle = () => {
      if (options.isWap) {
        if (options.isRem) return 'reset_rem.css'

        if (options.isVd) return 'reset_vd.css'

        return 'reset_rem.css'
      } else {
        return 'reset_pc.css'
      }
    }

    files['public/index.html'] = files[indexFile]
    files['src/assets/reset.css'] = files[`style/${getStyle()}`]

    const startsExcludeEnds = (str, start, exclude) => str.startsWith(start) && !str.endsWith(exclude)

    Object.keys(files)
      .filter(path => {
        return path.startsWith('html/') ||
          path.startsWith('style') ||
          path.startsWith('src/components') ||
          path.includes('logo.png') ||
          path.includes('favicon.ico') ||
          startsExcludeEnds(path, 'src/views/', 'Index.vue')
      })
      .forEach(path => delete files[path])

    console.log(Object.keys(files))
  })
}
