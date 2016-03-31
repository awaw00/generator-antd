import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actionCreators} from 'redux/modules/<%- crud.moduleName %>'
<%_ if (table) { _%>
import <%- table.tableName %> from 'components/<%- table.tableName %>'
<%_ } _%>
<%_ if (form) { _%>
import <%- form.formName %> from 'components/<%- form.formName %>'
import {Button, message} from 'antd'
<%_ } _%>

const <%- viewName %> = React.createClass({
  propTypes: {
    actions: PropTypes.object.isRequired,
    <%- crud.moduleName %>: PropTypes.object.isRequired
  },
  <%_ if (table) { _%>
    <%_ if (!table.pagination) { _%>
  componentWillMount () {
    this.props.actions.getList()
  },
    <%_ } _%>
    <%_ if (table.pagination) { _%>
  getInitialState () {
    return {
      pageSize: 10,
      currentPage: 1
    }
  },
  componentWillMount () {
    this.props.actions.getList(this.state.currentPage, this.state.pageSize)
  },
  pageChangeHandler (currentPage) {
    this.setState({currentPage})
    this.props.actions.getList(currentPage, this.state.pageSize)
  },
    <%_ } _%>
    <%_ for (var i = 0; i < table.methods.length; i++) { _%>
  item<%- table.methods[i].name[0].toUpperCase() + table.methods[i].name.slice(1) %> (item) {
      <%_ if (/edit/i.test(table.methods[i].name)) { _%>
    this.props.actions.startEditItem(item)
      <%_ } else if (/del/i.test(table.methods[i].name)) { _%>
    Modal.confirm({
      title: '确认操作',
      content: '确认要删除该条目吗？',
      onOk: () => {
        this.props.actions.delItem(item.<%- crud.keyName %>, () => {
          message.success('操作成功')
        }, (err) => {
          message.error('操作失败')
          console.error(err)
        })
      }
    })
      <%_ } else { _%>
    // TODO: handle <%- table.methods[i].name %>

      <%_ } _%>
  },
    <%_ } _%>
  <%_ } _%>
  <%_ if (form) { _%>
  addItem () {
    this.props.actions.startEditItem()
  },
  editOk (item) {
    const {<%- crud.moduleName %>: {editTarget, editMode}} = this.props
    if (editMode === 'new') {
      this.props.actions.addItem(item, () => {
        message.success('操作成功')
        this.props.actions.endEditItem()
      }, (err) => {
        message.error('操作失败')
        console.error(err)
      })
    } else {
      this.props.actions.updateItem(item.<%- crud.keyName %>, item, () => {
        message.success('操作成功')
        this.props.actions.endEditItem()
      }, (err) => {
        message.error('操作失败')
        console.error(err)
      })
    }
  },
  endEdit () {
    this.props.actions.endEditItem()
  },
  <%_ } _%>
  render () {
    const {<%- crud.moduleName %>: {
      requesting, list, editing, editTarget, editMode
    }} = this.props
    <%_ if (form) { _%>
    const formProps = {
      visible: editing,
      editMode,
      editTarget,
      okHandler: this.editOk,
      cancelHandler: this.endEdit
    }
    <%_ } _%>
    <%_ if (table) { _%>
    const tableProps = {
      dataSource: list,
      loading: requesting<%- table.methods.length > 0 || table.pagination ? ',' : '' %>
      <%_ if (table.pagination) { _%>
      pageSize: this.state.pageSize,
      currentPage: this.state.currentPage,
      total: this.props.<%- crud.moduleName %>.total,
      pageChangeHandler: this.pageChangeHandler<%- table.methods.length > 0 ? ',' : '' %>
      <%_ } _%>
      <%_ for (var i = 0; i < table.methods.length; i++) { _%>
      <%- table.methods[i].name %>ClickHandler: this.item<%- table.methods[i].name[0].toUpperCase() + table.methods[i].name.slice(1) %><%- i === table.methods.length - 1 ? '' : ',' %>
      <%_ } _%>
    }
    <%_ } _%>
    return (
      <div>
        <%_ if (form) { _%>
        <Button.Group style={{marginBottom: '10px'}}>
          <Button type='primary' onClick={this.addItem}>添加</Button>
        </Button.Group>
        <<%- form.formName %> {...formProps} />
        <%_ } _%>
        <%_ if (table) { _%>
        <<%- table.tableName %> {...tableProps} />
        <%_ } _%>
      </div>
    )
  }
})

const mapStateToProps = (state) => ({<%- crud.moduleName %>: state.<%- crud.moduleName %>})
const mapActionsToProps = (dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
})
export default connect(mapStateToProps, mapActionsToProps)(<%- viewName %>)
