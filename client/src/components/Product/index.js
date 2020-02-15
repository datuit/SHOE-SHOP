import React from 'react'
import ItemProduct from '../ItemProduct'
import { List } from 'antd'

const index = ({ items }) => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 2,
        lg: 4
      }}
      dataSource={items}
      renderItem={item => (
        <List.Item className="item">
          <ItemProduct item={item} />
        </List.Item>
      )}
    />
  )
}
export default index
