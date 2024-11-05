import { MetadataRoute } from 'next';
import { BlogType, HackathonStatusType } from '@/service/webApi/resourceStation/type';

type Link = {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
};

async function getAllProjects(type = 'projects', params?: Record<string, string>) {
  const url = new URL('https://api.hackquest.io/v1/' + type);
  if (params) {
    Object.keys(params).forEach((key) => {
      url.searchParams.append(key, params[key]);
    });
  }
  const response = await fetch(url);
  if (!response.ok) return [];

  const json = await response.json();
  const data = json.data || (Array.isArray(json) ? json : []);
  return data.map((item: BlogType) => {
    const { id, alias, updatedAt } = item;
    return {
      id,
      alias,
      updatedAt
    };
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const onGoings = await getAllProjects('hackathons', { status: HackathonStatusType.ON_GOING });
  const pasts = await getAllProjects('hackathons', { status: HackathonStatusType.PAST });
  const votings = await getAllProjects('hackathons', { status: 'voting' });
  const blogs = await getAllProjects('blogs');
  const glossaries = await getAllProjects('glossaries');
  const learningTracks = await getAllProjects('learning-tracks');
  const courses = await getAllProjects('courses');
  const ecosystems = await getAllProjects('ecosystems');
  const faucets = await getAllProjects('faucets');
  const ideas = await getAllProjects('ideas');
  const jobs = await getAllProjects('jobs');
  const lastModified = new Date();

  const base: Link[] = [
    {
      url: 'https://www.hackquest.io/',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: 'https://www.hackquest.io/idea-bank',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    ...ideas.map((idea: BlogType) => ({
      url: `https://www.hackquest.io/idea-bank/${idea.id}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6
    })),
    {
      url: 'https://www.hackquest.io/web3mooc',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: 'https://www.hackquest.io/ecosystem-explore',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    ...ecosystems.map((track: BlogType) => ({
      url: `https://www.hackquest.io/ecosystem-explore/${track.id}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8
    })),
    {
      url: 'https://www.hackquest.io/learning-track',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: 'https://www.hackquest.io/learning-track?track=Specialization',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    ...learningTracks.map((track: BlogType) => ({
      url: `https://www.hackquest.io/learning-track/${track.id}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8
    })),
    {
      url: 'https://www.hackquest.io/electives',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: 'https://www.hackquest.io/practices',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    ...courses.map((course: BlogType) => ({
      url: `https://www.hackquest.io/practices/${course.id}`,
      changeFrequency: 'monthly',
      priority: 0.8
    })),
    {
      url: 'https://www.hackquest.io/blog',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    ...blogs.map((blog: BlogType) => ({
      url: `https://www.hackquest.io/blog/${blog.alias}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8
    })),
    {
      url: 'https://www.hackquest.io/hackathon/organizer',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: 'https://www.hackquest.io/hackathon/explore',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: 'https://www.hackquest.io/hackathon/voting',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    ...votings.map((hackathon: BlogType) => ({
      url: `https://www.hackquest.io/hackathon/voting/${hackathon.alias}`,
      lastModified: new Date(hackathon.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8
    })),
    ...[...onGoings, ...pasts].map((hackathon: BlogType) => ({
      url: `https://www.hackquest.io/hackathon/explore/${hackathon.alias}`,
      lastModified: new Date(hackathon.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.8
    })),
    {
      url: 'https://www.hackquest.io/glossary',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    ...glossaries.map((glossary: BlogType) => ({
      url: `https://www.hackquest.io/glossary/${glossary.alias}`,
      lastModified: new Date(glossary.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7
    })),
    {
      url: 'https://www.hackquest.io/advocate',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: 'https://www.hackquest.io/events',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: 'https://www.hackquest.io/faucets',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    ...faucets.map((faucet: BlogType) => ({
      url: `https://www.hackquest.io/faucets/${faucet.id}`,
      lastModified: new Date(faucet.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6
    })),
    {
      url: 'https://www.hackquest.io/press-kit/about',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: 'https://www.hackquest.io/press-kit/articles',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: 'https://www.hackquest.io/press-kit/logos',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: 'https://www.hackquest.io/press-kit/links',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: 'https://www.hackquest.io/press-kit/contact',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: 'https://www.hackquest.io/jobs',
      lastModified,
      changeFrequency: 'daily',
      priority: 0.7
    },
    ...jobs.map((job: BlogType) => ({
      url: `https://www.hackquest.io/jobs/${job.id}`,
      lastModified: new Date(job.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6
    }))
  ];

  const languages = ['en', 'zh'];
  return languages.reduce((acc, lang) => {
    acc.push(
      ...base.map((item: Link) => {
        return {
          ...item,
          url: item.url.replace('https://www.hackquest.io/', `https://www.hackquest.io/${lang}/`)
        };
      })
    );
    return acc;
  }, [] as Link[]);
}
