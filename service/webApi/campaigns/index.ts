import WebService from '@/service/webService/webService';
import {
  CertificationType,
  GetSignatureParams,
  MantleType,
  SignatureData,
  TargetsType
} from './type';

export enum CampaignsApiType {
  Campaigns = '/campaigns',
  GetSignature = '/ethers/signature',
  Certifications = '/certifications'
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

  campaignsToUrl(campaignId: string, data: { targetIds: string[] }) {
    return this.service.post<{ url: string }>(
      `${CampaignsApiType.Campaigns}/${campaignId}/targets/complete`,
      {
        data
      }
    );
  }

  /** 获取certification 密钥 */
  getSignature(params: GetSignatureParams) {
    return this.service.post<SignatureData>(CampaignsApiType.GetSignature, {
      data: params
    });
  }

  /** 获取证书的详情 */
  getCertificationDetail(certificationId: string) {
    return this.service.get<CertificationType>(
      `${CampaignsApiType.Certifications}/${certificationId}`
    );
  }

  /** 获取证书的详情 */
  async fetchCertificationDetail(
    certificationId: string
  ): Promise<CertificationType> {
    const url = `${this.service.baseURL.slice(0, -1)}${CampaignsApiType.Certifications}/${certificationId}`;

    const certificationDetail = await fetch(url, {
      method: 'get'
    });

    if (!certificationDetail.ok) {
      throw new Error('Failed to fetch learning track data!');
    }

    return certificationDetail.json();
  }

  /** 保存mint状态 */
  savaMintState(params: { certificationId: string; txId: string }) {
    return this.service.patch(
      `${CampaignsApiType.Certifications}/${params.certificationId}/mint`,
      {
        data: {
          txId: params.txId
        }
      }
    );
  }
}

export default CampaignsApi;
