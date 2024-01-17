import ResourceStationApi from './webApi/resourceStation';
import WebService from './webService/webService';
import CampaignsApi from './webApi/campaigns';
import CourseApi from './webApi/course';
import LearningTrackApi from './webApi/learningTrack';
import MissionCenterApi from './webApi/missionCenter';
import PreviewApi from './webApi/preview';
import UserApi from './webApi/user';

class WebApi {
  protected baseURL: string;
  protected service: WebService;
  protected timeout = 10000;

  campaignsApi: CampaignsApi;
  courseApi: CourseApi;
  // electiveApi: ElectiveApi;
  learningTrackApi: LearningTrackApi;
  missionCenterApi: MissionCenterApi;
  previewApi: PreviewApi;
  userApi: UserApi;
  resourceStationApi: ResourceStationApi;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.service = new WebService({
      baseURL
    });

    this.resourceStationApi = new ResourceStationApi(this.service);
    this.campaignsApi = new CampaignsApi(this.service);
    this.courseApi = new CourseApi(this.service);
    // this.electiveApi = new ElectiveApi(this.service);
    this.learningTrackApi = new LearningTrackApi(this.service);
    this.missionCenterApi = new MissionCenterApi(this.service);
    this.previewApi = new PreviewApi(this.service);
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
