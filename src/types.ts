import type { AxiosError } from 'axios';

type ErrorData = {
  message: string;
};

export type ApiError = AxiosError<ErrorData>;

export type Url = {
  id: number;
  hash: string;
  original_url: string;
  hits: number;
};

export type TRoute = {
  exact?: boolean;
  path: string;
  component: React.ComponentClass | React.FC;
  name: string;
};
