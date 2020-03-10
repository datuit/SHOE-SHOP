import React, { Fragment } from 'react';
import { Table, Avatar, Empty, Button, Row, Col, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AOS from 'aos';
import { actDEL_CART, actBUY_CART } from 'Redux/Cart';
import { actAddAddress } from 'Redux/Session';
import Address from './Address';
import Notification from 'Components/Notification';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const columns = isDelItem => {
  return [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      render: src => <Avatar size={100} src={src} />
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      render: name => <h3>{name}</h3>
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: price => <h3>{price.toLocaleString()} VNĐ</h3>
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
      align: 'center',
      render: quantity => <h3>{quantity}</h3>
    },
    {
      title: 'Total',
      key: 'total',
      align: 'center',
      render: record => (
        <h3>{(record.quantity * record.price).toLocaleString()}</h3>
      )
    },
    {
      title: 'Remove',
      key: 'remove',
      align: 'center',
      render: record => (
        <Button
          icon="close"
          type="primary"
          size="large"
          onClick={() => isDelItem(record)}
        />
      )
    }
  ];
};

const Cart = props => {
  AOS.init();
  const {
    cart,
    actDEL_CART,
    actBUY_CART,
    isLogin,
    addressUser,
    actAddAddress
  } = props;
  let history = useHistory();
  const isDelItem = item => {
    actDEL_CART(item);
  };

  const showCart = () => {
    var a = cart.slice();
    a = a.map((e, i) => {
      e.key = i;
      return e;
    });
    return a;
  };

  const Total = () => {
    let total = 0;
    cart.forEach(item => (total += item.price * item.quantity));
    return total;
  };

  const confirm = async () => {
    if (cart.length > 0) {
      if (!isLogin) {
        return Notification(
          'warning',
          'Đăng nhập',
          'Vui lòng đăng nhập trước khi thực hiện thanh toán!',
          2
        );
      } else if (addressUser.length === 0) {
        return Notification(
          'warning',
          'Địa chỉ',
          'Chưa có địa chỉ nhận hàng!',
          2
        );
      } else {
        var status;
        await actBUY_CART(cart).then(e => (status = e));
        if (status) {
          history.push('/cart/succes-buy');
        }
      }
    }
  };
  return (
    <div data-aos="flip-left">
      <div className="container mt-5 mb-5" style={{ minHeight: '250px' }}>
        {cart.length > 0 ? (
          <Fragment>
            <Table
              bordered
              columns={columns(isDelItem)}
              dataSource={showCart()}
              pagination={false}
            />
            <Row className="mt-4">
              <Col xs={24} sm={{ span: 16 }}>
                {isLogin ? (
                  <Address
                    addressUser={addressUser}
                    actAddAddress={actAddAddress}
                  />
                ) : (
                  ''
                )}
              </Col>
              <Col xs={24} sm={{ span: 8 }}>
                <Row>
                  <h4
                    className="text-uppercase text-sm-right"
                    style={{
                      fontSize: '25px',
                      borderBottom: '1px #e8e8e8 solid'
                    }}
                  >
                    <FormattedMessage {...messages.totalcart} />
                  </h4>
                  <Col span={24}>
                    <Col
                      span={12}
                      style={{
                        fontSize: '20px',
                        fontWeight: 'bold'
                      }}
                    >
                      <FormattedMessage {...messages.total} />
                    </Col>
                    <Col
                      span={12}
                      className="text-right"
                      style={{
                        fontSize: '20px',
                        fontWeight: 'bold'
                      }}
                    >
                      {Total().toLocaleString()}
                    </Col>
                    <Col span={24} className="mt-2 text-right">
                      <Popconfirm
                        placement="topRight"
                        title={'Xác nhận mua hàng'}
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="primary">
                          <FormattedMessage {...messages.pay} />
                        </Button>
                      </Popconfirm>
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Fragment>
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            imageStyle={{
              height: 100
            }}
            description={
              <span>
                <FormattedMessage {...messages.empty} />
              </span>
            }
          ></Empty>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart,
  addressUser: state.session.address
});

export default connect(mapStateToProps, {
  actDEL_CART,
  actBUY_CART,
  actAddAddress
})(Cart);
