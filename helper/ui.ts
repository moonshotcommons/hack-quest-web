import message from 'antd/es/message';

export const errorMessage = (err: any) => {
  const msg = err.msg || err.message || `Unknown error${err.code ? `, code: ${err.code} ` : ''}`;
  msg && message.error(msg);
};
