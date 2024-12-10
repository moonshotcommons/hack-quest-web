import WebService from '@/service/webService/webService';
import { NotionParseLog } from './type';
import { PageResult } from '../type';
import { getDomain } from '@/constants/links';

export enum CommnApiType {
  UPLOAD_IMAGE = '/upload/single'
}

class CommnApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  uploadImage(file: FormData) {
    return this.service.post<{ filepath: string }>(CommnApiType.UPLOAD_IMAGE, {
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 60000 * 4
    });
  }

  getNotionLogs(params?: { keyword?: string; notionType?: string; status?: string; sort?: string; limit?: number }) {
    return this.service.get<PageResult<NotionParseLog>>('/admin/parse-notion/logs', {
      params: params || {}
    });
  }
  // uploadImage(data: { file: FormData; isPublic: boolean }) {
  //   return this.service.post<{ filepath: string }>(CommnApiType.UPLOAD_IMAGE, {
  //     data,
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   });
  // }

  getUploadSignedUrl(params: { filename: string; filepath: string; isPublic?: boolean }) {
    params.isPublic = params.isPublic ?? true;
    return this.service.get<{
      signedUrl: string;
    }>('/upload/singed-url', {
      params
    });
  }

  getAssetsUrl(assets: string) {
    return this.service.get<string>('/upload/assets-url', {
      params: { assets }
    });
  }

  async getUploadSessionUrl(url: string) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': getDomain(process.env.RUNTIME_ENV || 'local'),
        'Content-Type': 'application/octet-stream',
        'X-Goog-Resumable': 'start'
      } as any,
      body: JSON.stringify({ name: 'string' })
    });
    return response.headers.get('location') as string;
  }

  async sendEmail(data: { content: string; email: string; subject: string; isBatch: boolean }) {
    return this.service.post<{
      code: number;
      msg: string;
    }>('/email', {
      data
    });
  }
}

export default CommnApi;
