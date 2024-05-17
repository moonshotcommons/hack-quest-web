import Button from '@/components/Common/Button';
import { CopyIcon } from '@/components/Common/Icon/CopyV2';
import { GroupUsersIcon } from '@/components/Common/Icon/GroupUsers';
import { cn } from '@/helper/utils';
import { ChevronRightIcon } from 'lucide-react';

export function HackathonCard({
  title,
  tagName,
  tagClassName
}: {
  title: string;
  tagName: string;
  tagClassName?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-neutral-white p-5 shadow-[0px_0px_8px_0px_rgba(0,0,0,0.12)]">
      <div className="flex cursor-pointer items-center justify-between">
        <h1 className="font-next-book-bold text-lg font-bold text-neutral-off-black">{title}</h1>
        <ChevronRightIcon size={16} />
      </div>
      <span
        className={cn(
          'body-s-bold self-start rounded-[0.5rem] border-2 border-status-success-dark px-3 py-1 text-status-success-dark',
          tagClassName
        )}
      >
        {tagName}
      </span>
      <div className="flex flex-col">
        <h4 className="body-s text-neutral-medium-gray">Submission Close in</h4>
        <div className="flex items-center">
          <span className="body-m-bold rounded bg-neutral-off-white px-2 py-1 text-neutral-rich-gray">05</span>
          <span className="body-m pl-1 pr-3">D</span>
          <span className="body-m-bold rounded bg-neutral-off-white px-2 py-1 text-neutral-rich-gray">04</span>
          <span className="body-m pl-1 pr-3">H</span>
          <span className="body-m-bold rounded bg-neutral-off-white px-2 py-1 text-neutral-rich-gray">48</span>
          <span className="body-m pl-1 pr-3">M</span>
          <span className="body-m-bold rounded bg-neutral-off-white px-2 py-1 text-neutral-rich-gray">21</span>
          <span className="body-m pl-1 pr-3">S</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="body-s text-neutral-medium-gray">Submission Type</h4>
        <div className="flex items-center gap-2">
          <GroupUsersIcon />
          <span className="body-s text-neutral-off-black">Group Project</span>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="body-s text-neutral-medium-gray">Team Name</h4>
        <span className="body-s text-neutral-off-black">Spiderman</span>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="body-s text-neutral-medium-gray">Team Code</h4>
        <div className="body-s inline-flex items-center justify-between rounded-[0.5rem] bg-yellow-extra-light px-4 py-1.5">
          <span className="text-neutral-off-black">HX56QSDFDSC</span>
          <button className="outline-none">
            <CopyIcon className="h-5 w-5 text-neutral-medium-gray" />
          </button>
        </div>
      </div>
      <Button size="medium-x" type="primary" className="w-full uppercase">
        start submission
      </Button>
      <button className="underline-s text-neutral-rich-gray outline-none">Manage Team</button>
    </div>
  );
}
