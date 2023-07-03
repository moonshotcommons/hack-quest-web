import { getToken } from '@/helper/user-token';
import { RequestInterceptors, RequestConfig } from './webServiceTypes';
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  CreateAxiosDefaults
} from 'axios';

class WebService {
  instance: AxiosInstance;
  interceptors?: RequestInterceptors;
  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config);
    // this.interceptors = config.interceptors
    this.addInterceptors();
  }

  request<T = any>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  addInterceptors() {
    if (!this.interceptors) {
      this.instance.interceptors.response.use(
        this.responseInterceptor,
        this.responseInterceptorCatch
      );
    }
  }

  requestInterceptor(
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }

  requestInterceptorCatch(err: AxiosError): Promise<AxiosError> {
    // console.log('全局请求失败拦截器')

    return Promise.reject(err);
  }

  responseInterceptor<T>(res: AxiosResponse<T, T>): Promise<T> {
    // console.log('全局响应拦截器')
    if (res.data) {
      // 处理响应
    }

    return Promise.resolve(res.data);
  }

  responseInterceptorCatch(err: AxiosError) {
    // console.log('全局响应失败拦截器')
    return err.response?.data;
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    // console.log('config.baseURL', config.baseURL)
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }

  put<T>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PUT' });
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }

  patch<T>(config: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default WebService;
