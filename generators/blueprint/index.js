var path = require('path')
var generators = require('yeoman-generator')
var Inflector = require('inflected')
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
    this.sourceRoot(path.resolve(__dirname, 'templates'))
  },
  answer: {},
  prompting () {
    var done = this.async()
    this.prompt([{
      type: 'list',
      name: 'type',
      message: 'choose which blueprint you want to create:',
      choices: ['form', 'table', 'crud', 'view', 'all']
    }, {
      type: 'input',
      name: 'name',
      message: 'blueprint name:',
      default: 'blueprint'
    }], (answers) => {
      this.answer = answers
      done()
    })
  },
  writing () {
    this.log('')
    this.log('start create blueprint files...')
    this.log('')
    var name = this.answer.name
    var type = this.answer.type
    var fileName = Inflector.underscore(name)
    var option = {
      name,
      classifyName: Inflector.classify(name),
      titleizeName: Inflector.titleize(name)
    }
    var all = type === 'all'
    if (type === 'form' || all) {
      this.template('form.js', `src/blueprints/form_${fileName}.js`, option)
    }
    if (type === 'table' || all) {
      this.template('table.js', `src/blueprints/table_${fileName}.js`, option)
    }
    if (type === 'crud' || all){
      this.template('crud.js', `src/blueprints/crud_${fileName}.js`, option)
    }
    if (type === 'view' || all){
      this.template('view.js', `src/blueprints/view_${fileName}.js`, option)
    }
  },
  end () {
    this.log('')
    this.log('enjoy your code!')
    this.log('')
  }
})
