import WebService from '@/service/webService/webService';
import { MantleType, TargetsType } from './type';

export enum CampaignsApiType {
  Campaigns = '/campaigns'
}

class CampaignsApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  getCampaigns() {
    return this.service.get<MantleType[]>(CampaignsApiType.Campaigns);
  }

  campaignsClaim(data: { campaignId: string }) {
    return this.service.post(`${CampaignsApiType.Campaigns}/claim`, {
      data
    });
  }

  getCampaignsTargets(id: string) {
    return this.service.get<TargetsType[]>(
      `${CampaignsApiType.Campaigns}/${id}/targets`
    );
  }

  campaignsTargetClaim(campaignId: string, data: { targetIds: string[] }) {
    return this.service.post(
      `${CampaignsApiType.Campaigns}/${campaignId}/targets/claim`,
      {
        data
      }
    );
  }

  campaignsDiscord() {
    return this.service.get<{ url: string }>(
      `${CampaignsApiType.Campaigns}/discord`
    );
  }

  campaignsTwitter(campaignId: string, data: { targetIds: string[] }) {
    return this.service.post<{ url: string }>(
      `${CampaignsApiType.Campaigns}/${campaignId}/targets/complete`,
      {
        data
      }
    );
  }
}

export default CampaignsApi;
