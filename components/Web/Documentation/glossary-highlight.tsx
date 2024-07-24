import * as React from 'react';
import Link from 'next/link';
import { LoaderIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import webApi from '@/service';

export function GlossaryHighlight({ linkId, text }: { linkId: string; text?: string }) {
  const [open, setOpen] = React.useState(false);

  const query = useQuery({
    queryKey: ['glossaryDetail', linkId],
    enabled: open && !!linkId,
    staleTime: Infinity,
    queryFn: () => webApi.resourceStationApi.getGlossaryDetail(linkId)
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          className="cursor-pointer bg-yellow-light px-1 text-sm font-bold text-neutral-black"
          onClick={() => setOpen(!open)}
        >
          {text}
        </span>
      </PopoverTrigger>
      <PopoverContent className="min-h-[200px]">
        {query.isLoading ? (
          <div className="flex h-[200px] w-full items-center justify-center">
            <LoaderIcon className="h-4 w-4 animate-spin" />
          </div>
        ) : query.error ? (
          <div className="flex h-[200px] w-full items-center justify-center">
            <p className="body-s">Something went wrong</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-2">
              {query.data?.tracks?.map((track) => (
                <span
                  className="caption-12pt rounded-full border border-neutral-rich-gray px-3 py-1 text-neutral-rich-gray"
                  key={track}
                >
                  {track}
                </span>
              ))}
            </div>
            <h1 className="body-xl-bold mt-2 text-neutral-off-black">{query.data?.title}</h1>
            <p className="body-s mb-2 mt-1 text-neutral-rich-gray">{query.data?.description}</p>
            <Link
              href={`/glossary/${query.data?.alias}`}
              target="_blank"
              className="body-s capitalize text-neutral-black underline transition-colors hover:text-neutral-rich-gray"
            >
              Click to view more
            </Link>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
