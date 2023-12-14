import WebService from '@/service/webService/webService';

export enum ElectiveApiType {
  GetElectives = '/electives',
  GetLesson = '/elective-pages'
}

class ElectiveApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /** 获取electives课程列表 */
  getElectives(params: { sort?: string; keyword?: string }) {
    return this.service.get(ElectiveApiType.GetElectives, {
      params
    });
  }

  /** 获取包含（不包含）所有pages的课程详情信息 */
  getElectiveDetailAndPages(id: string, includePages = true) {
    return this.service.get(
      `${ElectiveApiType.GetElectives}/${id}${
        includePages ? '?include=pages' : ''
      }`
    );
  }

  /** 获取lesson的内容 */
  getElectiveLessonContent(id: string) {
    return this.service.get(`${ElectiveApiType.GetLesson}/${id}`);
  }

  getElectiveLearningLesson(electiveId: string) {
    return this.service.get(
      `${ElectiveApiType.GetElectives}/${electiveId}/learning-page`
    );
  }

  startLesson(lessonId: string) {
    this.service.get(`/${ElectiveApiType.GetLesson}/${lessonId}/start`);
  }

  /** 完成单个quiz */
  completeQuiz(lessonId: string, quizIndex: number) {
    const url = `${ElectiveApiType.GetLesson}/${lessonId}/quiz`;
    return this.service.post(url, {
      data: { index: quizIndex, isCompleted: true }
    });
  }
}

export default ElectiveApi;
