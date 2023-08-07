import WebService from './webService/webService';
import CourseApi from './webApi/course';
import LearningTrackApi from './webApi/learningTrack';
import MissionCenterApi from './webApi/missionCenter';
import UserApi from './webApi/user';

class WebApi {
  protected baseURL: string;
  protected service: WebService;
  protected timeout = 10000;

  courseApi: CourseApi;
  learningTrackApi: LearningTrackApi;
  MissionCenterApi: MissionCenterApi;
  userApi: UserApi;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.service = new WebService({
      baseURL
    });

    this.courseApi = new CourseApi(this.service);
    this.learningTrackApi = new LearningTrackApi(this.service);
    this.MissionCenterApi = new MissionCenterApi(this.service);
    this.userApi = new UserApi(this.service);
  }
}

let webApi = null;
if (!webApi) {
  webApi = new WebApi(
    process.env.BACKEND_BASE_URL || 'https://api.dev.hackquest.io/'
  );
}

export default webApi as WebApi;
