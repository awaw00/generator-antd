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
    var blueprint = require(blueprintFilePath)
    var modelFields = blueprint.modelFields
    var keys = Object.keys(modelFields)
      .filter((i) => modelFields[i].table)
      .sort((a, b) => modelFields[a].table.order - modelFields[b].table.order)
    this.tableBlueprint = {
      keyName: blueprint.modelKey,
      tableName: blueprint.table.name,
      pagination: blueprint.pagination || false,
      methods: blueprint.table.methods || [],
      size: blueprint.table.size || '',
      cols: keys.map((i) => ({
        title: modelFields[i].table.title,
        dataIndex: i,
        renderAs: modelFields[i].table.renderAs,
        filter: modelFields[i].table.filter
      })),
      dist: blueprint.table.dist
    }
    this.log(this.tableBlueprint.cols)
  },
  writing () {
    var dist = this.destinationPath(path.join(this.tableBlueprint.dist, this.tableBlueprint.tableName, 'index.js'))
    this.fs.copyTpl(
      this.templatePath('index.js'),
      dist,
      this.tableBlueprint
    )
  }
})
