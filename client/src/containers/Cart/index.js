import React from 'react'
import {
  Table,
  Avatar,
  Empty,
  Button,
  Row,
  Col,
  Popconfirm,
  message
} from 'antd'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AOS from 'aos'
import { actDEL_CART, actBUY_CART } from '../../redux/Cart'

const columns = onDel => {
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
          onClick={() => onDel(record)}
        />
      )
    }
  ]
}

const Cart = props => {
  AOS.init()
  const { cart, actDEL_CART, actBUY_CART, userId } = props
  let history = useHistory()
  const onDel = item => {
    actDEL_CART(item)
  }

  const showCart = () => {
    var a = cart.slice()
    a = a.map((e, i) => {
      e.key = i
      return e
    })
    return a
  }

  const Total = () => {
    let total = 0
    cart.forEach(item => (total += item.price * item.quantity))
    return total
  }

  const confirm = async () => {
    if (cart.length > 0) {
      if (!userId) {
        return message.warning(
          'Vui lòng đăng nhập trước khi thực hiện thanh toán!'
        )
      } else {
        var status
        await actBUY_CART(userId, cart).then(e => (status = e))
        if (status) {
          history.push('/cart/succes-buy')
        }
      }
    }
  }

  return (
    <div data-aos="flip-left">
      <div className="container mt-5 mb-5">
        {cart.length > 0 ? (
          <>
            <Table
              bordered
              columns={columns(onDel)}
              dataSource={showCart()}
              pagination={false}
            />
            <Row className="mt-4">
              <Col xs={24} sm={{ span: 8, offset: 16 }}>
                <Row>
                  <h4
                    className="text-uppercase text-right"
                    style={{
                      fontSize: '25px',
                      borderBottom: '1px #e8e8e8 solid'
                    }}
                  >
                    Tổng số giỏ hàng
                  </h4>
                  <Col span={24}>
                    <Col
                      span={12}
                      style={{
                        fontSize: '20px',
                        fontWeight: 'bold'
                      }}
                    >
                      Tổng Cộng
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
                        <Button type="primary">Thanh toán</Button>
                      </Popconfirm>
                    </Col>
                  </Col>
                </Row>
              </Col>
            </Row>
          </>
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            imageStyle={{
              height: 60
            }}
            description={<span>Giỏ hàng trống</span>}
          ></Empty>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  cart: state.cart,
  userId: state.session.userId
})

export default connect(mapStateToProps, { actDEL_CART, actBUY_CART })(Cart)
