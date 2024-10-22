import WebService from '@/service/webService/webService';
import { CreateEmailDraftInput, EmailDraftVo } from './type';

class EmailApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  // 获取邮件草稿
  getEmailDraft(keyword?: string) {
    return this.service.get<{
      data: EmailDraftVo[];
    }>('/email/draft', {
      params: { keyword }
    });
  }

  // 保存邮件草稿
  createEmailDraft(data: CreateEmailDraftInput) {
    return this.service.post<EmailDraftVo>('/email/draft', {
      data
    });
  }

  // 删除邮件草稿
  deleteEmailDraft(id: string) {
    return this.service.delete<EmailDraftVo>(`/email/draft/${id}`);
  }
}

export default EmailApi;
