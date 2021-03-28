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

export interface IAuthFormData {
  email: string;
  password: string;
}

export interface INotification {
  id: string;
  type: 'SUCCESS' | 'DANGER' | 'INFO' | 'WARNING';
  title: string;
  message?: string;
}
