var Inflector = require('inflected')
var generators = require('yeoman-generator')
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
    this.argument('blueprintFileName', {required: true, type: String})
    this.argument('distFolder', {type: String, default: 'src/redux/modules/'})
  },
  blueprint: null,
  initializing () {
    this.blueprint = require(this.destinationPath(this.blueprintFileName))
    this.blueprint.pluraName = Inflector.pluralize(this.blueprint.moduleName)
    this.blueprint.camelModuleName = Inflector.camelize(this.blueprint.moduleName)
    this.blueprint.camelPluraName = Inflector.camelize(this.blueprint.pluraName)
  },
  writing () {
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.distFolder + this.blueprint.moduleName + '.js',
      this.blueprint
    )
  }
})
