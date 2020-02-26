import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import AOS from 'aos';

const SuccessBuyCart = () => {
  let history = useHistory();
  AOS.init();
  return (
    <div data-aos="fade-up">
      <Result
        status="success"
        title="Đặt hàng thành công!"
        subTitle="Chúng tôi sẽ xác nhận đơn hàng trong thời gian sớm nhất!"
        extra={[
          <Button type="primary" onClick={() => history.push('/')}>
            Về trang chủ
          </Button>
        ]}
      />
    </div>
  );
};

export default SuccessBuyCart;
