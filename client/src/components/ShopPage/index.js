import React, { Component } from 'react'
import { Icon, Row, Col, Spin } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import AOS from 'aos'
import FilterProduct from '../FilterProduct'
import SortProduct from '../SortProduct'
import Product from '../Product'

const perPage = 8

export default class ShopPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemshow: [],
      hasMore: true,
      page: 1,
      itemShowPage: (page, items, itemshow) => {
        const start = (page - 1) * perPage
        const end = (page - 1) * perPage + perPage
        return itemshow.concat(items.slice(start, end))
      },
      noItems: false
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.items.length > 0 && !prevState.noItems) {
      return {
        ...prevState,
        itemshow: prevState.itemShowPage(
          prevState.page,
          nextProps.items,
          prevState.itemshow
        )
      }
    } else return null
  }

  filterProduct = price => {
    const { items } = this.props
    if (price) {
      var itemFilter = items.filter(
        item => item.promotion >= price[0] && price[1] >= item.promotion
      )
      if (itemFilter.length === 0) {
        this.setState({
          itemshow: [],
          noItems: true
        })
      } else {
        this.setState({
          itemshow: itemFilter,
          noItems: false
        })
      }
    }
  }

  fetchMoreData = () => {
    const { items } = this.props
    const { itemshow } = this.state
    if (itemshow.length >= items.length) {
      this.setState(() => ({
        hasMore: false
      }))
      return
    }
    setTimeout(() => {
      this.setState(() => ({
        page: this.state.page + 1
      }))
    }, 1000)
  }

  render() {
    AOS.init()
    const { hasMore, itemshow, noItems } = this.state
    const { filterCategory } = this.props
    return (
      <div className="shop">
        <div className="container">
          <Row>
            <Col xs={24} md={5} className="mb-3">
              <div data-aos="fade-up">
                <FilterProduct filterProduct={this.filterProduct} />
              </div>
            </Col>
            <Col xs={24} md={19} className="pr-md-4 pl-md-4 mb-5">
              <Row>
                <Col className="text-uppercase font-weight-bold " span={12}>
                  <div data-aos="zoom-in">{filterCategory}</div>
                </Col>
                <Col span={12} className="text-right">
                  <div data-aos="zoom-in">
                    <SortProduct />
                  </div>
                </Col>
              </Row>
              <div className="product-list mt-3">
                <InfiniteScroll
                  dataLength={itemshow.length}
                  next={this.fetchMoreData}
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
                  endMessage={
                    <div
                      style={{
                        textAlign: 'center'
                      }}
                    >
                      <Icon
                        type="close"
                        style={{ fontSize: 40, color: 'blue' }}
                      />{' '}
                      Hết
                    </div>
                  }
                >
                  {itemshow.length > 0 && !noItems ? (
                    <Product items={itemshow} />
                  ) : (
                    ''
                  )}
                </InfiniteScroll>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
