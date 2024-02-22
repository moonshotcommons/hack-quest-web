import { message } from 'antd';

export const errorMessage = (err: any) => {
  const msg = err.msg || err.message;
  msg && message.error(msg);
};
