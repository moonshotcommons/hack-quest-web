import * as React from 'react';
import Link from 'next/link';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { MobileModalHeader } from './mobile-modal-header';
import { Button } from '@/components/ui/button';
import { useProfile } from '../modules/profile-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronIcon } from '@/components/ui/icons/chevron';
import { useAttestation } from '../common/attestations';
import { ChevronDownIcon } from 'lucide-react';

export function AttestationsModal({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const { profile } = useProfile();
  const { activeIds, reset } = useAttestation();
  const commentRefs = React.useRef(new Map());
  const [isExpanded, setIsExpanded] = React.useState(new Map());
  const [isTruncated, setIsTruncated] = React.useState(new Map());

  const attestations = React.useMemo(
    () => profile?.attestations?.filter((a) => activeIds.includes(a.sourceId)),
    [profile, activeIds]
  );

  React.useEffect(() => {
    if (open) {
      attestations?.forEach((attest) => {
        const ref = commentRefs.current.get(attest?.id);
        if (ref) {
          const isOverflowing = ref.scrollHeight > ref.clientHeight;
          if (isOverflowing) {
            setIsTruncated((prevState) => new Map(prevState).set(attest?.id, true));
          }
        }
      });
    }
  }, [attestations, open]);

  function handleToggle(id?: string) {
    setIsExpanded((prevState) => new Map(prevState).set(id, !isExpanded.get(id)));
  }

  function handleClose() {
    onClose?.();
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="flex h-screen flex-col px-5 py-0 pb-8">
        <MobileModalHeader />
        <div className="no-scrollbar flex-1 overflow-y-auto">
          <h2 className="font-next-book-bold text-lg font-bold">Attestation</h2>
          <div className="mt-5 flex flex-col gap-5">
            {attestations?.map((attest) => (
              <div key={attest.id} className="flex flex-col gap-3 border-b pb-5 last:border-b-0">
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
        </div>
        <Button className="w-full">Add attestation</Button>
      </DialogContent>
    </Dialog>
  );
}
