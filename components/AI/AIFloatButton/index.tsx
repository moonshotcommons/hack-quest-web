'use client';
import { FC, ReactNode, useRef, useState } from 'react';
import { useMotionValue } from 'framer-motion';
import { useClickAway, useRequest } from 'ahooks';
import Options from './Options';
import AIChatbotModal from '../AIChatbotModal/ChatModal';
import webApi from '@/service';
import ReportBugModal, { ReportBugModalInstance } from '../ReportBugModal';

interface AIFloatButtonProps {
  children: ReactNode;
  pageType?: 'learn' | 'other';
}

const AIFloatButton: FC<AIFloatButtonProps> = ({ children, pageType = 'other' }) => {
  const constraintsRef = useRef(null);
  const y = useMotionValue(0);
  const [pos, setPos] = useState([0, 0]);

  const [open, setOpen] = useState(false);
  const reportBugRef = useRef<ReportBugModalInstance>(null);
  const { data: discordInfo, refresh: refreshDiscordInfo } = useRequest(() => {
    return webApi.userApi.getDiscordInfo();
  });

  // const { run: handleMouseEnter } = useDebounceFn(
  //   () => {
  //     handleMouseLeave.cancel();
  //     setOpen(true);
  //   },
  //   { wait: 100 }
  // );

  // const { run: handleMouseLeave } = useDebounceFn(
  //   () => {
  //     handleMouseEnter.cancel();
  //     setOpen(false);
  //   },
  //   { wait: 100 }
  // );

  const ref = useRef<HTMLDivElement>(null);

  useClickAway(() => {
    setOpen(false);
  }, ref);

  return (
    <div className="relative h-full w-full">
      {children}
      <div
        ref={ref}
        className="absolute bottom-[120px] right-0 z-[9999] h-12 w-12 cursor-pointer bg-[url('/images/icons/helper_bg_icon.svg')]"
        // draggable
        // onDragStart={(e) => {
        //   console.log(e.movementX, e.movementY);
        //   setOpen(false);
        // }}
        // onDrag={(e) => {
        //   console.log(e.pageY, e.movementY);
        // }}
        // onDragEnd={() => {}}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        {/* <div className="absolute bottom-[120px] right-0 z-[9999] h-12 w-12 bg-[url('/images/icons/helper_bg_icon.svg')]"></div> */}
        <span
          className="inline-block h-full w-full"
          onClick={() => {
            setOpen(true);
          }}
        ></span>
        {open && (
          <Options
            changeOpen={(open) => {
              setOpen(open);
            }}
            reportBugOption={{ reportBugRef: reportBugRef.current, discordInfo }}
          />
        )}
        <AIChatbotModal />
        <ReportBugModal refreshDiscordInfo={refreshDiscordInfo} ref={reportBugRef} />
      </div>
    </div>
  );
};

export default AIFloatButton;
