import WebService from '@/service/webService/webService';
import { CompletionsInput, CompletionsRes, DocsItem } from './type';
import { cache } from 'react';

export enum HelperApiType {
  Completions = '/chat/completions',
  History = '/chat/histories',
  Docs = '/docs'
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

  getDocs() {
    return this.service.get<DocsItem[]>(HelperApiType.Docs);
  }

  fetchGetDocs() {
    const cacheFn = cache(async () => {
      return this.getDocs();
    });

    return cacheFn();
  }

  getDocsById(id: string) {
    return this.service.get<DocsItem>(`${HelperApiType.Docs}/${id}`);
  }

  fetchGetDocsById(id: string) {
    const cacheFn = cache(async () => {
      return this.getDocsById(id);
    });

    return cacheFn();
  }
}

export default HelperApi;
