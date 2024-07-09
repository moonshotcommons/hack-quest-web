import WebService from '@/service/webService/webService';
import { NotionParseLog } from './type';
import { PageResult } from '../type';

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
      }
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
}

export default CommnApi;
