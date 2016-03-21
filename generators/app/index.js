var generators = require('yeoman-generator')
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
  },
  initializing () {
    this.log('-----------------------------------------')
    this.log('welcome to use react-redux-plus generator')
    this.log('-----------------------------------------')
  },
  prompting () {
    var done = this.async()
    this.prompt([{
      type: 'input',
      name: 'projectName',
      message: 'your project name',
      default: this.appname,
      store: true
    }, {
      type: 'confirm',
      name: 'useAntd',
      message: 'use Ant.design',
      default: true,
      store: true
    }], (answers) => {
      this.config.set('name', answers.projectName)
      this.config.set('useAntd', answers.useAntd)
      this.config.save()
      done()
    })
  },
  writing () {
    this.bulkDirectory('.', '.')
  },
  install () {
    this.log('')
    this.log('install dependencies...')
    this.log('')
    this.runInstall('npm', '', {}, () => {
      if (this.config.get('useAntd')) {
        this.log('')
        this.log('install antd...')
        this.log('')
        this.npmInstall(['antd'], {save: true}, () => {
          this.log('')
          this.log('all done!')
        })
      } else {
        this.log('')
        this.log('all done!')
      }
    })
  }
})
