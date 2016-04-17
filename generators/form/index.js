var generators = require('yeoman-generator')
var utils = require('../../utils/form')
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
    var blueprintFilePath = this.destinationPath(this.blueprintFileName ||
      this.options.blueprintFileName)
    this.blueprint = require(blueprintFilePath)
    this.items = []
    var fields = this.blueprint.modelFields
    var keys = Object.keys(fields).sort((a, b) => fields[a].form.order - fields[b].form.order)
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]
      if (!fields[key].form) continue

      this.items.push({
        fieldName: key,
        label: fields[key].form.label,
        type: fields[key].form.type,
        rules: fields[key].form.rules,
        options: fields[key].form.options
      })
    }

    this.blueprint.items = utils.setDefault(this.items)
  },
  writing () {
    var nodesAndModules = utils.getNodesAndModules(this.items)
    var initialStates = utils.getInitialState(this.items)
    var dist = this.destinationPath(path.join(this.blueprint.form.dist,
      this.blueprint.form.name, 'index.js'))
    this.fs.copyTpl(
      this.templatePath('index.js'),
      dist,
      {
        items: this.items,
        blueprint: this.blueprint,
        initialStates,
        modules: nodesAndModules.modules,
        nodes: nodesAndModules.nodes,
        stringify: require('../../utils').jsonToStr
      }
    )
  }
})
