import WebService from '@/service/webService/webService';
import { LearningTrackDetailType, LearningTrackType } from './type';
import { CourseResponse } from '../course/type';

export enum LearningTrackApiType {
  GetLearningTrack = '/learning-tracks'
}

class LearningTrackApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /** 获取学习路线列表 */
  getLearningTracks() {
    return this.service.get<LearningTrackType[]>(
      LearningTrackApiType.GetLearningTrack
    );
  }

  /** 获取单个学习路线的详情信息 */
  getLearningTrackDetail(learningTrackId: string) {
    const url = `${LearningTrackApiType.GetLearningTrack}/${learningTrackId}`;
    return this.service.get<LearningTrackDetailType>(url);
  }

  /** 获取单个学习路线信息以及所包含的课程列表信息 */
  getLearningTrackDetailAndCourses(learningTrackId: string) {
    const url = `${LearningTrackApiType.GetLearningTrack}/${learningTrackId}?include=courses`;
    return this.service.get<
      LearningTrackDetailType & { courses: CourseResponse[] }
    >(url);
  }

  /** 订阅课程路线 */

  enrollLearningTrack(learningTrackId: string) {
    const url = `${LearningTrackApiType.GetLearningTrack}/${learningTrackId}/enroll`;
    return this.service.get(url);
  }

  /** 取消订阅 */
  unenrollLearningTrack(learningTrackId: string) {
    const url = `${LearningTrackApiType.GetLearningTrack}/${learningTrackId}/unenroll`;
    return this.service.get(url);
  }
}

export default LearningTrackApi;
