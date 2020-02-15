import { notification } from 'antd';

const index = (type, message, description) => {
  return notification[type]({
    message: message,
    description: description
  });
};

export default index;
