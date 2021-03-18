import type { AxiosError } from 'axios';

interface ErrorData {
  message: string;
}

export type ApiError = AxiosError<ErrorData>;

export interface IUrl {
  id: number;
  hash: string;
  originalUrl: string;
  hits: number;
}

export interface IRoute {
  exact?: boolean;
  path: string;
  component: React.ComponentClass | React.FC;
  name: string;
  isPrivate?: boolean;
}

export interface IResponseWithToken {
  accessToken: string;
}

export interface ILoginFormData {
  email: string;
  password: string;
}
