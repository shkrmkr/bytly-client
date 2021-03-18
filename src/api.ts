import axios from 'axios';
import { getAccessToken } from './accessToken';
import type { IResponseWithToken, IUrl } from './types';

axios.defaults.baseURL = import.meta.env.SNOWPACK_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  config.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
  return config;
});

export default {
  createUrl: (originalUrl: string) =>
    axios
      .post<IUrl>('/url', { originalUrl })
      .then((res) => res.data),
  register: ({ email, password }: { email: string; password: string }) =>
    axios.post('/auth/register', { email, password }).then((res) => res.data),
  login: ({ email, password }: { email: string; password: string }) =>
    axios
      .post<IResponseWithToken>('/auth/login', { email, password })
      .then((res) => res.data),
  refreshToken: () =>
    axios
      .post<IResponseWithToken>('/auth/refresh-token')
      .then((res) => res.data),
  check: () => axios.get<string>('/auth/check-access').then((res) => res.data),
  logout: () => axios.get('/auth/logout').then((res) => res.data),
};
