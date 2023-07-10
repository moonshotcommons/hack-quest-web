import WebService from './webService/webService';
import CourseApi from './webApi/course';
import UserApi from './webApi/user';

class WebApi {
  protected baseURL: string;
  protected service: WebService;
  protected timeout = 30000;

  courseApi: CourseApi;
  userApi: UserApi;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.service = new WebService({
      baseURL,
      timeout: this.timeout
    });

    this.courseApi = new CourseApi(this.service);
    this.userApi = new UserApi(this.service);
  }
}

let webApi = null;

if (!webApi) {
  webApi = new WebApi(process.env.BASE_URL || 'https://api-dev.hackquest.io/');
}

export default webApi as WebApi;
