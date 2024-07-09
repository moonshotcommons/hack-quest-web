export interface NotionParseLog {
  id: number | string;
  url: string;
  notionId: string;
  modelType: string;
  modelId: string;
  errorMsg: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
