import WebService from '@/service/webService/webService';
import {
  CourseDataType,
  CourseDetailType,
  CourseLessonStateType,
  CourseLessonType,
  CourseUnitStateType,
  CourseUnitType,
  GetSignatureParams,
  SignatureData,
  SuggestCommitParams,
  UnitPagesListType
} from './type';

export enum CourseApiType {
  Course_List = '/courses',
  LessonDetail = '/pages',
  Support = '/support/suggest',
  GetSignature = '/ethers/signature'
}

class CourseApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /** 获取课程列表信息 */
  getCourseList(searchString?: string) {
    let url: string = CourseApiType.Course_List;
    if (searchString) url = `${url}?${searchString}`;
    return this.service.get<CourseDataType>(url);
  }

  /** 获取课程列表信息By search */
  getCourseListBySearch(params: object) {
    return this.service.get<CourseDataType>(`${CourseApiType.Course_List}`, {
      params
    });
  }

  /** 获取单个课程的详情信息 */
  getCourseDetail(courseId: string, isIncludeUnits: boolean = false) {
    return this.service.get<CourseDetailType>(
      `${CourseApiType.Course_List}/${courseId}${
        isIncludeUnits ? '?include=units' : ''
      }`
    );
  }

  /** 获取单个课程下的所有units */
  getCourseUnits(courseId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/units`;
    return this.service.get<CourseUnitType[]>(url);
  }

  /** 获取所有unit及其下面的pages，主要用来获取Teaser的课程数据 */
  getCourseUnitsAndPages(courseId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/units?include=pages`;
    return this.service.get<UnitPagesListType[]>(url);
  }

  /** 获取单个unit及其下面的pages */
  getCourseUnit(courseId: string, unitId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/units/${unitId}`;
    return this.service.get<CourseUnitStateType>(url);
  }

  /** 获取每个unit下的所有lesson */
  getCourseUnitLessons(courseId: string, unitId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/units/${unitId}?include=pages`;
    return this.service.get<
      CourseUnitStateType & { pages: CourseLessonStateType[] }
    >(url);
  }

  /** 获取单个lesson的内容 */
  getLessonContent(lessonId: string) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}`;
    return this.service.get<CourseLessonType>(url);
  }

  /** 获取单个lesson的内容 */
  getLearningLessonId(courseId: string) {
    const url = `${CourseApiType.Course_List}/${courseId}/learning-page`;
    return this.service.get<{ pageId: string; pageName: string }>(url);
  }

  /** 开始一个lesson */
  startLesson(lessonId: string) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}/start`;
    return this.service.get(url);
  }

  /** 完成一个lesson */
  completeLesson(lessonId: string) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}/complete`;
    return this.service.get(url);
  }

  markQuestState(lessonId: string, isWin: boolean) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}/quest`;
    return this.service.post(url, {
      data: { isWin }
    });
  }

  /** 完成单个quiz */
  completeQuiz(lessonId: string, quizIndex: number) {
    const url = `${CourseApiType.LessonDetail}/${lessonId}/quiz`;
    return this.service.post(url, {
      data: { index: quizIndex, isCompleted: true }
    });
  }

  /** 提交bug和建议 */
  commitSuggest(data: FormData) {
    return this.service.post(CourseApiType.Support, {
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  /** 获取certification 密钥 */
  getSignature(params: GetSignatureParams) {
    return this.service.post<SignatureData>(CourseApiType.GetSignature, {
      data: params
    });
  }
}

export default CourseApi;
