import React from 'react';
import { Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const index = () => {
  return (
    <div className="footer">
      <div className="container">
        <Row className="footer-main">
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <p>
              <img
                src="https://iweb.tatthanh.com.vn/pic/3/blog/logo-ban-tay.jpg"
                style={{ width: '80%', height: '100px' }}
                alt="#s"
              />
            </p>
            <p>
              <FormattedMessage {...messages.title} />
            </p>
            <p>
              <span>Hotline</span> <a href="tel:0376640000">037.664.0000</a>
            </p>
            <p>
              <span>Store 1</span> Quan Hoa, Cầu Giấy, HN
            </p>
            <p>
              <span>Store 2</span> Trần Đại Nghĩa, Hai Bà Trưng, HN
            </p>
            <p>
              <span>Store 3</span> Nguyễn Lương Bằng, Đống Đa, HN
            </p>
            <p>
              <span>Store 3</span> Nguyễn Lương Bằng, Đống Đa, HN
            </p>
            <p>
              <span>Store 3</span> Nguyễn Lương Bằng, Đống Đa, HN
            </p>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <p>
              <FormattedMessage {...messages.follow} />
            </p>
            <div
              className="fb-page"
              data-href="https://www.facebook.com/Shoe-Shop-108657557399318/"
              data-tabs="timeline"
              data-width="500"
              data-height="360"
              data-small-header="false"
              data-adapt-container-width="true"
              data-hide-cover="false"
              data-show-facepile="true"
            >
              <blockquote
                cite="https://www.facebook.com/Shoe-Shop-108657557399318/"
                className="fb-xfbml-parse-ignore"
              >
                <a href="https://www.facebook.com/Shoe-Shop-108657557399318/">
                  Facebook
                </a>
              </blockquote>
            </div>
          </Col>
        </Row>
        <div className="copyright">
          Developed By:{' '}
          <a href="https://www.facebook.com/L.ThanhDat1170">THÀNH ĐẠT</a>. MERN
          Stack integrated
        </div>
      </div>
    </div>
  );
};

export default index;
