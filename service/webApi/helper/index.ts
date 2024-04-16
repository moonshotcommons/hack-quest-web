import WebService from '@/service/webService/webService';
import { CompletionsInput, CompletionsRes } from './type';

export enum HelperApiType {
  Completions = '/chat/completions',
  History = '/chat/histories'
}

class HelperApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  completions(input: CompletionsInput) {
    return this.service.post<{ content: string }>(HelperApiType.Completions, {
      data: input
    });
  }

  getHistory() {
    return this.service.get<CompletionsRes[]>(HelperApiType.History);
  }
}

export default HelperApi;
