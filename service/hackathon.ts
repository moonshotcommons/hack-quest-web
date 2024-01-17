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

export const getFeaturedProjects = cache(async function (
  projectId?: string
): Promise<ProjectType[]> {
  const res = await webApi.resourceStationApi.getProjectsList({
    featured: true
  });
  return projectId
    ? res.data.filter((project) => project.id !== projectId)
    : res.data;
});
