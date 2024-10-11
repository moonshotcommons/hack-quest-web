'use client';

import * as React from 'react';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { HackathonJudgeType } from '@/service/webApi/resourceStation/type';
import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';
import { createEditor } from '@wangeditor/editor';
import { SearchForm, Sort, WinnersOnly, Unqualified } from '../../FilterPanel';
import { useRouter } from 'next-nprogress-bar';
import { usePathname, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import webApi from '@/service';
import { createUrl } from '@/helper/utils';
import { DropdownFilter } from '@/components/idea-bank/filters/dropdown';
import { XIcon } from 'lucide-react';
import ProjectCard from '@/components/Web/Business/ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '../Pagination';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function ProlectSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-5">
      {new Array(4).fill(0).map((_, index) => (
        <Skeleton key={index} className="h-[397px] w-full rounded-[10px] bg-neutral-white" />
      ))}
    </div>
  );
}

export function JudgeTab({ hackathonId, judges }: { hackathonId: string; judges: HackathonJudgeType[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [rewardName, setRewardName] = React.useState(judges[0]?.rewardName);
  const [rewardId, setRewardId] = React.useState(judges[0]?.id);

  const sort = currentParams.get('sort') ?? '-createdAt';
  const trackOptions = currentParams.getAll('track');
  const winner = currentParams.get('winner') ?? 'false';
  const invalid = currentParams.get('invalid') ?? 'false';
  const page = Number(currentParams.get('page') || 1);
  const keyword = currentParams.get('keyword');

  const { data: tracks } = useQuery({
    staleTime: Infinity,
    queryKey: ['tracks'],
    queryFn: () => webApi.resourceStationApi.getProjectTracksDict(),
    select: (data: string[]) => data?.map((item) => ({ label: item, value: item }))
  });

  const { data: projects, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: ['projects', trackOptions, keyword, winner, invalid, page, sort, rewardName, rewardId, hackathonId],
    queryFn: () =>
      webApi.resourceStationApi.getProjectsList({
        page,
        limit: 12,
        winner,
        invalid,
        sort,
        prizeTrack: rewardName,
        rewardId,
        hackathonId,
        ...(trackOptions?.length && { track: trackOptions.toString() }),
        ...(keyword && { keyword })
      })
  });

  const [selectedTracks, setSelectedTracks] = React.useState(trackOptions);

  const filteredTracks = tracks?.filter((item) => selectedTracks.includes(item.value));

  function onTabChange(index: number) {
    setSelectedTab(index);
    currentParams.delete('page');
    currentParams.delete('winner');
    currentParams.delete('sort');
    currentParams.delete('keyword');
    const url = createUrl(pathname, currentParams);
    router.replace(url);
  }

  function onValueChange(value: string) {
    const newValues = selectedTracks.includes(value)
      ? selectedTracks.filter((item) => item !== value)
      : [...selectedTracks, value];
    setSelectedTracks(newValues);
    currentParams.delete('track');
    if (newValues.length > 0) {
      newValues.forEach((v) => currentParams.append('track', v));
    }
    const url = createUrl(pathname, currentParams);
    router.replace(url, { scroll: false });
  }

  return (
    <div className="flex flex-col">
      <div className="w-full overflow-x-auto">
        <SlideHighlight className="flex gap-8 pb-0.5" type="LEARNING_TRACK" currentIndex={selectedTab}>
          {judges.map((tab, index) => (
            <button
              key={tab.id}
              className={`body-xl cursor-pointer whitespace-nowrap text-neutral-off-black outline-none ${selectedTab === index && 'body-xl-bold'}`}
              onClick={() => {
                onTabChange(index);
                setRewardName(tab.rewardName);
                setRewardId(tab.id);
              }}
            >
              {tab.rewardName}
            </button>
          ))}
        </SlideHighlight>
      </div>
      <div className="mt-6 flex flex-col space-y-6">
        {judges[selectedTab]?.criteria && (
          <section className="space-y-1">
            <h4 className="body-m text-neutral-medium-gray">Judging Criteria</h4>
            {judges[selectedTab]?.criteria?.type === TEXT_EDITOR_TYPE ? (
              <p
                className="body-m reset-editor-style text-neutral-rich-gray"
                dangerouslySetInnerHTML={{
                  __html: createEditor({
                    content: structuredClone(judges[selectedTab]?.criteria?.content || [])
                  }).getHtml()
                }}
              />
            ) : (
              <p className="body-m text-neutral-rich-gray">{judges[selectedTab]?.criteria}</p>
            )}
          </section>
        )}
        <section className="flex flex-wrap items-center gap-20">
          {judges[selectedTab]?.judgeMode && (
            <div className="space-y-1">
              <h4 className="text-neutral-medium-gray">Judging Mode</h4>
              <span>{judges[selectedTab]?.judgeMode === 'all' ? 'Users + Judges' : 'Judges Only'}</span>
            </div>
          )}
          {judges[selectedTab]?.voteMode && (
            <div className="space-y-1">
              <h4 className="text-neutral-medium-gray">Voting Mode</h4>
              <span>{judges[selectedTab]?.voteMode === 'fixed' ? 'Fixed Number of Vote' : 'Project Scoring'}</span>
            </div>
          )}
          {judges[selectedTab]?.judgeTotalVote && (
            <div className="space-y-1">
              <h4 className="text-neutral-medium-gray">Each Judge’s Votes</h4>
              <span>{Math.round(judges[selectedTab]?.judgeTotalVote)}</span>
            </div>
          )}
          {judges[selectedTab]?.judgeProjectVote && (
            <div className="space-y-1">
              <h4 className="text-neutral-medium-gray">
                MAX Votes Per Project Per {judges[selectedTab]?.judgeMode === 'all' ? 'User/Judge' : 'Judge'}
              </h4>
              <span>{judges[selectedTab]?.judgeProjectVote}</span>
            </div>
          )}
          {judges[selectedTab]?.votesProportion?.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-neutral-medium-gray">Total User Votes</h4>
              <span>
                {Math.round(
                  (judges[selectedTab]?.votesProportion[0] / 100) *
                    (judges[selectedTab]?.totalVote || judges[selectedTab]?.judgeTotalVote || 0)
                )}
              </span>
            </div>
          )}
          {judges[selectedTab]?.votesProportion?.length > 0 && (
            <div className="space-y-1">
              <h4 className="text-neutral-medium-gray">Total Judge Votes</h4>
              <span>
                {Math.round(
                  (judges[selectedTab]?.votesProportion[1] / 100) *
                    (judges[selectedTab]?.totalVote || judges[selectedTab]?.judgeTotalVote || 0)
                )}
              </span>
            </div>
          )}
          {judges[selectedTab]?.projectJudgeCount && (
            <div className="space-y-1">
              <h4 className="text-neutral-medium-gray">Judges Needed for Each Project</h4>
              <span>{Math.round(judges[selectedTab]?.projectJudgeCount)}</span>
            </div>
          )}
          {judges[selectedTab]?.judgeMode === 'all' && (
            <div className="space-y-1">
              <h4 className="text-neutral-medium-gray">Votes for Each Judge</h4>
              <span>
                {Math.round(
                  ((judges[selectedTab]?.votesProportion[1] / 100) *
                    (judges[selectedTab]?.totalVote || judges[selectedTab]?.judgeTotalVote || 0)) /
                    (judges[selectedTab]?.judgeAccounts?.length || 1)
                )}
              </span>
            </div>
          )}
        </section>
        {judges[selectedTab]?.judgeAccounts?.length > 0 && (
          <section className="space-y-1">
            <h4 className="body-m text-neutral-medium-gray">
              Judging Accounts{' '}
              {judges[selectedTab]?.judgeMode === 'all' && `(${judges[selectedTab]?.judgeAccounts?.length})`}
            </h4>
            <div className="flex flex-wrap gap-x-10 gap-y-1">
              {judges[selectedTab]?.judgeAccounts?.map((account, index) => (
                <div className="flex items-center gap-3" key={index}>
                  <Avatar className="h-[50px] w-[50px]">
                    <AvatarImage src={account?.avatar} alt={`@${account?.nickname}`} />
                    <AvatarFallback className="bg-neutral-light-gray">
                      {account?.nickname?.slice(0, 1)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="body-m">{account?.nickname}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <div className="mt-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Sort />
            <WinnersOnly />
            <Unqualified />
          </div>
          <SearchForm />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DropdownFilter
            label="Sector"
            values={selectedTracks}
            onValueChange={(value) => onValueChange(value)}
            options={tracks}
          />
          {filteredTracks?.map((track) => (
            <button
              key={track.value}
              className="inline-flex h-11 items-center justify-between gap-2.5 rounded-full bg-yellow-primary px-4 py-1.5 text-neutral-off-black"
            >
              <span className="body-m">{track.label}</span>
              <XIcon className="h-5 w-5" onClick={() => onValueChange(track.value)} />
            </button>
          ))}
        </div>
      </div>
      <div className="my-10">
        {isLoading && <ProlectSkeleton />}
        {!isLoading &&
          ((projects?.data?.length || 0) > 0 ? (
            <div className="mb-10 grid grid-cols-4 gap-x-5 gap-y-10">
              {projects?.data?.map((project) => <ProjectCard key={project.id} project={project} />)}
            </div>
          ) : (
            <div className="flex w-full items-center justify-center py-20">
              <p className="text-lg font-medium">No data</p>
            </div>
          ))}
        {(projects?.total || 0) > 12 && <Pagination total={projects?.total || 0} />}
      </div>
    </div>
  );
}
