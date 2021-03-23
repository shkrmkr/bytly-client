import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import type { IResponseWithToken, IUrl } from './types';

axios.defaults.baseURL = import.meta.env.SNOWPACK_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

// axios.interceptors.request.use(function (config) {
//   config.headers.common['Authorization'] = `Bearer ${getAccessToken()}`;
//   return config;
// });

const onLoginSuccess = (res: AxiosResponse<IResponseWithToken>) => {
  const { accessToken } = res.data;

  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${res.data.accessToken}`;

  const { exp }: { exp: number } = jwtDecode(accessToken);

  // accessToken 만료 1분 전에 refresh
  // decode된 exp(만료시각)은 초단위이기 때문에 1000을 곱해서 밀리세컨드로 만듦
  setTimeout(api.refreshToken, exp * 1000 - new Date().getTime() - 60 * 1000);
};

export const api = {
  createUrl: (originalUrl: string) =>
    axios
      .post<IUrl>('/url', { originalUrl })
      .then((res) => res.data),
  register: ({ email, password }: { email: string; password: string }) =>
    axios.post('/auth/register', { email, password }).then((res) => res.data),
  login: ({ email, password }: { email: string; password: string }) =>
    axios
      .post<IResponseWithToken>('/auth/login', { email, password })
      .then(onLoginSuccess),
  refreshToken: () =>
    axios.post<IResponseWithToken>('/auth/refresh-token').then(onLoginSuccess),
  check: () => axios.get<string>('/auth/check-access').then((res) => res.data),
  logout: () =>
    axios.get('/auth/logout').then(() => {
      axios.defaults.headers.common['Authorization'] = '';
    }),
};
