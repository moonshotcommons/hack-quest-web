import WebService from '@/service/webService/webService';

export enum PreviewApiType {
  PreviewLesson = '/admin/preview/lesson',
  PreviewCourse = '/preview/course'
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

  createPreviewCourse(notionPageUrl: string) {
    return this.service.post(PreviewApiType.PreviewCourse, {
      data: {
        notionPageUrl: notionPageUrl
      }
    });
  }
}

export default PreviewApi;
