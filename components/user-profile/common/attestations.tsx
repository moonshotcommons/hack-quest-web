import Link from 'next/link';
import { ChevronIcon } from '@/components/ui/icons/chevron';
import { Attestation } from '@/service/webApi/user/type';
import { create } from 'zustand';

type Store = {
  activeIds: string[];
  setActiveIds: (id: string) => void;
};

export const useAttestation = create<Store>((set, get) => ({
  activeIds: [],
  setActiveIds: (id) =>
    set({
      activeIds: get().activeIds.includes(id) ? get().activeIds.filter((i) => i !== id) : get().activeIds.concat(id)
    })
}));

export function Attestations({ attestations = [] }: { attestations?: Attestation[] }) {
  const { activeIds, setActiveIds } = useAttestation();
  const sourceId = attestations[0]?.sourceId;
  const maxVisible = 3;
  const uniqueAttesters = attestations.reduce((acc, current) => {
    const x = acc.find((item) => item.creatorId === current.creatorId);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, [] as Attestation[]);
  const displayAttesters = uniqueAttesters.slice(0, maxVisible);
  const remainingCount = uniqueAttesters.length - maxVisible;

  if (displayAttesters.length === 0) {
    return null;
  }

  return (
    <button
      type="button"
      data-active={activeIds.includes(sourceId)}
      className="group flex items-center gap-2 self-start rounded-[8px] border border-transparent bg-neutral-off-white p-2 outline-none data-[active=true]:border-yellow-primary data-[active=true]:bg-yellow-extra-light"
      onClick={() => setActiveIds(sourceId)}
    >
      <ChevronIcon className="h-4 w-4 text-neutral-medium-gray group-data-[active=true]:text-yellow-dark" />
      <div className="text-left text-xs font-bold text-neutral-rich-gray">
        Attested by{' '}
        {displayAttesters.map((attester, index) => (
          <span key={attester.id}>
            <Link href={`/user/${attester.creator.username}`} className="underline" target="_blank">
              {attester.creator.nickname || attester.creator.username}
            </Link>
            {index < displayAttesters.length - 1 && ', '}
          </span>
        ))}
        {remainingCount > 0 && ` and other ${remainingCount}`}
      </div>
    </button>
  );
}
