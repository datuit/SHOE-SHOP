import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ShopPage from '../../components/ShopPage'

const Shop = props => {
  const [items, setItems] = useState([])
  const { filterCategory, match } = props
  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    axios({
      method: 'GET',
      url: `http://localhost:5000/api${match.path}?category=${filterCategory}`
    }).then(res => setItems(res.data))
  }, [filterCategory, match.path])
  return <ShopPage filterCategory={filterCategory} items={items} />
}

export default Shop
