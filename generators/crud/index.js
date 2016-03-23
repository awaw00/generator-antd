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
    if (!this.blueprint.urlGet) this.blueprint.urlGet = this.blueprint.moduleName
    if (!this.blueprint.urlGetItem) this.blueprint.urlGetItem = this.blueprint.urlGet
    if (!this.blueprint.urlGetList) this.blueprint.urlGetList = this.blueprint.urlGet
    if (!this.blueprint.urlAdd) this.blueprint.urlAdd = this.blueprint.moduleName
    if (!this.blueprint.urlUpdate) this.blueprint.urlUpdate = this.blueprint.moduleName
    if (!this.blueprint.urlDel) this.blueprint.urlDel = this.blueprint.moduleName
    this.blueprint.hasOwner = (url) => {
      return /\$\{owner\}/i.test(url)
    }
    this.blueprint.hasKey = (url) => {
      return /\$\{key\}/i.test(url)
    }
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
