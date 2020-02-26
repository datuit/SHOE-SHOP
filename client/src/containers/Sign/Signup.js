import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorSignUp: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.error.signup) {
      if (nextProps.error.signup !== prevState.errorSignUp) {
        return { errorSignUp: nextProps.error.signup };
      }
    }
    return null;
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.password !== values.repassword) {
          message.warning('Mật khẩu không giống nhau');
        } else {
          this.props.actSignUp({
            username: values.username,
            password: values.password,
            fullname: values.fullname
          });
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errorSignUp } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form text-center">
        <h1>Đăng Kí</h1>
        <p>{errorSignUp ? errorSignUp : ''}</p>
        <Form.Item>
          {getFieldDecorator('fullname', {
            rules: [
              {
                required: true,
                message: 'Vui lòng nhập tên của bạn!'
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="solution" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="Tên đầy đủ"
            />
          )}
        </Form.Item>
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
              placeholder="Tên đăng nhập"
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
              type="password"
              placeholder="Mật khẩu (6-16 kí tự)"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('repassword', {
            rules: [
              { required: true, message: 'Vui lòng nhập Mật khẩu của bạn!' }
            ]
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Xác nhận mật khẩu"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng Kí
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'normal_sign' })(NormalLoginForm);
