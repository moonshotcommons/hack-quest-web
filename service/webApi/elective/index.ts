import WebService from '@/service/webService/webService';
import {
  EcosystemElectiveType,
  EcosystemProfileType,
  ElectiveLessonType,
  ElectiveListDataType,
  ElectiveCourseDetailType,
  ElectiveCourseType
} from './type';

export enum ElectiveApiType {
  GetTopElectives = '/electives/featured',
  GetElectives = '/electives',
  GetLesson = '/elective-pages',
  EcosystemProfile = '/eco-system-profiles'
}

class ElectiveApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  getTopElectives() {
    return this.service.get<ElectiveCourseType[]>(
      ElectiveApiType.GetTopElectives
    );
  }

  /** 获取electives课程列表 */
  getElectives(params: Record<string, string>) {
    return this.service.get<ElectiveListDataType>(
      ElectiveApiType.GetElectives,
      {
        params
      }
    );
  }

  /** 获取包含（不包含）所有pages的课程详情信息 */
  getElectiveDetailAndPages(id: string, includePages = true) {
    return this.service.get<ElectiveCourseDetailType>(
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

  /** 获取mini Elective profile */
  getElectiveProfile(electiveId: string) {
    const url = `${ElectiveApiType.EcosystemProfile}/${electiveId}`;
    return this.service.get<EcosystemProfileType>(url);
  }

  /** 获取mini Elective profile */
  getProfileElective(electiveId: string) {
    const url = `${ElectiveApiType.EcosystemProfile}/${electiveId}/electives`;
    return this.service.get<EcosystemElectiveType[]>(url);
  }
}

export default ElectiveApi;
