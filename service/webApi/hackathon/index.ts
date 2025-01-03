import WebService from '@/service/webService/webService';
import {
  Announcement,
  AnnouncementCreateDto,
  AnnouncementTemplateVo,
  HackathonType,
  ReceiverType,
  UpdateAnnouncementTemplateDto
} from './types';

export enum HackathonApiUrl {
  HACKATHONS = '/hackathons',
  USERS = '/users'
}

class HackathonApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  getHackathon(alias: string) {
    return this.service.get<HackathonType>(`${HackathonApiUrl.HACKATHONS}/${alias}`);
  }

  createHackathon(data: { name: string }) {
    return this.service.post<HackathonType>(HackathonApiUrl.HACKATHONS, { data });
  }

  verifyHackathonName(name: string) {
    return this.service.get<{ allow: boolean }>(`${HackathonApiUrl.HACKATHONS}/verify-name`, {
      params: { name }
    });
  }

  updateHackathon(data: Record<string, any>, status: string) {
    const { id, ...rest } = data;
    return this.service.patch<void>(`${HackathonApiUrl.HACKATHONS}/${id}/${status}`, {
      data: {
        ...rest
      }
    });
  }

  updateHackathonEdit(hackathonId: string, data: Record<string, any>, status: string) {
    return this.service.patch<void>(`${HackathonApiUrl.HACKATHONS}/${hackathonId}/${status}`, {
      data
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
    const hackathonId = data.hackathonId;
    return this.service.post<void>(`${HackathonApiUrl.HACKATHONS}/${hackathonId}/judge`, {
      data
    });
  }

  updateHackathonJudge(judgeId: string, data: Record<string, any>) {
    const hackathonId = data.hackathonId;
    return this.service.patch<void>(`${HackathonApiUrl.HACKATHONS}/${hackathonId}/judge/${judgeId}`, {
      data
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

  checkJudgeAccount(hackathonId: string, email: string) {
    return this.service.get<any>(`${HackathonApiUrl.HACKATHONS}/${hackathonId}/judge/checkAccount`, {
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

  /** 创建邮件计划 */
  createAnnouncement(hackathonId: string, data: AnnouncementCreateDto & { id?: number | string | null }) {
    return this.service.post(`${HackathonApiUrl.HACKATHONS}/admin/${hackathonId}/announcement`, {
      data
    });
  }

  /** 创建邮件计划 */
  getAnnouncements(hackathonId: string) {
    return this.service.get<Announcement[]>(`${HackathonApiUrl.HACKATHONS}/admin/${hackathonId}/announcement`);
  }

  /** 创建邮件计划 */
  deleteAnnouncementById(hackathonId: string, id: string | number) {
    return this.service.delete<Announcement[]>(`${HackathonApiUrl.HACKATHONS}/admin/${hackathonId}/announcement/${id}`);
  }

  /** 创建邮件计划 */
  getReceiversCount(hackathonId: string) {
    return this.service.get<Record<ReceiverType, number>>(
      `${HackathonApiUrl.HACKATHONS}/admin/${hackathonId}/receivers/count`
    );
  }

  // updateAnnouncement(hackathonId: string, data: Announcement & { id: number }) {
  //   return this.service.patch(`${HackathonApiUrl.HACKATHONS}/admin/${hackathonId}/announcement`, {
  //     data
  //   });
  // }

  getAnnouncementTemplate(hackathonId: string, templateType: string) {
    return this.service.get<Array<AnnouncementTemplateVo>>(
      `${HackathonApiUrl.HACKATHONS}/admin/${hackathonId}/announcement/template/${templateType}`
    );
  }

  updateAnnouncementTemplate(data: Array<UpdateAnnouncementTemplateDto>) {
    return this.service.put<number>(`${HackathonApiUrl.HACKATHONS}/admin/announcement/template`, {
      data
    });
  }

  getTransformData() {
    return this.service.get<any>(`/hackathon/transform-data`);
  }

  updateHackathonDesc(id: string, data: Record<string, any>) {
    return this.service.patch<void>(`/hackathon/${id}`, {
      data
    });
  }
}

export default HackathonApi;
