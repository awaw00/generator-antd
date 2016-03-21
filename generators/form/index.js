var generators = require('yeoman-generator')
var utils = require('../../utils/form')
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
    this.argument('blueprintFileName', {type: String, required: true})
  },
  blueprint: null,
  initializing () {
    var blueprintFilePath = this.destinationPath(this.blueprintFileName)
    this.blueprint = require(blueprintFilePath)
    this.blueprint.items = utils.setDefault(this.obj.items)
  },
  prompting () {
  },
  configuring () {
  },
  writing () {
    var nodesAndModules = utils.getNodesAndModules(this.blueprint.items)
    var initialStates = utils.getInitialState(this.blueprint.items)
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`src/components/${this.blueprint.formName}/index.js`),
      {
        blueprint: this.blueprint,
        initialStates,
        modules: nodesAndModules.modules,
        nodes: nodesAndModules.nodes
      }
    )
  },
  conflicts () {
  }
})
