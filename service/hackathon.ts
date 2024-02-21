import { cache } from 'react';
import {
  HackathonType,
  ProjectType
} from '@/service/webApi/resourceStation/type';
import webApi from '@/service/index';

export const getHackathonById = cache(function (
  id: string
): Promise<HackathonType> {
  return webApi.resourceStationApi.getHackathonDetail(id as string);
});

export const getHackathonProjectById = cache(function (
  projectId: string
): Promise<ProjectType> {
  return webApi.resourceStationApi.getProjectsDetail(projectId);
});

export const getFeaturedProjects = async function (): Promise<ProjectType[]> {
  const res = await webApi.resourceStationApi.getProjectsList({
    featured: true
  });
  return res.data;
};

export const getFeaturedProjectsById = cache(async function (
  projectId: string
): Promise<ProjectType[]> {
  const res = await webApi.resourceStationApi.getProjectsList({
    featured: true
  });
  return projectId
    ? res.data.filter((project) => project.id !== projectId)
    : res.data;
});

export const getOtherProjects = cache(async function (
  keyword: string,
  activeProjectId: string
) {
  const res = await webApi.resourceStationApi.getProjectsList({
    keyword
  });
  return res.data.filter((project) => project.id !== activeProjectId);
});
