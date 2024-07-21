import * as React from 'react';
import Image from 'next/image';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { LinkedInIcon } from '@/components/ui/icons/linkedin';
import { LocationIcon } from '@/components/ui/icons/location';
import { TelegramIcon } from '@/components/ui/icons/telegram';
import { TwitterIcon } from '@/components/ui/icons/twitter';
import { WeChatIcon } from '@/components/ui/icons/wechat';
import { Skeleton } from '@/components/shared/skeleton';
import { ShareProfile } from '../modals/share-profile-modal';
import { EditProfile } from '../modals/edit-profile';
import { cn, copyText } from '@/helper/utils';
import { useProfile } from './profile-provider';
import { GithubIcon } from '@/components/ui/icons/github';
import { useToggle } from '@/hooks/utils/use-toggle';
import { CopyIcon } from 'lucide-react';

export function BasicInfo() {
  const { isLoading, profile } = useProfile();
  const [open, toggle] = useToggle(false);
  return (
    <React.Fragment>
      <Skeleton loading={isLoading}>
        <div className="relative h-20 w-full sm:h-[210px]">
          {!isLoading && (
            <Image
              src={profile?.backgroundImage || '/images/user/default-bg.png'}
              alt="background image"
              fill
              className="object-cover"
            />
          )}
        </div>
      </Skeleton>
      <div className="relative mx-auto max-w-5xl bg-neutral-white px-6 pb-4 sm:px-0 sm:pb-0">
        <div className="absolute -top-6 left-5 h-20 w-20 rounded-full border-4 border-neutral-white bg-neutral-white sm:-top-8 sm:left-0 sm:h-40 sm:w-40">
          <Skeleton loading={isLoading} className="rounded-full">
            <div className="group relative h-full w-full">
              {profile?.user?.avatar && <Image src={profile.user.avatar} alt="avatar" fill className="rounded-full" />}
            </div>
          </Skeleton>
        </div>
        <div className="flex flex-col gap-3 pt-16 sm:ml-[192px] sm:gap-4 sm:pt-10">
          <Skeleton loading={isLoading} className="h-8 w-20 rounded">
            <h1 className="text-lg font-bold text-neutral-off-black sm:text-2xl">{profile?.user?.nickname}</h1>
          </Skeleton>
          <Skeleton loading={isLoading} className="h-6 w-40 rounded">
            <p className="text-sm text-neutral-medium-gray sm:text-base">
              one line intro colorless green idea sleeps furiously
            </p>
          </Skeleton>
          <Skeleton loading={isLoading} className="h-6 w-32 rounded">
            {profile?.location && (
              <div className="flex items-center gap-1 text-sm text-neutral-medium-gray sm:text-base">
                <LocationIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                <span>{profile?.location}</span>
              </div>
            )}
          </Skeleton>
          {isLoading ? (
            <Skeleton loading={isLoading} className="h-6 w-52 rounded" />
          ) : (
            <div className="flex items-center gap-4">
              {(profile?.isMe || profile?.personalLinks.twitter) && (
                <TwitterIcon
                  className={cn('h-5 w-5 cursor-pointer sm:h-6 sm:w-6', {
                    'opacity-30': !profile?.personalLinks.twitter
                  })}
                  onClick={() => {
                    if (!profile?.personalLinks.twitter) {
                      toggle(true);
                    } else {
                      window.open(profile?.personalLinks.twitter, '_blank');
                    }
                  }}
                />
              )}
              {(profile?.isMe || profile?.personalLinks.linkedIn) && (
                <LinkedInIcon
                  className={cn('h-5 w-5 cursor-pointer sm:h-6 sm:w-6', {
                    'opacity-30': !profile?.personalLinks.linkedIn
                  })}
                  onClick={() => {
                    if (!profile?.personalLinks.linkedIn) {
                      toggle(true);
                    } else {
                      window.open(profile?.personalLinks.linkedIn, '_blank');
                    }
                  }}
                />
              )}
              {(profile?.isMe || profile?.personalLinks.telegram) && (
                <TelegramIcon
                  className={cn('h-5 w-5 cursor-pointer sm:h-6 sm:w-6', {
                    'opacity-30': !profile?.personalLinks.telegram
                  })}
                  onClick={() => {
                    if (!profile?.personalLinks.telegram) {
                      toggle(true);
                    } else {
                      window.open(profile?.personalLinks.telegram, '_blank');
                    }
                  }}
                />
              )}
              {(profile?.isMe || profile?.personalLinks.github) && (
                <GithubIcon
                  className={cn('h-5 w-5 cursor-pointer sm:h-6 sm:w-6', {
                    'opacity-30': !profile?.personalLinks.github
                  })}
                  onClick={() => {
                    if (!profile?.personalLinks.github) {
                      toggle(true);
                    } else {
                      window.open(profile?.personalLinks.github, '_blank');
                    }
                  }}
                />
              )}
              {(profile?.isMe || profile?.personalLinks.wechat) &&
                (profile?.personalLinks.wechat ? (
                  <HoverCard>
                    <HoverCardTrigger>
                      <WeChatIcon className="h-5 w-5 cursor-pointer sm:h-6 sm:w-6" />
                    </HoverCardTrigger>
                    <HoverCardContent className="sm:p-5">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <WeChatIcon className="h-5 w-5" />
                          <span className="text-sm font-bold">Wechat ID</span>
                        </div>
                        <div className="flex items-center justify-between rounded-full bg-neutral-off-white px-4 py-2">
                          <span className="text-sm">{profile?.personalLinks.wechat}</span>
                          <button className="outline-none" onClick={() => copyText(profile?.personalLinks.wechat)}>
                            <CopyIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ) : (
                  <WeChatIcon
                    className="h-5 w-5 cursor-pointer opacity-30 sm:h-6 sm:w-6"
                    onClick={() => toggle(true)}
                  />
                ))}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2.5">
            {profile?.techStack?.map((tech) => (
              <span key={tech} className="rounded-[8px] bg-neutral-off-white px-3.5 py-[3px] text-sm sm:text-base">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute right-5 top-6 flex items-center gap-4 sm:right-0 sm:top-10">
          {profile?.isMe && <EditProfile open={open} toggle={toggle} />}
          <ShareProfile />
        </div>
      </div>
    </React.Fragment>
  );
}
