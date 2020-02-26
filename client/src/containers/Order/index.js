import React from 'react';
import { Tabs, Icon } from 'antd';

const { TabPane } = Tabs;

const Order = props => {
  return (
    <div
      className="container text-uppercase font-weight-bold"
      style={{ minHeight: '200px' }}
    >
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span>
              <Icon type="loading" />
              Đơn hàng đang xử lí
            </span>
          }
          key="1"
        >
          CHƯA LÀM ĐƠN GIẢN VÌ PHẢI ĂN
        </TabPane>
        <TabPane
          tab={
            <span>
              <Icon type="check-circle" />
              Đơn hàng đã mua
            </span>
          }
          key="2"
        >
          ĐÃ BIẾT CHƯA LÀM CÒN BẤM QUA ĐÂY
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Order;
