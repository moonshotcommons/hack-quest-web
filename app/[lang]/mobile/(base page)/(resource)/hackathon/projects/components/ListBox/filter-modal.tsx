'use client';

import * as React from 'react';
import { XIcon } from 'lucide-react';
import { useQueries } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import webApi from '@/service';
import Modal from '@/components/Common/Modal';
import Checkbox from '@/components/Common/Checkbox';

export function FilterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const selectedPrizeTracks = currentParams.getAll('prizeTrack');
  const selectedHackathonTracks = currentParams.getAll('track');

  const [selectedPrize, setSelectedPrize] = React.useState(selectedPrizeTracks);
  const [selectedHackathon, setSelectedHackathon] = React.useState(selectedHackathonTracks);

  const [{ data: tracks }, { data: prizeTracks }] = useQueries({
    queries: [
      {
        enabled: open,
        queryKey: ['tracks'],
        queryFn: () => webApi.resourceStationApi.getProjectTracksDict()
      },
      {
        enabled: open,
        queryKey: ['prizeTracks'],
        queryFn: () => webApi.resourceStationApi.fetchHackathonPrizeTracks()
      }
    ]
  });

  function toggleSelection(option: string, type: string) {
    let newSelection;

    if (type === 'prize') {
      newSelection = selectedPrize.includes(option)
        ? selectedPrize.filter((item) => item !== option)
        : [...selectedPrize, option];
      setSelectedPrize(newSelection);
    } else {
      newSelection = selectedHackathon.includes(option)
        ? selectedHackathon.filter((item) => item !== option)
        : [...selectedHackathon, option];
      setSelectedHackathon(newSelection);
    }

    if (newSelection.length > 0) {
      currentParams.delete(type === 'prize' ? 'prizeTrack' : 'track');
      newSelection.forEach((value) => currentParams.append(type === 'prize' ? 'prizeTrack' : 'track', value));
    } else {
      currentParams.delete(type === 'prize' ? 'prizeTrack' : 'track');
    }

    router.push(`${pathname}?${currentParams.toString()}`);
  }

  return (
    <Modal open={open} onClose={() => {}} className="w-full" rootClassName="px-11">
      <div className="relative max-h-96 w-full overflow-auto rounded-2xl bg-neutral-white px-5 py-8">
        <button className="absolute right-4 top-4 outline-none" onClick={onClose}>
          <XIcon size={24} />
        </button>
        <h2 className="body-m-bold text-neutral-off-black">Prize Track</h2>
        <div className="mt-4 flex flex-col gap-4">
          {prizeTracks?.map((track) => (
            <div key={track} className="flex items-center gap-2.5">
              <Checkbox checked={selectedPrize.includes(track)} onChange={() => toggleSelection(track, 'prize')} />
              <span className="body-s text-neutral-off-black">{track}</span>
            </div>
          ))}
        </div>
        <h2 className="body-m-bold mt-8 text-neutral-off-black">Hackathon Track</h2>
        <div className="mt-4 flex flex-col gap-4">
          {tracks?.map((track) => (
            <div key={track} className="flex items-center gap-2.5">
              <Checkbox
                checked={selectedHackathon.includes(track)}
                onChange={() => toggleSelection(track, 'hackathon')}
              />
              <span className="body-s text-neutral-off-black">{track}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
