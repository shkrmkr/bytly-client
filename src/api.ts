import axios from 'axios';
import type { Url } from './types';

axios.defaults.baseURL = import.meta.env.SNOWPACK_PUBLIC_API_URL;
axios.defaults.withCredentials = true;

export default {
  createUrl: (originalUrl: string) =>
    axios
      .post<Url>('/url', { originalUrl })
      .then((res) => res.data),
  login: (email: string, password: string) =>
    axios.post('/auth/login', { email, password }).then((res) => res.data),
};
