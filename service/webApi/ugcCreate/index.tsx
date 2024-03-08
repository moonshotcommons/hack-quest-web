import WebService from '@/service/webService/webService';
import { CourseInformationType } from '@/store/zustand/ugcCreationStore';
import { UGCCourseType } from '../course/type';
export enum UgcCreateApiType {
  COURSE_CREATE = '/courses'
}

class UgcCreateApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }
  /**获取ugc information 详情 */
  getUgcInformationDetail(courseId: string) {
    return this.service.get<UGCCourseType>(
      `${UgcCreateApiType.COURSE_CREATE}/${courseId}`
    );
  }
  /** 创建introduction */
  introductionAdd(data: object) {
    return this.service.post<CourseInformationType>(
      UgcCreateApiType.COURSE_CREATE,
      {
        data
      }
    );
  }
  /** 修改infoamation */
  informationEdit(courseId: string, data: object) {
    return this.service.patch(`${UgcCreateApiType.COURSE_CREATE}/${courseId}`, {
      data
    });
  }
}

export default UgcCreateApi;
