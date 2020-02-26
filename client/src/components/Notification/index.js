import { notification } from 'antd';

const index = (type, message, description, duration = 1) => {
  return notification[type]({
    message,
    description,
    duration
  });
};

export default index;
