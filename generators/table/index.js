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
    if (this.blueprint.pagination === undefined) this.blueprint.pagination = false
    if (this.blueprint.size === undefined) this.blueprint.size = ''
  },
  writing () {
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`src/components/${this.blueprint.tableName}/index.js`),
      this.blueprint
    )
  }
})
