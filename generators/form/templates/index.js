import React, { PropTypes } from 'react'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
<% for (var i = 0; i < modules.length; i++) { -%>
<%- modules[i] %>
<% } -%>
<%_ states = obj.items.map((i) => i.fieldName) _%><%_ statesStr = states.join(', ') _%>

const <%- obj.formName %> = React.createClass({
  propTypes: {
    form: PropTypes.object.isRequired,
    confirmLoading: PropTypes.bool,
    visible: PropTypes.bool.isRequired,
    okHandler: PropTypes.func.isRequired,
    cancelHandler: PropTypes.func.isRequired,
    editMode: PropTypes.oneOf(['new', 'edit']).isRequired,
    editTarget: PropTypes.object // null if editMode is 'new'
  },
  initialState: {
    <%_ for (var i = 0; i < initialStates.length; i++) { _%>
    <%- initialStates[i] %>
    <%_ } _%>
  },
  getDefaultProps () {
    return {
      confirmLoading: false,
      visible: false,
      okHandler: () => {},
      cancelHandler: () => {},
      editMode: 'new',
      editTarget: null
    }
  },
  getInitialState () {
    return this.initialState
  },
  componentWillReceiveProps (nextProps) {
    const {visible, editMode, editTarget} = nextProps
    if (!visible || visible && this.props.visible) return

    if (editMode === 'new') {
      nextProps.form.resetFields()
      nextProps.form.setFieldsValue(this.initialState)
    } else {
      nextProps.form.setFieldsValue(editTarget)
    }
  },
  onOk () {
    const {okHandler, form} = this.props
    const {getFieldsValue} = form
    if (okHandler) {
      okHandler(getFieldsValue())
    }
  },
  render () {
    const {visible, cancelHandler, editMode, confirmLoading} = this.props
    const {<%- statesStr %>} = this.state
    const title = editMode === 'new' ? '<%- obj.newTitle %>' : '<%- obj.editTitle %>'
    const formLayout = {
      labelCol: {span: <%- obj.labelCol ? obj.labelCol : 4 %>},
      wrapperCol: {span: <%- obj.wrapperCol ? obj.wrapperCol : 16 %>}
    }

    const {getFieldProps} = this.props.form
    <%_ for (var i = 0; i < obj.items.length; i++) { _%>
    <%_ name = obj.items[i].fieldName _%>
      <%_ if (obj.items[i].type === 'checkbox') { _%>
    const <%- name %>Props = getFieldProps('<%- name %>', {valuePropName: 'checked'})
      <%_ } else { _%>
    const <%- name %>Props = getFieldProps('<%- name %>')
      <%_ } _%>
    <%_ } _%>
    return (
      <Modal confirmLoading={confirmLoading} title={title} visible={visible} onCancel={cancelHandler} onOk={this.onOk}>
        <Form horizontal>
          <%_ for (var i = 0; i < nodes.length; i++) { _%>
          <Form.Item label='<%- obj.items[i].label %>：' {...formLayout}>
            <%- nodes[i] %>
          </Form.Item>
          <%_ } _%>
        </Form>
      </Modal>
    )
  }
})

export default Form.create()(<%- obj.formName %>)
