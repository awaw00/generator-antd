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
      type: 'input',
      name: 'modelName',
      message: 'model\'s name:',
      default: 'model'
    }, {
      type: 'input',
      name: 'modelKey',
      message: 'model\'s key name:',
      default: '_id'
    }, {
      type: 'input',
      name: 'modelFields',
      message: 'model\'s field names(separated by a space):',
      default: ''
    }], (answers) => {
      this.answer = answers
      done()
    })
  },
  writing () {
    this.log('')
    this.log('start create blueprint files...')
    this.log('')
    var modelName = this.answer.modelName
    var modelKey = this.answer.modelKey
    var modelFields = this.answer.modelFields.split(' ')
    var fileName = Inflector.underscore(modelName)
    var option = {
      modelName,
      modelKey,
      modelFields,
      modelClassifyName: Inflector.classify(modelName),
      modelTitleizeName: Inflector.titleize(modelName)
    }
    this.template('index.js', `src/blueprints/${fileName}.js`, option)
  },
  end () {
    this.log('')
    this.log('enjoy your code!')
    this.log('')
  }
})
