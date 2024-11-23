import Image from 'next/image';
import type { Metadata } from 'next';
import { Clock4Icon, MapPinIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Back } from '../components/back';
import { getCachedJob } from '@/service/cach/jobs';
import { workTypes } from '../validations';
import { Footer } from '../components/footer';
import { JobDescription } from '../components/job-description';
import { formatLocation, formatSalary } from '../utils';
import { capitalize } from 'lodash-es';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const job = await getCachedJob(params.id);

  const title = `${job.name} at ${job.companyName}`;
  const description = 'Find and apply for Web 3 jobs.';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://hackquest.io/jobs/${params.id}`
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description
    }
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const job = await getCachedJob(params.id);
  return (
    <main className="flex h-full max-h-[calc(100vh-64px)] w-full flex-col bg-neutral-off-white sm:max-h-full sm:bg-neutral-white">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'JobPosting',
            headline: job.name,
            description: 'Find and apply for Web 3 jobs.',
            datePublished: job.createdAt,
            dateModified: job.updatedAt,
            url: `https://hackquest.io/jobs/${job.id}`
          })
        }}
      />
      <div className="no-scrollbar w-full flex-1 space-y-5 overflow-auto px-5 py-10 sm:mx-auto sm:max-w-5xl sm:space-y-6 sm:px-0 sm:py-12">
        <Back />
        <h1 className="text-2xl font-bold">{job.name}</h1>
        <div className="flex items-center gap-3">
          <div className="relative h-6 w-6 overflow-hidden rounded-full">
            <Image src={job.companyLogo} alt={job.companyName} fill className="rounded-full" />
          </div>
          <h3 className="text-lg text-neutral-rich-gray">{job.companyName}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          {job?.minSalary && job?.maxSalary ? <span>{formatSalary(job)}</span> : null}
          <div className="flex items-center gap-2">
            <Clock4Icon className="h-5 w-5" />
            <span>{workTypes.find((w) => w.id === job.workType)?.label ?? capitalize(job.workType)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-5 w-5" />
            <span>{formatLocation(job)}</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          {job.tags?.map((tag) => (
            <Badge key={tag} size="large">
              {tag}
            </Badge>
          ))}
        </div>
        <JobDescription description={job.description} />
      </div>
      <Footer {...job} />
    </main>
  );
}
