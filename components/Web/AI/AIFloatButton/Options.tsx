import { FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/helper/utils';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';
import { ReportBugModalInstance } from '../ReportBugModal';
import { HelperType } from '@/service/webApi/helper/type';
interface OptionsProps {
  changeOpen: (open: boolean) => void;
  reportBugOption: {
    discordInfo?: { isConnect: boolean; thirdUser: any };
    reportBugRef: ReportBugModalInstance | null;
  };
}

const Options: FC<OptionsProps> = ({ changeOpen, reportBugOption }) => {
  const { updateHelperType } = useUpdateHelperParams();
  const pageId = useGlobalStore((state) => state.helperParams.pageId);
  const { reportBugRef, discordInfo } = reportBugOption;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 100, y: 60 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn('w-fit scale-0 rounded-[16px] bg-neutral-white p-2 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]')}
    >
      <div
        className="flex items-center gap-2 whitespace-nowrap rounded-[8px] px-2 py-3 hover:bg-neutral-off-white"
        onClick={() => {
          changeOpen(false);
          if (!discordInfo?.isConnect) {
            reportBugRef?.connectDiscordModalRef.current?.open();
          } else {
            reportBugRef?.bugFeedbackModalRef.current?.onCommit(pageId ? { lessonId: pageId } : undefined);
          }
        }}
      >
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19 11V3C19 1.34315 17.6569 0 16 0H4C2.34315 0 1 1.34315 1 3V11C0.447715 11 0 11.4477 0 12V13.27C0.00548443 14.7755 1.22454 15.9945 2.73 16H17.27C18.7755 15.9945 19.9945 14.7755 20 13.27V12C20 11.4477 19.5523 11 19 11ZM3 3C3 2.44772 3.44772 2 4 2H16C16.5523 2 17 2.44772 17 3V11H3V3ZM17.27 14C17.6732 14 18 13.6732 18 13.27V13H2V13.27C2 13.6732 2.32683 14 2.73 14H17.27Z"
            fill="#0B0B0B"
          />
        </svg>
        <span className="body-m">Report Bug</span>
      </div>
      <div
        className="flex gap-2 whitespace-nowrap rounded-[8px] px-2 py-3 hover:bg-neutral-off-white"
        onClick={() => {
          changeOpen(false);
          updateHelperType(HelperType.Chat);
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 2H19C20.6569 2 22 3.34315 22 5V15C22 16.6569 20.6569 18 19 18H18V21C17.998 21.4037 17.7534 21.7666 17.38 21.92C17.2613 21.976 17.1312 22.0034 17 22C16.7342 22.0015 16.4787 21.8972 16.29 21.71L12.59 18H5C3.34315 18 2 16.6569 2 15V5C2 3.34315 3.34315 2 5 2ZM19 16C19.5523 16 20 15.5523 20 15V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V15C4 15.5523 4.44772 16 5 16H13C13.2658 15.9985 13.5213 16.1028 13.71 16.29L16 18.59V17C16 16.4477 16.4477 16 17 16H19Z"
            fill="#0B0B0B"
          />
        </svg>
        <span>Ask AI</span>
      </div>
    </motion.div>
  );
};

export default Options;
