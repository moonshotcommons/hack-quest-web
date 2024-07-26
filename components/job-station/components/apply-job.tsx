'use client';

import * as React from 'react';
import Link from 'next/link';
import { CheckIcon, CopyIcon, LinkIcon, MailIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { TelegramIcon } from '@/components/ui/icons/telegram';
import { WeChatIcon } from '@/components/ui/icons/wechat';
import { useToggle } from '@/hooks/utils/use-toggle';

export default function ApplyJob({ contact }: { contact: Record<string, string> }) {
  const [open, onOpenChange] = useToggle(false);
  const [copied, setCopied] = React.useState(false);

  const telegram = React.useMemo(() => {
    if (contact?.telegram) {
      let username: string;
      const pattern = /^https?:\/\/t\.me\/([^\/\s]+)\/?$/;
      const match = contact.telegram.match(pattern);
      if (match) {
        username = match[1];
      } else {
        username = contact.telegram;
      }
      const link = `https://t.me/${username}`;
      return {
        link,
        username
      };
    }
  }, [contact]);

  function onClick(event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>, url?: string) {
    event.preventDefault();
    event.stopPropagation();

    if (url) {
      window.open(url, '_blank');
    }
  }

  function onCopyClick(event: React.MouseEvent<HTMLButtonElement>, value: string) {
    event.preventDefault();
    event.stopPropagation();
    setCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="w-[165px]"
          data-prevent-nprogress={true}
          onClick={(e) => {
            onClick(e);
            onOpenChange(true);
          }}
        >
          Apply
        </Button>
      </DialogTrigger>
      <DialogContent stopPropagation className="block w-[640px] max-w-[640px] rounded-3xl p-8">
        <h2 className="font-next-book-bold text-[22px] font-bold">Apply to this Role</h2>
        <div className="mt-6 flex w-full flex-col space-y-6">
          {contact.wechat && (
            <div className="flex items-center gap-3">
              <div className="flex min-w-32 items-center gap-3">
                <WeChatIcon className="h-6 w-6" />
                <span className="font-bold text-neutral-off-black">WeChat</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-neutral-black">{contact.wechat}</span>
                {copied ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <button className="outline-none" onClick={(e) => onCopyClick(e, contact.wechat)}>
                    <CopyIcon className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          )}
          {contact.link && (
            <div className="flex items-center gap-3">
              <div className="flex min-w-32 items-center gap-3">
                <LinkIcon className="h-6 w-6" />
                <span className="font-bold text-neutral-off-black">Link</span>
              </div>
              <Link
                href={contact.link}
                target="_blank"
                onClick={(e) => onClick(e, contact.link)}
                className="truncate text-neutral-black underline underline-offset-2"
              >
                {contact.link}
              </Link>
            </div>
          )}
          {contact.email && (
            <div className="flex items-center gap-3">
              <div className="flex min-w-32 items-center gap-3">
                <MailIcon className="h-6 w-6" />
                <span className="font-bold text-neutral-off-black">Email</span>
              </div>
              <Link
                href={`mailto:${contact.email}`}
                className="truncate text-neutral-black underline underline-offset-2"
              >
                {contact.email}
              </Link>
            </div>
          )}
          {contact.telegram && (
            <div className="flex items-center gap-3">
              <div className="flex min-w-32 items-center gap-3">
                <TelegramIcon className="h-6 w-6" />
                <span className="font-bold text-neutral-off-black">Telegram</span>
              </div>
              <Link
                href={telegram?.link || '#'}
                target="_blank"
                onClick={(e) => onClick(e, telegram?.link)}
                className="truncate text-neutral-black underline underline-offset-2"
              >
                {telegram?.username}
              </Link>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
