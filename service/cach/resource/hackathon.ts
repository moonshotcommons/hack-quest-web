import { cache } from 'react';
import {
  HackathonDataType,
  HackathonType,
  HackathonVoteType,
  JoinedHackathonType,
  ProjectType
} from '@/service/webApi/resourceStation/type';
import webApi from '@/service/index';
import { cookies } from 'next/headers';

export const getHackathonsList = cache(function (param: object): Promise<HackathonDataType> {
  const token = cookies().get('token')?.value || '';
  return webApi.resourceStationApi.getHackathonList(param, token as string);
});

export const getJoinedHackathons = cache(function (params?: object): Promise<JoinedHackathonType> {
  const token = cookies().get('token')?.value || '';
  return webApi.resourceStationApi.getJoinedHackathons(token, params);
});

export const getHackathonVote = cache(function (params?: object): Promise<HackathonVoteType[]> {
  const token = cookies().get('token')?.value || '';
  return webApi.resourceStationApi.getHackathonVote(token, params);
});

export const getHackathonById = cache(function (id: string): Promise<HackathonType> {
  const token = cookies().get('token')?.value || '';
  return webApi.resourceStationApi.getHackathonDetail(id as string, token as string);
});

export const getHackathonProjectById = cache(function (projectId: string): Promise<ProjectType> {
  const token = cookies().get('token')?.value || '';
  return webApi.resourceStationApi.getProjectsDetail(projectId, token as string);
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
