import type { AxiosError } from 'axios';

interface ErrorData {
  message: string;
}

export type ApiError = AxiosError<ErrorData>;

export interface Url {
  id: number;
  hash: string;
  original_url: string;
  hits: number;
}

export interface TRoute {
  exact?: boolean;
  path: string;
  component: React.ComponentClass | React.FC;
  name: string;
}
