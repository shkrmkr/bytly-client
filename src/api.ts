import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import type { MutationFunction } from 'react-query';
import type { IAuthFormData, IResponseWithToken, IUrl } from './types';

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

  const { exp } = jwtDecode<{ exp: number }>(accessToken);

  // accessToken 만료 1분 전에 refresh
  // decode된 exp(만료시각)은 초단위이기 때문에 1000을 곱해서 밀리세컨드로 만듦
  setTimeout(refreshToken, exp * 1000 - new Date().getTime() - 60 * 1000);
};

export const login: MutationFunction<void, IAuthFormData> = ({
  email,
  password,
}) => axios.post('/auth/login', { email, password }).then(onLoginSuccess);

export const createUrl: MutationFunction<IUrl, string> = (originalUrl) =>
  axios
    .post<IUrl>('/url', { originalUrl })
    .then((res) => res.data);

export const register: MutationFunction<void, IAuthFormData> = ({
  email,
  password,
}) => axios.post('/auth/register', { email, password });

export const refreshToken: MutationFunction<void, void> = () =>
  axios.post('/auth/refresh-token').then(onLoginSuccess);

export const logout: MutationFunction<void, void> = () =>
  axios.get('/auth/logout').then(() => {
    axios.defaults.headers.common['Authorization'] = '';
  });

export const check: MutationFunction<string, void> = () =>
  axios.get<string>('/auth/check-access').then((res) => res.data);
