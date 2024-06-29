import WebService from '@/service/webService/webService';
import { HackathonType } from './types';

export enum HackathonApiUrl {
  HACKATHONS = '/hackathons',
  USERS = '/users'
}

class HackathonApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  getHackathon(id: string) {
    return this.service.get<HackathonType>(`${HackathonApiUrl.HACKATHONS}/${id}`);
  }

  createHackathon(data: { name: string }) {
    return this.service.post<HackathonType>(HackathonApiUrl.HACKATHONS, { data });
  }

  updateHackathon(data: Record<string, any>, status: string) {
    const { id, ...rest } = data;
    return this.service.patch<void>(`${HackathonApiUrl.HACKATHONS}/${id}/${status}`, {
      data: rest
    });
  }

  updateHackathonImage(data: FormData, id: string) {
    return this.service.patch<{ id: string }>(`${HackathonApiUrl.HACKATHONS}/${id}/cover`, {
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  createHackathonRewards(data: Record<string, any>) {
    const { id, ...rest } = data;
    return this.service.post<void>(`${HackathonApiUrl.HACKATHONS}/${id}/rewards`, {
      data: rest
    });
  }

  updateHackathonRewards(rewardsId: string, data: Record<string, any>) {
    const { id, ...rest } = data;
    return this.service.patch<void>(`${HackathonApiUrl.HACKATHONS}/${id}/rewards/${rewardsId}`, {
      data: rest
    });
  }

  removeHackathonRewards(hackathonId: string, rewardsId: string) {
    return this.service.delete<void>(`${HackathonApiUrl.HACKATHONS}/${hackathonId}/rewards/${rewardsId}`);
  }

  createHackathonJudge(data: Record<string, any>) {
    const { id, ...rest } = data;
    return this.service.post<void>(`${HackathonApiUrl.HACKATHONS}/${id}/judge`, {
      data: rest
    });
  }

  updateHackathonJudge(judgeId: string, data: Record<string, any>) {
    const { id, ...rest } = data;
    return this.service.patch<void>(`${HackathonApiUrl.HACKATHONS}/${id}/judge/${judgeId}`, {
      data: rest
    });
  }

  removeHackathonJudge(hackathonId: string, judgeId: string) {
    return this.service.delete<void>(`${HackathonApiUrl.HACKATHONS}/${hackathonId}/judge/${judgeId}`);
  }

  addJudgeAccount(email: string) {
    return this.service.get<any>(`${HackathonApiUrl.USERS}/simple`, {
      params: { email }
    });
  }

  sendVerifyEmail(hackathonId: string, email: string) {
    return this.service.get<void>(`${HackathonApiUrl.HACKATHONS}/${hackathonId}/send-verify-email`, {
      params: { email }
    });
  }

  checkEmail(hackathonId: string, code: string) {
    return this.service.get<any>(`${HackathonApiUrl.HACKATHONS}/${hackathonId}/check-email`, {
      params: { code }
    });
  }
}

export default HackathonApi;
