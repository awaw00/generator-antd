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
    var opParams = new Set()
    for (var key in blueprint.crud.operations) {
      var re = new RegExp(/\$\{(.*?)\}/)
      var string = blueprint.crud.operations[key]
      var match = re.exec(string)
      while(match != null) {
        if (match[1] !== 'key') {
          opParams.add(match[1])
        }
        string = string.substring(match.index + match[0].length)
        match = re.exec(string)
      }
    }
    var crudBlueprint = {
      keyName: blueprint.modelKey,
      moduleName: blueprint.modelName,
      pluraName: Inflector.pluralize(blueprint.modelName),
      classifyName: Inflector.classify(blueprint.modelName),
      pagination: blueprint.pagination || false,
      opParams: [...opParams].map((i) => ({
        name: i,
        classifyName: Inflector.classify(i),
        underscoreName: Inflector.underscore(i).toUpperCase()
      }))
    }
    this.blueprint = Object.assign(crudBlueprint, blueprint.crud)
  },
  writing () {
    var dist = this.destinationPath(path.join(
      this.blueprint.dist, this.blueprint.modelName + '.js'
    ))

    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.blueprint.dist + this.blueprint.moduleName + '.js',
      this.blueprint
    )
  }
})
