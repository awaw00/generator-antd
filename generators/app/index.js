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
      message: 'your project name:',
      default: this.appname,
      store: true
    }, {
      type: 'input',
      name: 'author',
      message: 'author:',
      default: '',
      store: true
    }, {
      type: 'input',
      name: 'gitRepo',
      message: 'git repository:',
      default: '',
      store: true
    }], (answers) => {
      this.config.set('projectName', answers.projectName)
      this.config.set('author', answers.author)
      this.config.set('gitRepo', answers.gitRepo)
      this.config.save()
      done()
    })
  },
  writing () {
    this.log('')
    this.directory('appTemplate', '.')
    this.template('package.json', 'package.json', {
      projectName: this.config.get('projectName'),
      author: this.config.get('author'),
      gitRepo: this.config.get('gitRepo')
    })
  },
  install () {
    this.log('')
    this.log('install dependencies...')
    this.log('')
    this.runInstall('npm', '', {}, () => {
      this.log('')
      this.log('all done!')
    })
  }
})
