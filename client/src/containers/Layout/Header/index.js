import React, { useState, useMemo } from 'react';
import { Affix, Menu, Row, Col, Badge, Icon, Modal } from 'antd';
import { Dropdown, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actLogOut } from 'Redux/Session/actions';
import { isInFullScreen } from 'Util/screen';
import Sign from 'Containers/Sign';
import { FormattedMessage } from 'react-intl';
import SelectLanguage from './TogleLanguage';
import Search from './Search';

import messages from './messages';

const Header = ({ cart, user, actLogOut }) => {
  const [signTogle, setSignTogle] = useState(false);
  const [screenTogle, setScreenTogle] = useState(false);
  const cartlength = useMemo(() => cart.length, [cart.length]);

  const ElemModalSign = !user.userId ? (
    <Modal
      footer={null}
      visible={true}
      width={900}
      onCancel={() => setSignTogle(false)}
    >
      <Sign />
    </Modal>
  ) : (
    ''
  );

  const togleScreenClick = () => {
    const screenStt = isInFullScreen();
    setScreenTogle(!screenStt);
  };

  const menu = !user.userId ? (
    <Menu>
      <Menu.Item key="1" onClick={() => setSignTogle(true)}>
        <FormattedMessage {...messages.menu.login} /> <Icon type="login" />
      </Menu.Item>
    </Menu>
  ) : (
    <Menu>
      <Menu.Item key="1">
        <Link to="/order">
          <FormattedMessage {...messages.menu.order} />{' '}
          <Icon type="shopping-cart" />
        </Link>
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          actLogOut();
          setSignTogle(false);
        }}
      >
        <FormattedMessage {...messages.menu.logout} /> <Icon type="logout" />
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="header">
      <div className="navbar">
        <div className="container">
          <Row type="flex">
            <Col
              xs={{ span: 12, order: 2 }}
              sm={{ span: 12, order: 2 }}
              md={{ span: 8, order: 2 }}
            >
              <Search />
            </Col>
            <Col
              xs={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              md={{ span: 8, order: 2 }}
            >
              <div className="logo">
                <Link to="/">
                  <FormattedMessage {...messages.logo} />
                </Link>
              </div>
            </Col>
            <Col
              xs={{ span: 12, order: 2 }}
              sm={{ span: 12, order: 2 }}
              md={{ span: 8, order: 2 }}
            >
              <div className="site-top-icons">
                <ul>
                  <li
                    className="d-none d-md-inline-block mr-1"
                    onClick={togleScreenClick}
                  >
                    {screenTogle ? (
                      <Icon type="fullscreen-exit" />
                    ) : (
                      <Icon type="fullscreen" />
                    )}
                  </li>
                  <li>
                    <SelectLanguage />
                  </li>
                  <li>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <span>
                        <Avatar icon="user" />
                        {!user.userId ? (
                          <FormattedMessage {...messages.menu.guest} />
                        ) : (
                          user.fullname
                        )}
                      </span>
                    </Dropdown>
                  </li>
                  <li>
                    <Badge count={cartlength}>
                      <Link to="/cart">
                        <Icon type="shopping" />
                      </Link>
                    </Badge>
                  </li>
                </ul>
              </div>{' '}
            </Col>
          </Row>
        </div>
      </div>
      <Affix>
        <div className="menu-bar">
          <Menu
            mode="horizontal"
            style={{
              lineHeight: '64px',
              border: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
          >
            <Menu.Item key="1">
              <Link to="/shoes-man">
                <FormattedMessage {...messages.navbar.men} />
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/shoes-woman">
                <FormattedMessage {...messages.navbar.women} />
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/shoes-couple">
                <FormattedMessage {...messages.navbar.couple} />
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      </Affix>
      {signTogle ? ElemModalSign : ''}
    </div>
  );
};

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.session
});

export default connect(mapStateToProps, { actLogOut })(Header);
