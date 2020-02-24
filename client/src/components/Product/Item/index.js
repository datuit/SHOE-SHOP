import React, { useState, useEffect } from 'react'
import ShopSingle from '../ItemModal'
import { Modal, Icon } from 'antd'

const ItemProduct = ({ item }) => {
  const [singleShopTogle, setSingleShopTogle] = useState(false)
  const [mainImage, setMainImage] = useState(null)
  useEffect(() => {
    setMainImage(item.images[0])
  }, [item.images])
  const actionTogleShop = () => {
    setSingleShopTogle(true)
  }
  return (
    <div className="card">
      <div
        className="card-main-image"
        onClick={actionTogleShop}
        style={{ cursor: 'pointer' }}
      >
        <img src={mainImage} style={{ width: '100%' }} alt="#" />
        <span className="promotion">
          {item.promotion !== 0
            ? `- ${100 - Math.round((item.promotion / item.price) * 100)}%`
            : ''}
        </span>
        <div className="action-open-item">
          <Icon type="eye" />
        </div>
      </div>
      <div className="shopswatchinput">
        {item.images.map((image, index) => (
          <span key={index} onClick={() => setMainImage(image)}>
            <img src={image} style={{ width: '15%' }} alt="#" />
          </span>
        ))}
      </div>
      <h3
        className="card-title"
        onClick={actionTogleShop}
        style={{ cursor: 'pointer' }}
      >
        {item.name}
      </h3>
      <span className="price">
        <del className="mr-2">{item.price.toLocaleString()} ₫</del>
        <span className="price-amount">
          {item.promotion.toLocaleString()} ₫
        </span>
      </span>
      <Modal
        footer={null}
        visible={singleShopTogle}
        width={900}
        onCancel={() => setSingleShopTogle(false)}
      >
        <ShopSingle item={item} />
      </Modal>
    </div>
  )
}

export default ItemProduct
