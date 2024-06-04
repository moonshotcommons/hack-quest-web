'use client';

import * as React from 'react';
import { XIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import Modal from '@/components/Common/Modal';
import { createUrl } from '@/helper/utils';

export function MobileFilters({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = new URLSearchParams(searchParams.toString());

  const selectedEcosystemsParams = currentParams.getAll('ecosystem');
  const selectedTracksParams = currentParams.getAll('tracks');

  const [selectedEcosystems, setSelectedEcosystems] = React.useState(selectedEcosystemsParams);
  const [selectedTracks, setSelectedTracks] = React.useState(selectedTracksParams);

  function toggleSelection(option: string, type: string) {
    let newSelection;
    const currentParam = type === 'ecosystem' ? 'ecosystem' : 'tracks';

    if (type === 'ecosystem') {
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
          {['Chain-Ignostic', 'DeFi', 'Solana', 'Mantle', 'Ethereum', 'Arbitrum'].map((ecosystem) => (
            <div key={ecosystem} className="flex items-center gap-2.5">
              <Checkbox
                checked={selectedEcosystems.includes(ecosystem)}
                onCheckedChange={() => toggleSelection(ecosystem, 'ecosystem')}
              />
              <span className="body-s text-neutral-off-black">{ecosystem}</span>
            </div>
          ))}
        </div>
        <h2 className="body-m-bold mt-8 text-neutral-off-black">Tracks</h2>
        <div className="mt-4 flex flex-col gap-4">
          {['DeFi', 'DAO', 'DePIN', 'AI', 'NFT'].map((track) => (
            <div key={track} className="flex items-center gap-2.5">
              <Checkbox
                checked={selectedTracks.includes(track)}
                onCheckedChange={() => toggleSelection(track, 'track')}
              />
              <span className="body-s text-neutral-off-black">{track}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
