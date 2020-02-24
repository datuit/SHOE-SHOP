import React, { useState } from 'react'
import { Row, Col, InputNumber, Select, Button } from 'antd'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Slide from '../../Slide'
import Notification from '../../Notification'
import { actADD_TO_CART } from '../../../redux/Cart'

const { Option } = Select

const ShopSingle = props => {
  const { item, cart, actADD_TO_CART } = props
  const [sizeSelect, setSizeSelect] = useState(item.size[0] || 'Lựa chọn')
  const [colorSelect, setColorSelect] = useState(item.color[0] || 'Lựa chọn')
  const [quantityInput, setQuantityInput] = useState(1)
  let history = useHistory()
  const AddToCart = () => {
    if (cart.length > 0) {
      const checkIndex = cart.map(e => e._id).indexOf(item._id)
      if (checkIndex !== -1) {
        if (cart[checkIndex].quantity + quantityInput > item.quantity) {
          return Notification(
            'warning',
            'Không đủ hàng',
            'Chọn lại số lượng, số lượng trong giỏ phải nhỏ hơn số lượng tồn kho'
          )
        }
      }
    }
    actADD_TO_CART({
      _id: item._id,
      quantity: quantityInput,
      price: item.promotion,
      image: item.images[0],
      name: item.name
    })
    Notification('success', 'Thành công', 'Đã thêm sản phẩm vào giỏ hàng')
  }

  const buyNow = () => {
    AddToCart()
    history.push('/cart')
  }

  function onChangeQuantity(value) {
    if (value > item.quantity) {
      const message = 'Không đủ số lượng hàng'
      const description = `Tối đa ${item.quantity} sản phẩm`
      Notification('warning', message, description)
      return setQuantityInput(item.quantity)
    }
    return setQuantityInput(value)
  }
  return (
    <div className="shop-single">
      <Row>
        <Col xs={24} md={12}>
          <Slide images={item.images} />
        </Col>
        <Col xs={24} md={12} className="mt-3 p-3">
          <h2 className="mt-3">
            Giày Thể Thao Adi.das Superstar Trắng mũi sò F1
          </h2>
          <p>
            libero convallis eget eleifend luctus ultricies eu nibh quisque id
            justo sit amet sapien dignissim vestibulum vestibulum ante ipsum
            primis in faucibus
          </p>
          <Row>
            <Col span={8}>
              <h3>Màu sắc:</h3>
              <Select
                defaultValue={colorSelect}
                style={{ width: 120 }}
                onChange={value => setColorSelect(value)}
              >
                {item.color.map((color, index) => (
                  <Option key={index} value={color}>
                    {color}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={8}>
              <h3>Kích thước:</h3>
              <Select
                defaultValue={sizeSelect}
                style={{ width: 120 }}
                onChange={value => setSizeSelect(value)}
              >
                {item.size.map((size, index) => (
                  <Option key={index} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={8}>
              <h3>Số lượng:</h3>
              <InputNumber
                min={1}
                max={item.quantity}
                defaultValue={quantityInput}
                onChange={value => onChangeQuantity(value)}
              />
            </Col>
            <p style={{ lineHeight: '30px' }}>
              Hiện còn {item.quantity} sản phẩm
            </p>
          </Row>
          <div className="mt-1">
            <Button
              type="normal"
              icon="shopping-cart"
              size="large"
              className="mr-3"
              onClick={AddToCart}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button type="danger" icon="check" size="large" onClick={buyNow}>
              Mua ngay
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = state => ({
  cart: state.cart
})

export default connect(mapStateToProps, { actADD_TO_CART })(ShopSingle)
