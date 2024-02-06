import { getToken } from '@/helper/user-token';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig
} from 'axios';
import { RequestConfig, RequestInterceptors } from './webServiceTypes';

class WebService {
  instance: AxiosInstance;
  interceptors?: RequestInterceptors;
  public readonly baseURL: string;
  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config);
    this.baseURL = config.baseURL!;
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
      this.instance.interceptors.request.use(
        this.requestInterceptor,
        this.requestInterceptorCatch
      );
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
    return Promise.reject(err);
  }

  responseInterceptor<T>(res: AxiosResponse<T, T>): Promise<T> {
    // console.log('全局响应拦截器')
    if (res.status === 200) {
      return Promise.resolve(res.data);
    }
    return Promise.resolve(res.data);
  }

  responseInterceptorCatch(err: AxiosError) {
    if (err.response?.data) {
      return Promise.reject(err.response.data);
    } else {
      return Promise.reject(err);
    }
  }

  get<T>(url: string, config?: Omit<RequestConfig<T>, 'url'>): Promise<T> {
    // console.log('config.baseURL', config.baseURL)
    return this.request<T>({ url, ...config, method: 'GET' });
  }

  post<T>(url: string, config?: Omit<RequestConfig<T>, 'url'>): Promise<T> {
    return this.request({ url, ...config, method: 'POST' });
  }

  put<T>(url: string, config?: Omit<RequestConfig<T>, 'url'>): Promise<T> {
    return this.request({ url, ...config, method: 'PUT' });
  }

  delete<T>(url: string, config?: Omit<RequestConfig<T>, 'url'>): Promise<T> {
    return this.request({ url, ...config, method: 'DELETE' });
  }

  patch<T>(url: string, config?: Omit<RequestConfig<T>, 'url'>): Promise<T> {
    return this.request({ url, ...config, method: 'PATCH' });
  }
}

export default WebService;
