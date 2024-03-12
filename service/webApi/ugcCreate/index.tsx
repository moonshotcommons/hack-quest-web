import WebService from '@/service/webService/webService';
import { UGCCourseType } from '../course/type';
import { CourseInformationType } from '@/app/(web)/(learn page)/ugc/[courseId]/creation/constant/type';
export enum UgcCreateApiType {
  COURSES = '/courses',
  PAGES = 'pages'
}

class UgcCreateApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }
  /**获取ugc information 详情 */
  getUgcInformationDetail(courseId: string, params: object) {
    return this.service.get<UGCCourseType>(
      `${UgcCreateApiType.COURSES}/${courseId}`,
      {
        params
      }
    );
  }
  /** 创建introduction */
  introductionAdd(data: object) {
    return this.service.post<CourseInformationType>(UgcCreateApiType.COURSES, {
      data
    });
  }
  /** 修改infoamation */
  informationEdit(courseId: string, data: object) {
    return this.service.patch<CourseInformationType>(
      `${UgcCreateApiType.COURSES}/${courseId}`,
      {
        data
      }
    );
  }
  /** 新增units */
  addUnit(courseId: string, data: object) {
    return this.service.post(`${UgcCreateApiType.COURSES}/${courseId}/units`, {
      data
    });
  }
  /** 修改units */
  editUnit(courseId: string, unitId: string, data: object) {
    return this.service.patch(
      `${UgcCreateApiType.COURSES}/${courseId}/units/${unitId}`,
      {
        data
      }
    );
  }
  /** 新增lesson */
  addLesson(data: object) {
    return this.service.post(`${UgcCreateApiType.PAGES}`, {
      data
    });
  }
  /** 编辑lesson */
  editLesson(id: string, data: object) {
    return this.service.patch(`${UgcCreateApiType.PAGES}/${id}`, {
      data
    });
  }
}

export default UgcCreateApi;
