'use client';

import * as React from 'react';
import { XIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import Modal from '@/components/Common/Modal';
import { createUrl } from '@/helper/utils';
import { useIdeas } from '../submit/store';

export function MobileFilters({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const { tracks, ecosystems } = useIdeas();

  const selectedEcosystemsParams = currentParams.getAll('ecosystemId');
  const selectedTracksParams = currentParams.getAll('tracks');

  const [selectedEcosystems, setSelectedEcosystems] = React.useState(selectedEcosystemsParams);
  const [selectedTracks, setSelectedTracks] = React.useState(selectedTracksParams);

  function toggleSelection(option: string, type: string) {
    let newSelection;
    const currentParam = type === 'ecosystemId' ? 'ecosystemId' : 'tracks';

    if (type === 'ecosystemId') {
      newSelection = selectedEcosystems.includes(option)
        ? selectedEcosystems.filter((item) => item !== option)
        : [...selectedEcosystems, option];
      setSelectedEcosystems(newSelection);
    } else {
      newSelection = selectedTracks.includes(option)
        ? selectedTracks.filter((item) => item !== option)
        : [...selectedTracks, option];
      setSelectedTracks(newSelection);
    }

    if (newSelection.length > 0) {
      currentParams.delete(currentParam);
      newSelection.forEach((value) => currentParams.append(currentParam, value));
    } else {
      currentParams.delete(currentParam);
    }

    const url = createUrl(pathname, currentParams);
    router.replace(url);
  }

  return (
    <Modal open={open} onClose={() => {}} className="w-full" rootClassName="px-11">
      <div className="relative max-h-96 w-full overflow-auto rounded-2xl bg-neutral-white px-5 py-4">
        <button className="absolute right-4 top-4 outline-none">
          <XIcon className="h-6 w-6" onClick={onClose} />
        </button>
        <h2 className="body-m-bold text-neutral-off-black">Ecosystem</h2>
        <div className="mt-4 flex flex-col gap-4">
          {ecosystems?.map((ecosystem) => (
            <div key={ecosystem.value} className="flex items-center gap-2.5">
              <Checkbox
                checked={selectedEcosystems.includes(ecosystem.value)}
                onCheckedChange={() => toggleSelection(ecosystem.value, 'ecosystemId')}
              />
              <span className="body-s text-neutral-off-black">{ecosystem.label}</span>
            </div>
          ))}
        </div>
        <h2 className="body-m-bold mt-8 text-neutral-off-black">Tracks</h2>
        <div className="mt-4 flex flex-col gap-4">
          {tracks?.map((track) => (
            <div key={track.value} className="flex items-center gap-2.5">
              <Checkbox
                checked={selectedTracks.includes(track.value)}
                onCheckedChange={() => toggleSelection(track.value, 'track')}
              />
              <span className="body-s text-neutral-off-black">{track.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
