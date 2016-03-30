var generators = require('yeoman-generator')
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
    this.argument('blueprintFileName', {type: String, required: true})
  },
  blueprint: null,
  initializing () {
    var blueprintFilePath = this.destinationPath(this.blueprintFileName)
    this.blueprint = require(blueprintFilePath)
    this.blueprint.table = this.blueprint.table || null
    this.blueprint.form = this.blueprint.form || null
  },
  writing () {
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`src/views/${this.blueprint.viewName}/index.js`),
      this.blueprint
    )
  }
})
