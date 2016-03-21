var generators = require('yeoman-generator')
var utils = require('../../utils/form')
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
    this.argument('baseFileName', {type: String, required: true})
  },
  obj: null,
  initializing () {
    var baseFilePath = this.destinationPath(this.baseFileName)
    this.obj = require(baseFilePath)
    this.obj.items = utils.setDefault(this.obj.items)
  },
  prompting () {
  },
  configuring () {
  },
  writing () {
    var nodesAndModules = utils.getNodesAndModules(this.obj.items)
    var initialStates = utils.getInitialState(this.obj.items)
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`src/components/${this.obj.formName}/index.js`),
      {
        obj: this.obj,
        initialStates,
        modules: nodesAndModules.modules,
        nodes: nodesAndModules.nodes
      }
    )
  },
  conflicts () {
  }
})
