import * as React from 'react';
import { BackLink } from '@/components/hackathon/back-link';
import { ParticipatedContent } from './components/content';
import { getJoinedHackathons } from '@/service/cach/resource/hackathon';

export default async function Page({ searchParams: { status = 'ongoing' } }: { searchParams: { status: string } }) {
  const { hackathons } = await getJoinedHackathons({ status });
  return (
    <div className="mx-auto max-w-[952px] pb-12 pt-5">
      <BackLink href="/hackathon/dashboard" />
      <React.Suspense fallback={null}>
        <ParticipatedContent hackathons={hackathons} />
      </React.Suspense>
    </div>
  );
}
