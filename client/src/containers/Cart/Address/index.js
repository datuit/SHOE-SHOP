import React, { useState, Fragment } from 'react';
import { Button, Row, Col, Input, message, Icon, Radio } from 'antd';
import classnames from 'classnames';

const Address = ({ addressUser, actAddAddress }) => {
  //true open, false close add address
  const [addressInput, setAddressInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('+84 ');
  const [statusFormAddress, setStatusFormAddress] = useState(false);
  //Add the address to the account
  const isAddressToUser = () => {
    const key = 'updatable';
    message.loading({ content: 'Đang xử lí', key });
    actAddAddress({ address: addressInput, phone: phoneInput }).then(res => {
      setTimeout(() => {
        if (res === 200) {
          message.success({ content: 'Thêm thành công!', key, duration: 2 });
        } else {
          message.warning({
            content: 'Thất bại, thử lại sau!',
            key,
            duration: 2
          });
        }
      }, 500);
    });
    setAddressInput('');
    setPhoneInput('+84 ');
    setStatusFormAddress(false);
  };
  return (
    <Fragment>
      <h4
        className="text-uppercase"
        style={{
          fontSize: '25px',
          borderBottom: '1px #e8e8e8 solid'
        }}
      >
        Địa chỉ giao hàng
      </h4>
      <Radio.Group defaultValue={0} onChange={e => console.log(e)}>
        {addressUser && addressUser.length > 0
          ? addressUser.map((address, i) => (
              <Radio
                key={i}
                value={i}
                size="large"
                className="border p-2 mt-2 mb-2"
              >
                <span>Địa chỉ : {address.address}</span>
                <br></br>
                <span>SĐT : {address.phone}</span>
                <br></br>
                <Button className="text-right" size="small">
                  Xoá
                </Button>
              </Radio>
            ))
          : ''}
      </Radio.Group>
      <Row
        gutter={8}
        className={classnames('mt-2 mb-2', { 'd-none': !statusFormAddress })}
      >
        <Col xs={24} sm={12}>
          <Input
            prefix={<Icon type="contacts" />}
            placeholder="Nhập địa chỉ"
            value={addressInput}
            onChange={e => setAddressInput(e.target.value)}
            className="mt-2 mb-2"
          />
          <Input
            prefix={<Icon type="phone" />}
            placeholder="Nhập địa chỉ"
            value={phoneInput}
            onChange={e => setPhoneInput(e.target.value)}
          />
        </Col>
        <Col span={24} className="mt-2 mb-2">
          <Button type="primary" icon="plus" onClick={isAddressToUser}>
            Thêm vào
          </Button>
        </Col>
      </Row>
      <Button
        type="primary"
        icon="plus"
        onClick={() => setStatusFormAddress(true)}
        className="d-block"
      >
        Thêm địa chỉ
      </Button>
    </Fragment>
  );
};

export default Address;
