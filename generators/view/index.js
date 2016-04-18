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
    var blueprintFilePath = this.destinationPath(this.blueprintFileName || this.options.blueprintFileName)
    this.blueprint = require(blueprintFilePath)
    this.blueprint.table = this.blueprint.table || null
    this.blueprint.form = this.blueprint.form || null
    var crud = this.blueprint.crud
  },
  writing () {
    var dist = this.destinationPath(path.join(
      this.blueprint.view.dist, this.blueprint.view.name + '.js'
    ))
    this.fs.copyTpl(
      this.templatePath('index.js'),
      dist,
      Object.assign({}, this.blueprint)
    )
  }
})
