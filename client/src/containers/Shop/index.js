import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShopPage from '../../components/ShopPage';

const Shop = props => {
  const [items, setItems] = useState([]);
  const [noItems, setNoItems] = useState(false);
  const { category, match } = props;
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    axios({
      method: 'POST',
      url: 'api/item',
      data: { category }
    }).then(res => setItems(res.data));
  }, [category, match.path]);
  //sortStatus: true is down to up , false is up to down
  const sortItems = status => {
    var itemSort = items.slice();
    itemSort = status
      ? itemSort.sort((a, b) => {
          return a.promotion - b.promotion;
        })
      : itemSort.sort((a, b) => {
          return b.promotion - a.promotion;
        });
    setItems(itemSort);
  };
  const filterItems = price => {
    console.log(price);
    if (price) {
      var itemFilter = items.slice();
      itemFilter = itemFilter.filter(
        item => item.promotion >= price[0] && price[1] >= item.promotion
      );
      console.log(itemFilter, items);
      if (itemFilter.length > 0) {
        setNoItems(false);
        setItems(itemFilter);
      } else {
        setNoItems(true);
      }
    }
  };
  return (
    <ShopPage
      category={category}
      items={items}
      filterItems={filterItems}
      sortItems={sortItems}
      noItems={noItems}
    />
  );
};

export default Shop;
