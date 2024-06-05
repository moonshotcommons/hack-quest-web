import WebService from '@/service/webService/webService';
import { PageResult } from '../type';
import { Idea } from './types';

export enum IdeaApiUrl {
  IDEAS = '/ideas'
}

class IdeaApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  /**
   * Get ideas
   * @param params
   * @param token
   * @returns
   */
  getIdeas(params: Record<string, any>, token: string) {
    return this.service.get<PageResult<Idea>>(IdeaApiUrl.IDEAS, {
      params,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * Get top ideas
   * @param token
   * @returns
   */
  getTopIdeas(token: string) {
    return this.service.get<Idea[]>(`${IdeaApiUrl.IDEAS}/top`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * Get idea
   * @param id
   * @param token
   * @returns
   */
  getIdea(id: string, token: string) {
    return this.service.get<Idea>(`${IdeaApiUrl.IDEAS}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  /**
   * Submit an idea
   * @param data
   * @returns
   */
  submitIdea(data: Record<string, any>) {
    return this.service.post<void>(IdeaApiUrl.IDEAS, {
      data
    });
  }

  /**
   * Upvote idea
   * @param id
   * @returns
   */
  upvoteIdea(id: string) {
    return this.service.post<void>(`${IdeaApiUrl.IDEAS}/${id}/like`);
  }
}

export default IdeaApi;
