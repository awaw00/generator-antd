var utils = require('./')
module.exports = {
  setDefault (items) {
    return items.map((i) => {
      if (typeof i.default !== 'undefined') return i

      if (i.type === 'text' || i.type === 'textarea' || i.type === 'password') {
        i.default = ''
      } else if (i.type === 'checkbox') {
        i.default = true
      } else if (i.type === 'checkbox-group') {
        i.default = []
      } else if (i.type === 'number') {
        i.default = 0
      } else if (i.type === 'date-picker') {
        i.default = '2016-01-01'
      } else if (i.type === 'month-picker') {
        i.default = '2016-01'
      } else if (i.type === 'range-picker') {
        i.default = []
      } else if (i.type === 'time-picker') {
        i.default = '12:00:00'
      } else {
        i.default = null
      }
      return i
    })
  },
  getInitialState (items) {
    return items.map((i, index, arr) => {
      var comma = index === arr.length - 1 ? '' : ','
      if (i.type === 'text' || i.type === 'textarea' || i.type === 'password') {
        return `${i.fieldName}: \'${i.default}\'${comma}`
      } else if (i.type === 'checkbox') {
        return `${i.fieldName}: ${i.default ? 'true' : 'false'}${comma}`
      } else if (i.type === 'number') {
        return `${i.fieldName}: ${i.default}${comma}`
      } else if (i.type === 'date-picker' ||
        i.type === 'time-picker' || i.type === 'month-picker') {
        return `${i.fieldName}: \'${i.default}\'${comma}`
      } else if (i.type === 'range-picker' || i.type === 'checkbox-group') {
        return `${i.fieldName}: ${utils.jsonToStr(i.default)}${comma}`
      } else {
        return `${i.fieldName}: ${utils.jsonToStr(i.default)}${comma}`
      }
    })
  },
  getNodesAndModules (items) {
    var modules = new Set()
    var nodes = items.map((i, index, arr) => {
      if (i.type === 'text' || i.type === 'textarea' || i.type === 'password' || i.type === 'number') {
        modules.add("import Input from 'antd/lib/input'")
        return `<Input type='${i.type}'${i.size ? ' size=\'' + i.size + '\'' : ''} {...${i.fieldName}Props} />`
      } else if (i.type === 'checkbox') {
        modules.add("import Checkbox from 'antd/lib/checkbox'")
        return `<Checkbox {...${i.fieldName}Props} />`
      } else if (i.type === 'checkbox-group') {
        modules.add("import Checkbox from 'antd/lib/checkbox'")
        return `<Checkbox.Group options={${utils.jsonToStr(i.options)}} {...${i.fieldName}Props} />`
      } else if (i.type === 'radio-group') {
        modules.add("import Radio from 'antd/lib/radio'")
        var node =
        `<Radio.Group {...${i.fieldName}Props}>\n` +
        i.options.map((i) => `              <Radio value={${typeof i === 'number' ? i : utils.jsonToStr(i)}}>${i}</Radio>\n`).join('') +
        `            </Radio.Group>`
        return node
      } else if (i.type === 'date-picker') {
        modules.add("import DatePicker from 'antd/lib/date-picker'")
        return `<DatePicker${i.showTime ? ' showTime' : ''}${i.size ? ' size=\'' + i.size + '\'' : ''} {...${i.fieldName}Props} />`
      } else if (i.type === 'month-picker') {
        modules.add("import DatePicker from 'antd/lib/date-picker'")
        return `<DatePicker.MonthPicker${i.size ? ' size=\'' + i.size + '\'' : ''} {...${i.fieldName}Props} />`
      } else if (i.type === 'range-picker') {
        modules.add("import DatePicker from 'antd/lib/date-picker'")
        return `<DatePicker.RangePicker${i.showTime ? ' showTime' : ''}${i.size ? ' size=\'' + i.size + '\'' : ''} {...${i.fieldName}Props} />`
      } else if (i.type === 'time-picker') {
        modules.add("import TimePicker from 'antd/lib/time-picker'")
        return `<TimePicker ${i.size ? 'size=\'' + i.size + '\' ' : ' '}{...${i.fieldName}Props} />`
      }
      return ''
    }).filter((i) => i && i.length > 0)
    return {
      nodes,
      modules: [...modules]
    }
  }
}
