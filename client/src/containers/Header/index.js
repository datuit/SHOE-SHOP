import React, { useState, useMemo } from 'react'
import { Affix, Menu, Row, Col, Badge, Icon, Modal } from 'antd'
import { Dropdown, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Sign from '../Sign'
import { actLogOut } from '../../redux/Session'

const Header = ({ cart, user, actLogOut }) => {
  const [signTogle, setSignTogle] = useState(false)
  const cartlength = useMemo(() => cart.length, [cart.length])

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
  )

  const menu = (
    <Menu>
      {!user.userId ? (
        <Menu.Item key="1" onClick={() => setSignTogle(true)}>
          Đăng Nhập <Icon type="login" />
        </Menu.Item>
      ) : (
        <Menu.Item
          key="1"
          onClick={() => {
            actLogOut()
            setSignTogle(false)
          }}
        >
          Đăng Xuất <Icon type="logout" />
        </Menu.Item>
      )}
    </Menu>
  )
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
              <form action="" className="site-top-search">
                <Icon type="search" />
                <input type="text" placeholder="Search" />
              </form>
            </Col>
            <Col
              xs={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              md={{ span: 8, order: 2 }}
            >
              <div className="logo">
                <Link to="/">THÀNH ĐẠT</Link>
              </div>
            </Col>
            <Col
              xs={{ span: 12, order: 2 }}
              sm={{ span: 12, order: 2 }}
              md={{ span: 8, order: 2 }}
            >
              <div className="site-top-icons">
                <ul>
                  <li>
                    <Dropdown overlay={menu} trigger={['click']}>
                      <span style={{ cursor: 'pointer', fontSize: '16px' }}>
                        <Avatar icon="user" />{' '}
                        {!user.userId ? 'Chào khách' : `Chào, ${user.username}`}
                      </span>
                    </Dropdown>
                  </li>
                  <li>
                    <Badge count={cartlength}>
                      <Link to="/cart">
                        <Icon
                          type="shopping-cart"
                          style={{ fontSize: '23px' }}
                        />
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
              <Link to="/shoes-man">Giày Nam</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/shoes-woman">Giày Nữ</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/shoes-couple">Giày Đôi</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Affix>
      {signTogle ? ElemModalSign : ''}
    </div>
  )
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.session
})

export default connect(mapStateToProps, { actLogOut })(Header)
