import * as React from 'react';
import { redirect } from 'next/navigation';
import { BackLink } from '@/components/hackathon/back-link';
import { ParticipatedContent } from './components/content';
import { getJoinedHackathons } from '@/service/cach/resource/hackathon';
import MenuLink from '@/constants/MenuLink';

export default async function Page({ searchParams: { status = 'ongoing' } }: { searchParams: { status: string } }) {
  try {
    const { hackathons } = await getJoinedHackathons({ status });
    return (
      <div className="min-h-[calc(100vh-4rem)] w-full p-5">
        <BackLink href={MenuLink.HACKATHON_DASHBOARD} />
        <React.Suspense fallback={null}>
          <ParticipatedContent hackathons={hackathons} />
        </React.Suspense>
      </div>
    );
  } catch (error: any) {
    if (error.code === 401) {
      redirect('/');
    }
    throw new Error(error);
  }
}
