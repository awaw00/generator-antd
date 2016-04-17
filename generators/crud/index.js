var Inflector = require('inflected')
var generators = require('yeoman-generator')
var path = require('path')
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
    if (!this.options.blueprintFileName) {
      this.argument('blueprintFileName', {type: String, required: true})
    }
  },
  blueprint: null,
  initializing () {
    var blueprint = require(this.destinationPath(this.blueprintFileName || this.options.blueprintFileName))
    var crudBlueprint = {
      modelName: blueprint.modelName,
      modelKey: blueprint.modelKey,
      pluraName: Inflector.pluralize(blueprint.modelName),
      pagination: blueprint.pagination || false,
    }
    this.blueprint = Object.assign(crudBlueprint, blueprint.crud)
  },
  writing () {
    var dist = this.destinationPath(path.join(
      this.blueprint.dist, this.blueprint.modelName + '.js'
    ))
    console.log(dist, this.blueprint)
    // this.fs.copyTpl(
    //   this.templatePath('index.js'),
    //   this.blueprint.dist + this.blueprint.moduleName + '.js',
    //   this.blueprint
    // )
  }
})
