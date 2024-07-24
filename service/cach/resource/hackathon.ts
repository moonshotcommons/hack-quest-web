import { cache } from 'react';
import {
  HackathonDataType,
  HackathonType,
  HackathonVoteType,
  JoinedHackathonType,
  ProjectType,
  SimpleHackathonInfo
} from '@/service/webApi/resourceStation/type';
import webApi from '@/service/index';
import { cookies } from 'next/headers';

export const getHackathonsList = cache(function (param: object): Promise<HackathonDataType> {
  return webApi.resourceStationApi.getHackathonList(param);
});

export const getJoinedHackathons = cache(function (params?: object): Promise<JoinedHackathonType> {
  return webApi.resourceStationApi.getJoinedHackathons(params);
});

export const getHackathonVote = cache(function (params?: object): Promise<HackathonVoteType[]> {
  return webApi.resourceStationApi.getHackathonVote(params);
});

export const getHackathonById = cache(function (id: string): Promise<HackathonType> {
  return webApi.resourceStationApi.getHackathonDetail(id as string);
});

/** page view */
export const getHackathonDetailById = cache(function (id: string): Promise<HackathonType> {
  return webApi.resourceStationApi.getHackathonDetailById(id as string);
});

export const getSimpleHackathonInfo = cache(function (id: string): Promise<SimpleHackathonInfo> {
  return webApi.resourceStationApi.getSimpleHackathonInfo(id as string);
});

export const getHackathonProjectById = cache(function (projectId: string): Promise<ProjectType> {
  return webApi.resourceStationApi.getProjectsDetail(projectId);
});
export const getProjectVoteById = cache(function (projectId: string): Promise<unknown> {
  return webApi.resourceStationApi.getProjectVoteById(projectId);
});

export const getFeaturedProjects = async function (): Promise<ProjectType[]> {
  const res = await webApi.resourceStationApi.getProjectsList({
    featured: true
  });
  return res.data;
};

export const getFeaturedProjectsById = cache(async function (projectId: string): Promise<ProjectType[]> {
  const res = await webApi.resourceStationApi.getProjectsList({
    featured: true
  });
  return projectId ? res.data.filter((project) => project.id !== projectId) : res.data;
});

export const getOtherProjects = cache(async function (keyword: string, activeProjectId: string) {
  const res = await webApi.resourceStationApi.getProjectsList({
    keyword
  });
  return res.data.filter((project) => project.id !== activeProjectId);
});

export const getHackathonsByCreator = cache(function (): Promise<HackathonType[]> {
  const token = cookies().get('token')?.value || '';
  return webApi.resourceStationApi.getHackathonsByCreator(token as string);
});
