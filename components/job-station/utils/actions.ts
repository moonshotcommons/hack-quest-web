'use server';

import { isEmpty } from 'lodash-es';
import { revalidateTag } from 'next/cache';
import { getToken } from '@/helper/user-token';
import { Job } from '@/service/webApi/jobs/types';

type TParams = Record<string, any>;
type TResponse = Promise<{ data: Job[]; total: number }>;

function filterParams(params: TParams) {
  Object.keys(params).forEach((key) => {
    if (isEmpty(params[key])) {
      delete params[key];
    }
  });
  return params;
}

const JOB_CACHE_TAG = 'jobs';
const PUBLISHED_JOBS_CACHE_TAG = 'published-jobs';
// const API_URL = process.env.BACKEND_BASE_URL;
const API_URL = 'http://localhost:3000/v1';

export async function getCachedJobs(params: TParams): TResponse {
  const token = getToken();
  const searchParams = new URLSearchParams(filterParams(params));
  const response = await fetch(`${API_URL}/jobs?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    next: {
      tags: [JOB_CACHE_TAG]
    }
  });

  const data = await response.json();
  return data;
}

export async function getCachedPublishedJobs(params: TParams): TResponse {
  const token = getToken();
  const searchParams = new URLSearchParams(filterParams(params));
  const response = await fetch(`${API_URL}/jobs/published?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    next: {
      tags: [JOB_CACHE_TAG]
    }
  });

  const data = await response.json();
  return data;
}

export async function revalidate() {
  revalidateTag(JOB_CACHE_TAG);
  revalidateTag(PUBLISHED_JOBS_CACHE_TAG);
}
