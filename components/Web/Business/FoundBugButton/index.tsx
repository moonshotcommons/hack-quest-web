'use client';
import Button from '@/components/Common/Button';
import { FC, useRef } from 'react';
import BugFeedbackModal, { BugFeedbackModalRef } from './BugFeedbackModal';
import ConnectDiscordModal, {
  ConnectDiscordModalRef
} from './ConnectDiscordModal';
import { useRequest } from 'ahooks';
import webApi from '@/service';

interface FoundBugButtonProps {
  params?: Record<string, any>;
}

const FoundBugButton: FC<FoundBugButtonProps> = ({ params }) => {
  const bugFeedbackModalRef = useRef<BugFeedbackModalRef>(null);
  const connectDiscordModalRef = useRef<ConnectDiscordModalRef>(null);

  const { data: discordInfo, refresh: refreshDiscordInfo } = useRequest(() => {
    return webApi.userApi.getDiscordInfo();
  });

  return (
    <>
      <Button
        icon={BugIcon}
        className="rounded-[10px] bg-neutral-medium-gray px-[16px] py-[14px] text-neutral-white"
        onClick={() => {
          if (!discordInfo?.isConnect) {
            connectDiscordModalRef.current?.open();
          } else {
            bugFeedbackModalRef.current?.onCommit(params);
          }
        }}
      >
        <span className="body-m ml-[0.5]">Found a bug?</span>
      </Button>
      <ConnectDiscordModal
        ref={connectDiscordModalRef}
        onConnectLater={() => {
          bugFeedbackModalRef.current?.onCommit(params);
          refreshDiscordInfo();
        }}
        onConnectSuccess={() => {
          bugFeedbackModalRef.current?.onCommit(params);
        }}
      />
      <BugFeedbackModal ref={bugFeedbackModalRef} />
    </>
  );
};

export default FoundBugButton;

const BugIcon = (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11.5" cy="11.5" r="11.5" fill="white" />
    <circle cx="11.5001" cy="5.36634" r="1.53333" fill="#8C8C8C" />
    <rect
      x="9.9668"
      y="8.43359"
      width="3.06667"
      height="10.35"
      rx="1.53333"
      fill="#8C8C8C"
    />
  </svg>
);
