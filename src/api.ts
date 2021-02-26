import axios from 'axios';
import type { Url } from './types';

axios.defaults.baseURL = import.meta.env.SNOWPACK_PUBLIC_API_URL;

export default {
  makeUrl: (originalUrl: string) =>
    axios
      .post<Url>('/urls', { originalUrl })
      .then((res) => res.data),

  getDataForLocalStorage: (shortUrlIds: number[]) =>
    axios
      .get<Url[]>('/urls', {
        params: { shortUrlIds: shortUrlIds.join(',') },
      })
      .then((res) => res.data),
};
