import React, { PropTypes } from 'react'
import Table from 'antd/lib/table'
<% if (methods.length > 0) { -%>
import Button from 'antd/lib/button'
<% } -%>

const <%- tableName %> = React.createClass({
  columns: [],
  propTypes: {
    dataSource: PropTypes.array.isRequired,
    loading: PropTypes.bool<%- methods.length > 0 || pagination ? ',' : '' %>
    <%_ if (pagination) { _%>
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    pageChangeHandler: PropTypes.func.isRequired<%- methods.length > 0 ? ',' : '' %>
    <%_ } _%>
    <%_ for (var i = 0; i < methods.length; i++) { _%>
    <%- methods[i].name %>ClickHandler: PropTypes.func.isRequired<%- (i < methods.length - 1 ? ',' : '') %>
    <%_ } _%>
  },
  getDefaultProps () {
    return {
      dataSource: [],
      loading: false<%- methods.length > 0 || pagination ? ',' : '' %>
      <%_ if (pagination) { _%>
      pageSize: 10,
      currentPage: 1,
      pageChangeHandler: () => {}<%- methods.length > 0 ? ',' : '' %>
      <%_ } _%>
      <%_ for (var i = 0; i < methods.length; i++) { _%>
      <%- methods[i].name %>ClickHandler: () => {}<%- (i < methods.length - 1 ? ',' : '') %>
      <%_ } _%>
    }
  },
  componentWillMount () {
    this.columns = [
      <%_ for(var i = 0; i < cols.length; i++) { _%>
      {title: '<%- cols[i].title %>', <%- cols[i].renderAs ? ('render: (t, r) => <span>{' + cols[i].renderAs + '}</span>') : (`dataIndex: '${cols[i].dataIndex}'`) %>}<%- (i === cols.length - 1 && methods.length === 0 ? '' : ',') %>
      <%_ } _%>
      <%_ if (methods.length > 0) { _%>
      {title: '操作', render: (t, r) => {
        return (
          <Button.Group>
            <%_ for (var i = 0; i < methods.length; i++) { _%>
            <Button size='small' onClick={this.on<%- (methods[i].name[0].toUpperCase() + methods[i].name.slice(1)) %>Click.bind(this, r)}>
              <%- methods[i].label %>
            </Button>
            <%_ } _%>
          </Button.Group>
        )
      }}
      <%_ } _%>
    ]
  },
  <%_ for (var i = 0; i < methods.length; i++) { _%>
  on<%- (methods[i].name[0].toUpperCase() + methods[i].name.slice(1)) %>Click (item) {
    const {<%- methods[i].name %>ClickHandler} = this.props
    <%- methods[i].name %>ClickHandler(item)
  }<%- i < methods.length ? ',' : '' %>
  <%_ } _%>
  render () {
    const {dataSource, loading} = this.props
    <%_ if (pagination) { _%>
    const {pageChangeHandler, pageSize, currentPage} = this.props
    const pagination = {
      pageSize,
      current: currentPage,
      defaultCurrent: 1,
      onChange: pageChangeHandler
    }
    <%_ } else { _%>
    const pagination = {
      pageSize: 20,
      current: 1,
      defaultCurrent: 1,
      showSizeChanger: true
    }
    <%_ } _%>
    return (
      <Table<%- size ? ' size=\'' + size + '\' ' : ' ' %>loading={loading} pagination={pagination} columns={this.columns} dataSource={dataSource} rowKey={(i) => i.<%- keyName %>} />
    )
  }
})

export default <%- tableName %>
