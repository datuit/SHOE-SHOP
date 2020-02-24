import React, {
  Component,
  useReducer,
  useEffect,
  useState,
  useRef
} from 'react';
import { Icon, Row, Col, Spin, Dropdown, Menu, Button } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import AOS from 'aos';
import FilterProduct from './FilterProduct';
import Product from '../Product';

const perPage = 8;

const ShopPage = props => {
  const { category, sortItems, filterItems, noItems, items } = props;
  const [itemShow, setItemShow] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const page = useRef(1);
  useEffect(() => {
    if (items.length > 0) {
      setItemShow(items.slice(0, perPage));
    }
  }, [items]);

  //Load more itemShow
  const fetchMoreData = () => {
    if (itemShow.length >= items.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      page.current++;
      setItemShow(
        itemShow.concat(
          items.slice(
            (page.current - 1) * perPage,
            (page.current - 1) * perPage + perPage
          )
        )
      );
    }, 1000);
  };
  AOS.init();
  return (
    <div className="shop">
      <div className="container">
        <Row>
          <Col xs={24} md={5} className="mb-3">
            <div data-aos="fade-up">
              <FilterProduct filterItems={filterItems} />
            </div>
          </Col>
          <Col xs={24} md={19} className="pr-md-4 pl-md-4 mb-5">
            <Row>
              <Col className="text-uppercase font-weight-bold " span={12}>
                <div data-aos="zoom-in">{category}</div>
              </Col>
              <Col span={12} className="text-right">
                <div data-aos="zoom-in">
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key="0" onClick={() => sortItems(true)}>
                          Giá thấp đến cao
                        </Menu.Item>
                        <Menu.Item key="1" onClick={() => sortItems(false)}>
                          Giá cao đến thấp
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <Button className="font-weight-bold">
                      SẮP XẾP <Icon type="down" />
                    </Button>
                  </Dropdown>
                </div>
              </Col>
            </Row>
            <div className="product-list mt-3">
              {itemShow.length > 0 && !noItems ? (
                <InfiniteScroll
                  dataLength={itemShow.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={
                    <div
                      style={{
                        textAlign: 'center',
                        color: 'blue',
                        fontSize: '30px',
                        fontWeight: 'bold'
                      }}
                    >
                      <Spin
                        indicator={
                          <Icon type="loading" style={{ fontSize: 40 }} spin />
                        }
                      />
                    </div>
                  }
                >
                  <Product items={itemShow} />
                </InfiniteScroll>
              ) : (
                ''
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ShopPage;
