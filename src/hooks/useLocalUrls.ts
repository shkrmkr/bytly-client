import { useQuery } from 'react-query';
import api from '../api';
import type { ApiError, Url } from '../types';

export function useLocalUrls(shortUrlIds: number[]) {
  return useQuery<Url[], ApiError>(
    ['local_urls', shortUrlIds],
    ({ pageParam }) => api.getDataForLocalStorage(pageParam.shortUrlIds),
    {
      enabled: shortUrlIds.length > 0,
    },
  );
}
