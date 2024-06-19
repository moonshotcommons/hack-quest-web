import WebService from '@/service/webService/webService';
import { HackathonType } from './types';

export enum HackathonApiUrl {
  HACKATHONS = '/hackathons'
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
    return this.service.patch<void>(`${HackathonApiUrl.HACKATHONS}/${id}/${status}`, { data: rest });
  }

  updateHackathonImage(data: FormData, id: string) {
    return this.service.patch<{ id: string }>(`${HackathonApiUrl.HACKATHONS}/${id}/cover`, {
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export default HackathonApi;
