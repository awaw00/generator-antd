// TODO: 分页获取
var Inflector = require('inflected')
var generators = require('yeoman-generator')
module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments)
    this.argument('blueprintFileName', {required: true, type: String})
    this.argument('distFolder', {type: String, required: false})
  },
  blueprint: null,
  initializing () {
    var base = {
      moduleName: 'moduleName',
      keyName: 'keyName',
      pagination: false,
      urlGetItem: 'moduleName/${key}',
      urlGetList: 'moduleName',
      urlAdd: 'moduleName',
      urlUpdate: 'moduleName/${key}',
      urlDel: 'moduleName/${key}'
    }
    this.blueprint = require(this.destinationPath(this.blueprintFileName))
    this.blueprint.pluraName = Inflector.pluralize(this.blueprint.moduleName)
    this.blueprint.hasOwner = (url) => {
      return /\$\{owner\}/i.test(url)
    }
    this.blueprint.hasKey = (url) => {
      return /\$\{key\}/i.test(url)
    }
    this.blueprint = Object.assign(base, this.blueprint)
  },
  writing () {
    var distFolder = this.distFolder || 'src/redux/modules/'
    this.fs.copyTpl(
      this.templatePath('index.js'),
      distFolder + this.blueprint.moduleName + '.js',
      this.blueprint
    )
  }
})
