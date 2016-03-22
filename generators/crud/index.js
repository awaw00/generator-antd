var Inflector = require('inflected')
var generators = require('yeoman-generator')
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
    this.argument('blueprintFileName', {required: true, type: String})
    this.argument('distFolder', {type: String, required: false})
  },
  blueprint: null,
  initializing () {
    this.blueprint = require(this.destinationPath(this.blueprintFileName))
    this.blueprint.pluraName = Inflector.pluralize(this.blueprint.moduleName)
    this.blueprint.camelModuleName = Inflector.camelize(this.blueprint.moduleName)
    this.blueprint.camelPluraName = Inflector.camelize(this.blueprint.pluraName)
  },
  writing () {
    var distFolder = this.distFolder || 'src/redux/modules/'
    this.fs.copyTpl(
      this.templatePath('index.js'),
      distFolder + this.blueprint.moduleName + '.js',
      this.blueprint
    )
  }
})
