import axios from 'axios';

import { DelayTime } from '../utils';

export const wrapperV3 = (uri: string) => `/api/v3/${uri}`;

const http = axios.create({
  baseURL: 'https://api.binance.com',
});

http.interceptors.response.use(async res => {
  await DelayTime();
  if (res.status !== 200) {
    throw new Error(`错误状态码: ${res.status}`);
  }
  return res.data;
});

export default http;
