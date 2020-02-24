import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorSignIn: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.error.signin) {
      if (nextProps.error.signin !== prevState.errorSignIn) {
        return { errorSignIn: nextProps.error.signin };
      }
    }
    return null;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actSignIn(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errorSignIn } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form text-center">
        <h1>Đăng nhập</h1>
        <p>{errorSignIn ? errorSignIn : ''}</p>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập tên người dùng của bạn!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Tài khoản"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Vui lòng nhập Mật khẩu của bạn!' }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Mật khẩu"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng Nhập
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);
