var path = require('path')
var generators = require('yeoman-generator')

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
    this.sourceRoot(path.resolve(__dirname, 'templates'))
    this.argument('blueprintFileName', {type: String, required: true})
  },
  initializing () {
    // this.composeWith('antd:table')
    // this.composeWith('antd:crud')
    // this.composeWith('antd:view')
  },
  answer: {},
  prompting () {
    var done = this.async()
    this.prompt([{
      type: 'list',
      name: 'type',
      message: 'choose which component you want to create:',
      choices: ['all', 'form', 'table', 'crud', 'view']
    }], (answers) => {
      this.answer = answers
      const options = {
        options: {
          blueprintFileName: this.blueprintFileName
        }
      }
      const type = answers.type
      const all = type === 'all'
      if (type === 'form' || all) {
        this.composeWith('antd:form', options)
      }
      if (type === 'table' || all) {
        this.composeWith('antd:table', options)
      }
      if (type === 'crud' || all) {
        this.composeWith('antd:crud', options)
      }
      if (type === 'view' || all) {
        this.composeWith('antd:view', options)
      }
      done()
    })
  },
  writing () {
    this.log('')
    this.log('creating component...')
    this.log('')
    var type = this.answer.type
  },
  end () {
    this.log('')
    this.log('enjoy your code!')
    this.log('')
  }
})
