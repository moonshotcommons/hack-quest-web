import WebService from '@/service/webService/webService';
import { LearningTrackDetailType } from './type';
import { ProjectCourseType } from '../course/type';
import { cache } from 'react';

export enum LearningTrackApiType {
  GetLearningTrack = '/learning-tracks'
}

class LearningTrackApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /** 获取学习路线列表 */
  getLearningTracks(params?: object) {
    return this.service.get<LearningTrackDetailType[]>(LearningTrackApiType.GetLearningTrack, {
      params
    });
  }

  /** 获取单个学习路线的详情信息 */
  getLearningTrackDetail(learningTrackId: string) {
    const url = `${LearningTrackApiType.GetLearningTrack}/${learningTrackId}`;
    return this.service.get<LearningTrackDetailType>(url);
  }

  /** 获取单个学习路线信息以及所包含的课程列表信息 */
  getLearningTrackDetailAndCourses(learningTrackId: string) {
    const url = `${LearningTrackApiType.GetLearningTrack}/${learningTrackId}?include=courses`;
    return this.service.get<LearningTrackDetailType & { courses: ProjectCourseType[] }>(url);
  }

  /** 获取单个课程的详情信息 */
  async fetchLearningTrackDetail(learningTrackId: string): Promise<LearningTrackDetailType> {
    // const url = `${this.service.baseURL.slice(0, -1)}${LearningTrackApiType.GetLearningTrack}/${learningTrackId}?include=courses`;
    // const learnTrackDetail = await fetch(url, {
    //   method: 'get'
    // });

    // if (!learnTrackDetail.ok) {
    //   throw new Error('Failed to fetch learning track data!');
    // }

    // return learnTrackDetail.json();
    const cacheFn = cache(async () => {
      return this.getLearningTrackDetail(learningTrackId);
    });

    return cacheFn();
  }
  /** 获取单个课程的详情信息 */
  async fetchLearningTrackDetailAndCourses(learningTrackId: string): Promise<LearningTrackDetailType> {
    // const url = `${this.service.baseURL.slice(0, -1)}${LearningTrackApiType.GetLearningTrack}/${learningTrackId}?include=courses`;
    // const learnTrackDetail = await fetch(url, {
    //   method: 'get'
    // });

    // if (!learnTrackDetail.ok) {
    //   throw new Error('Failed to fetch learning track data!');
    // }

    // return learnTrackDetail.json();
    const cacheFn = cache(async () => {
      return this.getLearningTrackDetailAndCourses(learningTrackId);
    });

    return cacheFn();
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
