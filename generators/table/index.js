var generators = require('yeoman-generator')
var utils = require('../../utils')
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
    this.argument('baseFileName', {type: String, required: true})
  },
  obj: null,
  initializing () {
    var baseFilePath = this.destinationPath(this.baseFileName)
    this.obj = require(baseFilePath)
    if (this.obj.pagination === undefined) this.obj.pagination = false
    if (this.obj.size === undefined) this.obj.size = ''
  },
  prompting () {
  },
  configuring () {
  },
  writing () {
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`src/components/${this.obj.tableName}/index.js`),
      this.obj
    )
  },
  conflicts () {
  }
})
