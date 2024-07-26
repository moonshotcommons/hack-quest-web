import WebService from '@/service/webService/webService';
import { PageResult } from '../type';
import type { Job } from './types';

export enum JobApiUrl {
  JOBS = '/jobs'
}

class JobApi {
  protected service: WebService;
  constructor(service: WebService) {
    this.service = service;
  }

  getJobs(params: Record<string, any>) {
    return this.service.get<PageResult<Job>>(JobApiUrl.JOBS, { params });
  }

  getFavoritedJobs(params: Record<string, any>) {
    return this.service.get<PageResult<Job>>(`${JobApiUrl.JOBS}/favorites`, { params });
  }

  getPublishedJobCount() {
    return this.service.get<{ total: number; open: number }>(`${JobApiUrl.JOBS}/published/count`);
  }

  getPublishedJobs() {
    return this.service.get<PageResult<Job>>(`${JobApiUrl.JOBS}/published`);
  }

  getJob(id: string) {
    return this.service.get<Job>(`${JobApiUrl.JOBS}/${id}`);
  }

  getJobTags() {
    return this.service.get<string[]>(`${JobApiUrl.JOBS}/tags`);
  }

  publishJob(data: Record<string, any>) {
    return this.service.post<Job>(`${JobApiUrl.JOBS}`, {
      data
    });
  }

  updateJob(id: string, data: Record<string, any>) {
    return this.service.put<Job>(`${JobApiUrl.JOBS}/${id}`, {
      data
    });
  }

  favoriteJob(jobId: string) {
    return this.service.post(`${JobApiUrl.JOBS}/${jobId}/favorite`);
  }

  unfavoriteJob(jobId: string) {
    return this.service.delete(`${JobApiUrl.JOBS}/${jobId}/favorite`);
  }
}

export default JobApi;
