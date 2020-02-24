import React from 'react'
import { Result, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import AOS from 'aos'

const SuccessBuyCart = () => {
  let history = useHistory()
  AOS.init()
  return (
    <div data-aos="fade-up">
      <Result
        status="success"
        title="Đặt hàng thành công!"
        subTitle="Vui lòng đợi 1-5 phút, để chúng tôi xác nhận đơn hàng."
        extra={[
          <Button type="primary" onClick={() => history.push('/')}>
            Về trang chủ
          </Button>
        ]}
      />
    </div>
  )
}

export default SuccessBuyCart
