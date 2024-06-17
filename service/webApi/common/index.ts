import WebService from '@/service/webService/webService';

export enum CommnApiType {
  UPLOAD_IMAGE = '/upload/single'
}

class CommnApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  uploadImage(file: FormData) {
    return this.service.post<{ content: string }>(CommnApiType.UPLOAD_IMAGE, {
      data: file,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export default CommnApi;
