import { AxiosResponse } from 'axios';
import { AxiosRequestConfig } from 'axios';

export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor: (
    config: AxiosRequestConfig<any>
  ) => AxiosRequestConfig<any>;
  requestInterceptorCatch: (error: any) => any;
  responseInterceptor: (res: AxiosResponse<any, any>) => T;
  responseInterceptorCatch: (error: any) => any;
}
export interface RequestConfig<T> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<AxiosResponse<T, T>>;
}
