import React from 'react'
import Item from './Item'
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
          <Item item={item} />
        </List.Item>
      )}
    />
  )
}
export default index
