import ResourceStationApi from './webApi/resourceStation';
import WebService from './webService/webService';
import CampaignsApi from './webApi/campaigns';
import CourseApi from './webApi/course';
import LearningTrackApi from './webApi/learningTrack';
import MissionCenterApi from './webApi/missionCenter';
import PreviewApi from './webApi/preview';
import UserApi from './webApi/user';
import UgcCreateApi from './webApi/ugcCreate';
import LaunchPoolApi from './webApi/launchPool';
import HelperApi from './webApi/helper';
import EcosystemApi from './webApi/ecosystem';
import IdeaApi from './webApi/ideas';
import HackathonApi from './webApi/hackathon';
import CommonApi from './webApi/common';
import JobApi from './webApi/jobs';
import EmailApi from './webApi/email';

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
  ugcCreateApi: UgcCreateApi;
  launchPoolApi: LaunchPoolApi;
  helperApi: HelperApi;
  ecosystemApi: EcosystemApi;
  ideaApi: IdeaApi;
  hackathonV2Api: HackathonApi;
  commonApi: CommonApi;
  jobApi: JobApi;
  emailApi: EmailApi;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.service = new WebService({
      baseURL,
      timeout: 30000
    });

    this.resourceStationApi = new ResourceStationApi(this.service);
    this.campaignsApi = new CampaignsApi(this.service);
    this.courseApi = new CourseApi(this.service);
    // this.electiveApi = new ElectiveApi(this.service);
    this.learningTrackApi = new LearningTrackApi(this.service);
    this.missionCenterApi = new MissionCenterApi(this.service);
    this.previewApi = new PreviewApi(this.service);
    this.userApi = new UserApi(this.service);
    this.ugcCreateApi = new UgcCreateApi(this.service);
    this.launchPoolApi = new LaunchPoolApi(this.service);
    this.helperApi = new HelperApi(this.service);
    this.ecosystemApi = new EcosystemApi(this.service);
    this.ideaApi = new IdeaApi(this.service);
    this.hackathonV2Api = new HackathonApi(this.service);
    this.commonApi = new CommonApi(this.service);
    this.jobApi = new JobApi(this.service);
    this.emailApi = new EmailApi(this.service);
  }
}

let webApi = null;

if (!webApi) {
  webApi = new WebApi(process.env.BACKEND_BASE_URL || 'https://api.dev.hackquest.io/v1');
}

export default webApi as WebApi;
