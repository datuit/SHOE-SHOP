import React, { useEffect } from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'react-redux';
import { actSignIn, actSignUp } from '../../redux/Session';
import { actDelError } from '../../redux/Error';
import Signin from './Signin';
import Signup from './Signup';

const Sign = ({ actSignIn, actSignUp, error, actDelError }) => {
  useEffect(() => {
    return () => actDelError();
  }, [actDelError]);
  return (
    <Row>
      <Col span={24} className="text-center">
        <h3>Đăng nhập bằng:</h3>
        <a href="https://shoeshop.ml/api/user/auth/facebook">
          <Icon type="facebook" style={{ fontSize: '50px', color: 'blue' }} />
        </a>
        <h3>Hoặc</h3>
      </Col>
      <Col xs={24} sm={12} className="pl-5 pr-5">
        <Signin actSignIn={actSignIn} error={error} />
      </Col>
      <Col xs={24} sm={12} className="pr-5 pl-5">
        <Signup actSignUp={actSignUp} error={error} />
      </Col>
    </Row>
  );
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps, { actSignIn, actSignUp, actDelError })(
  Sign
);
