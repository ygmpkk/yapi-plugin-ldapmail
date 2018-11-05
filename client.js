import React, { Component, Fragment } from 'react'
import  { message, Modal, Icon, Input, Form, Button } from 'antd'
import axios from 'axios'

const FormItem = Form.Item

module.exports = function (options) {
  this.bindHook('third_login', Form.create()(class LDAPComponent extends Component {
    state = {
      showLogin: false,
    }

    handleClick = (e) => {
      e.preventDefault()

      this.setState({
        showLogin: true,
      })
    }

    doLogin = async (data) => {
      const {headers} = await axios.post('/api/user/login_by_token', data)
    }

    handleLogin = (e) => {
      e.preventDefault()

      this.props.form.validateFields(async (err, values) => {
        if (!err) {
          const ret = await axios.post('/api/user/login_by_token', values)

          // 没有更好的办法
          if (/group/.test(ret.request.responseURL)) {
            location.href = ret.request.responseURL
            return
          }

          if (/html/.test(ret.headers['content-type'])) {
            message.error('登录失败')
            return
          }
        }
      })
    }

    handleCancel = (e) => {
      e.preventDefault()

      this.setState({
        showLogin: false,
      })
    }

    render() {
      const { getFieldDecorator } = this.props.form

      return (
        <Fragment>
          <button onClick={this.handleClick} className="btn-home btn-home-normal" >LDAP + Mail登录</button>
          <Modal
            centered
            maskClosable={false}
            title='企业邮箱LDAP登录'
            visible={this.state.showLogin}
            onOk={this.handleLogin}
            onCancel={this.handleCancel}
          >
            <Form>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: '请输入电子邮箱' }],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
              </FormItem>
            </Form>
          </Modal>
        </Fragment>
      )
    }
  }));
};
