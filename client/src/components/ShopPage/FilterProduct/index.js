import React, { useState } from 'react';
import { Slider, Switch, Icon, Button } from 'antd';
import { max, min } from '../../../constants/base';

const FilterProduct = ({ filterItems }) => {
  const [priceFilter, setPriceFilter] = useState([200000, 350000]);
  const [priceFilterStt, setPriceFilterStt] = useState(false);
  function onChangePrice(value) {
    setPriceFilter(value);
  }
  function onFilter() {
    if (priceFilterStt === true) {
      filterItems(priceFilter);
    } else if (priceFilterStt === false) {
      filterItems([min, max]);
      setPriceFilterStt(false);
    }
  }
  return (
    <div className="filter-product">
      <h5>LỌC THEO GIÁ</h5>
      <Switch
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="close" />}
        defaultChecked={false}
        checked={priceFilterStt}
        onClick={() => {
          setPriceFilterStt(!priceFilterStt);
        }}
      />
      <Slider
        range
        min={min}
        max={max}
        step={50000}
        defaultValue={priceFilter}
        onChange={onChangePrice}
        disabled={!priceFilterStt}
      />
      <h5>
        {priceFilterStt
          ? `${priceFilter[0].toLocaleString()} VNĐ - ${priceFilter[1].toLocaleString()} VNĐ`
          : 'Không lọc theo giá'}
      </h5>
      <Button
        type="primary"
        size="small"
        icon="search"
        className="mt-2"
        onClick={onFilter}
      >
        Lọc
      </Button>
    </div>
  );
};

export default FilterProduct;
