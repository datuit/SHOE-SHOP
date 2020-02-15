import React from 'react'
import { Menu, Dropdown, Button, Icon } from 'antd'

const SortProduct = () => {
  const handleMenuClick = e => {
    console.log('click', e)
  }
  return (
    <Dropdown
      overlay={
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="-1">Không</Menu.Item>
          <Menu.Item key="0">Giá thấp đến cao</Menu.Item>
          <Menu.Item key="1">Giá cao đến thấp</Menu.Item>
        </Menu>
      }
    >
      <Button className="font-weight-bold">
        SẮP XẾP <Icon type="down" />
      </Button>
    </Dropdown>
  )
}

export default SortProduct
