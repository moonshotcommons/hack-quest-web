'use client';

import * as React from 'react';
import Link from 'next/link';
import { CheckIcon, CopyIcon, LinkIcon, MailIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useToggle } from '@/hooks/utils/use-toggle';
import { useUserStore } from '@/store/zustand/userStore';

export default function ApplyJob({ contact }: { contact: Record<string, string> }) {
  const [open, onOpenChange] = useToggle(false);
  const [visible, setVisible] = useToggle(false);
  const { userInfo } = useUserStore();
  const [copied, setCopied] = React.useState(false);

  const telegram = React.useMemo(() => {
    if (contact?.telegram) {
      const telegram = contact?.telegram;
      if (/^https?:\/\//.test(telegram)) {
        return telegram;
      } else {
        return `https://t.me/${telegram}`;
      }
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
    <React.Fragment>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button
            className="w-[165px]"
            data-prevent-nprogress={true}
            onClick={(e) => {
              onClick(e);
              onOpenChange(true);
              // setVisible(true);
            }}
          >
            Apply
          </Button>
        </DialogTrigger>
        <DialogContent
          stopPropagation
          className="block w-[92.5%] rounded-2xl p-8 sm:w-[640px] sm:max-w-[640px] sm:rounded-3xl"
        >
          <h2 className="font-next-book-bold text-[22px] font-bold">Apply to this Role</h2>
          <div className="mt-6 flex w-full flex-col space-y-6">
            {contact.wechat && (
              <div className="flex items-center gap-3">
                <div className="min-w-32 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_11832_4851)">
                      <path
                        d="M16.4999 7.51604C16.9545 7.51604 17.3984 7.55382 17.8364 7.60782C17.0446 4.13036 13.3921 1.5 9.00014 1.5C4.02899 1.5 0 4.86737 0 9.02007C0 11.4143 1.34708 13.5384 3.4365 14.9129L2.24996 17.2923L5.4823 15.904C6.17544 16.1509 6.8957 16.3541 7.66501 16.4487C7.55988 15.9898 7.50014 15.5193 7.50014 15.0365C7.50014 10.8897 11.5364 7.51604 16.4999 7.51604ZM12.0002 4.88381C12.6213 4.88381 13.125 5.38911 13.125 6.01197C13.125 6.63503 12.6213 7.13997 12.0002 7.13997C11.3787 7.13997 10.8751 6.63503 10.8751 6.01197C10.8751 5.38906 11.3787 4.88381 12.0002 4.88381ZM6.00003 7.13997C5.37879 7.13997 4.87505 6.63503 4.87505 6.01197C4.87505 5.38911 5.37884 4.88381 6.00003 4.88381C6.62121 4.88381 7.12506 5.38911 7.12506 6.01197C7.125 6.63503 6.62116 7.13997 6.00003 7.13997Z"
                        fill="#3E3E3E"
                      />
                      <path
                        d="M24 15.0364C24 11.7137 20.6412 9.02007 16.4999 9.02007C12.3584 9.02007 9.00014 11.7137 9.00014 15.0364C9.00014 18.3588 12.3584 21.0525 16.4999 21.0525C17.181 21.0525 17.8288 20.9562 18.4574 20.8195L22.5 22.5564L21.1019 19.7546C22.854 18.6534 24 16.9601 24 15.0364ZM14.25 14.6603C13.6288 14.6603 13.125 14.1552 13.125 13.532C13.125 12.9092 13.6288 12.4042 14.25 12.4042C14.8714 12.4042 15.3749 12.9094 15.3749 13.532C15.3749 14.1553 14.8713 14.6603 14.25 14.6603ZM18.7499 14.6603C18.1284 14.6603 17.625 14.1552 17.625 13.532C17.625 12.9092 18.1284 12.4042 18.7499 12.4042C19.3714 12.4042 19.875 12.9094 19.875 13.532C19.875 14.1553 19.3714 14.6603 18.7499 14.6603Z"
                        fill="#3E3E3E"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_11832_4851">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
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
                <div className="min-w-32 flex items-center gap-3">
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
                <div className="min-w-32 flex items-center gap-3">
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
                <div className="min-w-32 flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clipPath="url(#clip0_11835_4889)">
                      <path
                        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                        fill="#3E3E3E"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.43201 11.8734C8.93026 10.3493 11.263 9.34452 12.4301 8.85905C15.7627 7.47294 16.4551 7.23216 16.9065 7.22421C17.0058 7.22246 17.2277 7.24706 17.3715 7.36372C17.4929 7.46223 17.5263 7.5953 17.5423 7.6887C17.5583 7.78209 17.5782 7.99485 17.5623 8.1611C17.3817 10.0586 16.6003 14.6633 16.2028 16.7885C16.0346 17.6877 15.7034 17.9892 15.3827 18.0188C14.6858 18.0829 14.1567 17.5582 13.4817 17.1158C12.4256 16.4235 11.8289 15.9925 10.8037 15.3169C9.61896 14.5362 10.387 14.107 11.0622 13.4058C11.2389 13.2222 14.3093 10.4295 14.3687 10.1761C14.3762 10.1444 14.3831 10.0263 14.3129 9.96397C14.2427 9.9016 14.1392 9.92293 14.0644 9.93989C13.9585 9.96393 12.2713 11.0791 9.00276 13.2855C8.52385 13.6143 8.09007 13.7745 7.70141 13.7662C7.27295 13.7569 6.44876 13.5239 5.83606 13.3247C5.08456 13.0804 4.48728 12.9513 4.53929 12.5364C4.56638 12.3203 4.86395 12.0993 5.43201 11.8734Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_11835_4889">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="font-bold text-neutral-off-black">Telegram</span>
                </div>
                <Link
                  href={telegram || '#'}
                  target="_blank"
                  onClick={(e) => onClick(e, telegram)}
                  className="truncate text-neutral-black underline underline-offset-2"
                >
                  {contact.telegram}
                </Link>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {/* <OnboardingModal open={visible} onClose={() => setVisible(false)} /> */}
    </React.Fragment>
  );
}
