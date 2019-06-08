const path = require('path')
const gulp = require('gulp')
const del = require('del')
const jsonfile = require('jsonfile')
const watch = require('gulp-watch')
const newer = require('gulp-newer')

const environment = process.env.NODE_ENV
const config = {}

config.development = {
  appid: 'wx85aeb51bb4a79515',
  buildPath: './build/development/',
  projectname: 'finger_mourning'
}

config.production = {
  appid: 'wx85aeb51bb4a79515',
  buildPath: './build/production/',
  projectname: 'finger_mourning'
}

const buildPath = path.join(__dirname, `${config[environment].buildPath}`)
const sourcePath = path.join(__dirname, './src')
const configPath = path.join(buildPath, './project.config.json')

gulp.task('cleanBuildFolder', () =>
  del([`${buildPath}**/*`])
)

gulp.task('moveSourceToBuildFolder', () =>
  gulp
    .src(`${sourcePath}/**/*.*`)
    .pipe(newer(buildPath))
    .pipe(gulp.dest(buildPath))
)

gulp.task('cleanUselessFile', () =>
  del([path.join(buildPath, './**/*.md')])
)
function createConfigFile () {
  const { appid, projectname } = config[environment]

  return new Promise(resolve => {
    jsonfile.readFile(configPath, (error, oldFile) => {
      if (error) { oldFile = null }
      const condition = {
        'search': { 'current': -1, 'list': [] },
        'conversation': { 'current': -1, 'list': [] },
        'game': { 'currentL': -1, 'list': [] },
        'miniprogram': { 'current': -1, 'list': [] }
      }
      const fileContent = {
        'description': '项目配置文件。',
        'setting': {
          'urlCheck': false,
          'es6': true,
          'postcss': true,
          'minified': true,
          'newFeature': true
        },
        'compileType': 'game',
        'libVersion': '2.7.1',
        appid,
        projectname,
        'simulatorType': 'wechat',
        'simulatorPluginLibVersion': {},
        'condition': oldFile ? oldFile.condition : condition
      }
      jsonfile.writeFile(configPath, fileContent, { spaces: 2 })
      resolve()
    })
  })
}

gulp.task('build', done => { createConfigFile().then(done) })

gulp.task('default', gulp.series(
  'cleanBuildFolder',
  'moveSourceToBuildFolder',
  'cleanUselessFile',
  'build',
  done => {
    done()
    console.log('编译完成')
    console.log(`当前环境为${environment}`)
  }
))

gulp.task('watch', gulp.series('default', () =>
  watch(`${sourcePath}/**/*.*`, gulp.series(
    'cleanBuildFolder',
    'moveSourceToBuildFolder',
    'cleanUselessFile'
  )))
)
