export interface EmailDraftVo {
  id: string;
  name: string;
  draftJson: string;
  draftHtml: string;
  createdAt: string;
}

export interface CreateEmailDraftInput {
  name: string;
  draftJson: string;
  draftHtml: string;
}
