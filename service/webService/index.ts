import WebService from './webService';

let BASE_URL_DEV = 'http://localhost:3000';

const request = new WebService({
  baseURL: BASE_URL_DEV,
  timeout: 10000
});

export default request;

export { WebService };
