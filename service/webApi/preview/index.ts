import WebService from '@/service/webService/webService';

export enum PreviewApiType {
  PreviewLesson = '/preview/lesson'
}

class PreviewApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  getPreviewLesson(notionPageUrl: string) {
    return this.service.post(PreviewApiType.PreviewLesson, {
      data: {
        notionPageUrl: notionPageUrl
      }
    });
  }
}

export default PreviewApi;
