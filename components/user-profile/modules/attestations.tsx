import * as React from 'react';
import Link from 'next/link';
import { useProfile } from './profile-provider';
import { ChevronIcon } from '@/components/ui/icons/chevron';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/helper/utils';
import { useUserStore } from '@/store/zustand/userStore';
import { useAttestation } from '../common/attestations';
import { ChevronDownIcon } from 'lucide-react';

export function Attestations() {
  const [isExpanded, setIsExpanded] = React.useState(new Map());
  const [isTruncated, setIsTruncated] = React.useState(new Map());
  const commentRefs = React.useRef(new Map());
  const { userInfo } = useUserStore();
  const { profile } = useProfile();
  const { activeIds } = useAttestation();

  const { attestations } = profile || {};

  React.useEffect(() => {
    attestations?.forEach((attest) => {
      const ref = commentRefs.current.get(attest?.id);
      if (ref) {
        const isOverflowing = ref.scrollHeight > ref.clientHeight;
        if (isOverflowing) {
          setIsTruncated((prevState) => new Map(prevState).set(attest?.id, true));
        }
      }
    });
  }, [attestations]);

  function handleToggle(id?: string) {
    setIsExpanded((prevState) => new Map(prevState).set(id, !isExpanded.get(id)));
  }

  return (
    <div className="flex w-full flex-col gap-0.5">
      {attestations?.map((attest) => (
        <div
          key={attest?.id}
          className={cn('flex flex-col gap-3 rounded-2xl p-4 opacity-30', {
            'bg-yellow-extra-light': userInfo?.id === attest?.creatorId,
            'opacity-100': activeIds.includes(attest?.sourceId!)
          })}
        >
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <Link href={`/user/${attest?.creator.username}`} target="_blank">
                <AvatarImage src={attest?.creator.avatar} />
              </Link>
              <AvatarFallback />
            </Avatar>
            <Link
              href={`/user/${attest?.creator.username}`}
              target="_blank"
              className="text-sm font-bold hover:underline"
            >
              {attest?.creator.nickname}
            </Link>
            {attest?.attest ? (
              <ChevronIcon className="h-5 w-5 text-status-success-dark" />
            ) : (
              <ChevronIcon className="h-5 w-5 rotate-180 text-status-error-dark" />
            )}
          </div>
          {attest?.comment && (
            <p
              ref={(el) => el && commentRefs.current.set(attest?.id, el)}
              className="line-clamp-3 text-sm"
              style={{
                WebkitLineClamp: isExpanded.get(attest?.id) ? 'initial' : 3,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {attest?.comment}
            </p>
          )}
          {isTruncated.get(attest?.id) && (
            <button
              className="inline-flex items-center self-start text-sm outline-none"
              onClick={() => handleToggle(attest?.id)}
            >
              {isExpanded.get(attest?.id) ? 'View less' : 'View more'}
              <ChevronDownIcon className="h-4 w-4" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
