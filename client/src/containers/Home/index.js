import React from 'react'
import { Row, Col, Spin } from 'antd'
import AOS from 'aos'
import * as ImageSrc from '../../constants/imageSrc'

const Home = () => {
  AOS.init()
  return (
    <div className="home">
      <div
        data-aos="fade"
        className="background-banner"
        style={{
          backgroundImage: `url(${ImageSrc.banner})`,
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="container">
        <div className="element-info-service">
          <Row>
            <Col xs={24} sm={6}>
              <div data-aos="fade-up">
                {' '}
                <img src={ImageSrc.truck} alt="truck" />
                <p className="title">GIAO HÀNG TOÀN QUỐC</p>
                <p className="description">Vận chuyển khắp Việt Nam</p>
              </div>
            </Col>
            <Col xs={24} sm={6}>
              <div data-aos="fade-up">
                {' '}
                <img src={ImageSrc.payment} alt="payment" />
                <p className="title">GIAO HÀNG TOÀN QUỐC</p>
                <p className="description">Vận chuyển khắp Việt Nam</p>
              </div>
            </Col>
            <Col xs={24} sm={6}>
              <div data-aos="fade-up">
                {' '}
                <img src={ImageSrc.repair} alt="repair" />
                <p className="title">GIAO HÀNG TOÀN QUỐC</p>
                <p className="description">Vận chuyển khắp Việt Nam</p>
              </div>
            </Col>
            <Col xs={24} sm={6}>
              <div data-aos="fade-up">
                <img src={ImageSrc.refresh} alt="repair" />
                <p className="title">GIAO HÀNG TOÀN QUỐC</p>
                <p className="description">Vận chuyển khắp Việt Nam</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="item-hot-home">
          <h3 style={{ textAlign: 'center', fontSize: '3em' }}>
            TẾT <span style={{ fontWeight: 'bold' }}>SALE HẾT</span>
          </h3>
          <Row className="item-hot-home-list">
            <div
              className="example"
              style={{
                background: 'rgba(0, 0, 0, 0.05)',
                minHeight: '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Spin size="large" />
              <p>THUỐC LÀO IN MY HAND, THUỐC DÀNH CHO NGƯỜI HEN!!!! :3</p>
              <p>TÂM TRẠNG KHI CODE CÁI NÀY RẤT LÀ CHÁN</p>
              <p>BUG</p>
            </div>

            {/* <Col xs={{ span: 12 }} lg={{ span: 6 }} className="item">
              <ItemProduct />
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 6 }} className="item">
              <ItemProduct />
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 6 }} className="item">
              <ItemProduct />
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 6 }} className="item">
              <ItemProduct />
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 6 }} className="item">
              <ItemProduct />
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 6 }} className="item">
              <ItemProduct />
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 6 }} className="item">
              <ItemProduct />
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 6 }} className="item">
              <ItemProduct />
            </Col> */}
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Home
