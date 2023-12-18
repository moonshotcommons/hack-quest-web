import WebService from '@/service/webService/webService';
import { ElectiveLessonType, MiniElectiveCourseType } from './type';

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
    return this.service.get<MiniElectiveCourseType>(
      `${ElectiveApiType.GetElectives}/${id}${
        includePages ? '?include=pages' : ''
      }`
    );
  }

  /** 获取lesson的内容 */
  getElectiveLessonContent(id: string) {
    return this.service.get<ElectiveLessonType>(
      `${ElectiveApiType.GetLesson}/${id}`
    );
  }

  getElectiveLearningLesson(electiveId: string) {
    return this.service.get(
      `${ElectiveApiType.GetElectives}/${electiveId}/learning-page`
    );
  }

  startLesson(lessonId: string) {
    return this.service.get(`${ElectiveApiType.GetLesson}/${lessonId}/start`);
  }

  /** 完成单个quiz */
  completeQuiz(lessonId: string, quizIndex: number) {
    const url = `${ElectiveApiType.GetLesson}/${lessonId}/quiz`;
    return this.service.post(url, {
      data: { index: quizIndex, isCompleted: true }
    });
  }

  /** 完成lesson */
  completedLesson(lessonId: string) {
    const url = `${ElectiveApiType.GetLesson}/${lessonId}/complete`;
    return this.service.get(url);
  }
}

export default ElectiveApi;
