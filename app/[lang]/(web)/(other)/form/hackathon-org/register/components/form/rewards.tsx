'use client';

import * as React from 'react';
import { PlusIcon } from '@/components/ui/icons/plus';
import { ActionButtons } from './action-buttons';
import { EditTrackModal } from '../edit-track-modal';
import { useToggle } from '@/hooks/utils/use-toggle';
import { Separator } from '@/components/ui/separator';
import { currencyWithoutSymbol } from '@/lib/currency';

function TrackPreview({ track }: { track: Record<string, any> }) {
  const isRankingMethod = track?.method === 'ranking';
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-light-gray px-8 pb-4 pt-8">
      <div className="flex h-full w-full items-center gap-5">
        <div className="flex flex-col items-center gap-3 px-3">
          <h3 className="headline-h3 text-neutral-black">{currencyWithoutSymbol(Number(track?.totalRewards))}</h3>
          <h5 className="body-m text-neutral-medium-gray">{track?.trackName}</h5>
        </div>
        <Separator orientation="vertical" className="min-h-[128px]" />
        {isRankingMethod && (
          <div className="flex flex-1 flex-col gap-1 self-start">
            {track?.rankings?.map((ranking: any, index: number) => (
              <div className="flex items-center justify-between" key={index}>
                <span className="body-m text-neutral-medium-gray">{ranking?.id} Place</span>
                <span className="body-l text-neutral-off-black">{currencyWithoutSymbol(Number(ranking?.reward))}</span>
              </div>
            ))}
          </div>
        )}
        {!isRankingMethod && (
          <div className="flex-1 self-start">
            <p className="body-m text-neutral-off-black">{track?.rule}</p>
          </div>
        )}
      </div>
      <div className="[&>button]:underline-m flex items-center gap-4 self-end [&>button]:text-neutral-rich-gray">
        <button>Edit</button>
        <button>Remove</button>
      </div>
    </div>
  );
}

export function Rewards() {
  const [open, toggle] = useToggle(false);
  const [tracks, setTracks] = React.useState<Record<string, any>[] | null>(null);

  function onRemoveTrack() {}

  function onAddTrack(track: Record<string, any>) {
    setTracks([...(tracks ?? []), track]);
  }

  return (
    <div className="flex flex-col gap-6">
      <label className="body-l text-neutral-off-black">Please add at least one prize track</label>
      {tracks && (
        <div className="flex flex-col gap-6">
          {tracks.map((track, index) => (
            <TrackPreview key={index} track={track} />
          ))}
        </div>
      )}
      <div className="h-20 w-full rounded-[8px] bg-neutral-off-white p-1">
        <button
          className="h-full w-full rounded-[8px] border border-dashed border-neutral-light-gray outline-none"
          onClick={toggle}
        >
          <span className="body-l flex items-center justify-center gap-1 text-neutral-medium-gray">
            <PlusIcon className="h-8 w-8" />
            <span>Add a new track</span>
          </span>
        </button>
      </div>
      <ActionButtons isValid onBack={() => {}} />
      <EditTrackModal open={open} onAddTrack={onAddTrack} onClose={() => toggle(false)} />
    </div>
  );
}
