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
      pagination: true,
      routeBase: 'moduleName',
      routeGetItem: '${key}',
      routeGetList: '${count}/${page}',
      routeAdd: '',
      routeUpdate: '${key}',
      routeDel: '${key}'
    }
    this.blueprint = require(this.destinationPath(this.blueprintFileName))
    this.blueprint.pluraName = Inflector.pluralize(this.blueprint.moduleName)
    this.blueprint.hasKey = (url) => {
      return /\$\{key\}/i.test(url)
    }
    this.blueprint = Object.assign(base, this.blueprint)
    this.blueprint.hasOwner = /\$\{owner\}/.test(this.blueprint.routeBase)
    this.log(this.blueprint.hasOwner)
    this.blueprint.getRoute = ((bp) => {
      return (route) => {
        var arr = []
        if (bp.routeBase) arr.push(bp.routeBase)
        if (route) arr.push(route)
        return arr.join('/')
      }
    })(this.blueprint)
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
