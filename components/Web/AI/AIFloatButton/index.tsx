'use client';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useClickAway, useRequest } from 'ahooks';
import Options from './Options';
import AIChatbotModal from '../AIChatbotModal/ChatModal';
import webApi from '@/service';
import ReportBugModal, { ReportBugModalInstance } from '../ReportBugModal';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useDrag } from 'react-dnd';
import type { XYCoord } from 'react-dnd';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { useInteractions, useFloating, useClick, offset, flip } from '@floating-ui/react';
import { useUserStore } from '@/store/zustand/userStore';

interface AIFloatButtonProps {
  children: ReactNode;
  pageType?: 'learn' | 'other';
}

export interface DragItem {
  type: string;
  id: string;
  top: number;
  left: number;
}

const AIFloatButton: FC<AIFloatButtonProps> = ({ children, pageType = 'other' }) => {
  const [optionOpen, setOptionOpen] = useState(false);
  const reportBugRef = useRef<ReportBugModalInstance>(null);
  const { data: discordInfo, refresh: refreshDiscordInfo } = useRequest(() => {
    return webApi.userApi.getDiscordInfo();
  });

  const { open: aiModalOpen } = useGlobalStore((state) => state.helperParams);
  const userInfo = useUserStore((state) => state.userInfo);

  const ref = useRef<HTMLDivElement>();

  useClickAway(() => {
    setOptionOpen(false);
  }, ref);

  const [position, setPosition] = useState<{ top: number; left: number; title: string }>({
    top: -48,
    left: -48,
    title: 'Drag me around'
  });

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setPosition(
        update(position, {
          $merge: { left, top }
        })
      );
    },
    [position, setPosition]
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'ai box',
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        const windowWidth = document.body.clientWidth;
        const windowHeight = document.body.clientHeight;
        const maxTop = windowHeight - 48 - 8;
        const minTop = 64;
        const minLeft = 0;
        const maxLeft = windowWidth - 48;
        if (top >= maxTop) top = maxTop;
        if (top <= minTop) top = minTop;
        if (left >= maxLeft) left = maxLeft;
        if (left <= minLeft) left = minLeft;

        left = maxLeft - left < left ? maxLeft : minLeft;

        moveBox(item.id, left, top);
        return undefined;
      }
    }),
    [moveBox]
  );

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'ai box',
      item: { left: position.left, top: position.top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      }),
      canDrag: !optionOpen && !aiModalOpen
    }),
    [position, optionOpen, aiModalOpen]
  );

  const resize = () => {
    const windowWidth = document.body.clientWidth;
    const windowHeight = document.body.clientHeight;
    const maxTop = windowHeight - 48 - 8;
    const minTop = 64;
    const minLeft = 0;
    const maxLeft = windowWidth - 48;
    let { left = windowWidth - 48, top = windowHeight - 188 } = ref.current?.getBoundingClientRect() || {};
    if (top >= maxTop) top = maxTop;
    if (top <= minTop) top = minTop;
    if (left >= maxLeft) left = maxLeft;
    if (left <= minLeft) left = minLeft;
    left = maxLeft - left < left ? maxLeft : minLeft;
    // top = maxTop - top < top ? maxTop : minTop;
    setPosition({
      ...position,
      left,
      top
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowWidth = document.body.clientWidth;
      const windowHeight = document.body.clientHeight;

      setPosition({
        ...position,
        top: windowHeight - 388,
        left: windowWidth - 48
      });
      window.addEventListener('resize', resize);

      return () => window.removeEventListener('resize', resize);
    }
  }, []);

  const { refs, floatingStyles, context } = useFloating({
    open: optionOpen,
    onOpenChange: setOptionOpen,
    placement: 'left-end',
    middleware: [offset(16), flip()]
  });

  const click = useClick(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click]);

  return (
    <div
      className="relative flex h-full w-full flex-col"
      ref={(el) => {
        drop(el);
      }}
    >
      {children}
      {userInfo && (
        <>
          {!isDragging && (
            <div
              ref={(el) => {
                drag(el);
                ref.current = el as HTMLDivElement;
              }}
              className="absolute z-[1100] h-12 w-12 cursor-pointer rounded-[8px] bg-[#d7c7fa] bg-[url('/images/icons/helper_bg_icon.svg')]"
              style={{ top: position.top, left: position.left }}
            >
              <span
                className="inline-block h-full w-full"
                ref={refs.setReference}
                {...getReferenceProps()}
                onClick={() => {
                  setOptionOpen(true);
                }}
              ></span>
              {optionOpen && (
                <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles}>
                  <Options
                    changeOpen={(open) => {
                      setOptionOpen(open);
                    }}
                    reportBugOption={{ reportBugRef: reportBugRef.current, discordInfo }}
                  />
                </div>
              )}
              {aiModalOpen && (
                <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles}>
                  <AIChatbotModal pageType={pageType} />
                </div>
              )}
              <ReportBugModal refreshDiscordInfo={refreshDiscordInfo} ref={reportBugRef} />
            </div>
          )}
          {isDragging && <div ref={drag}></div>}
        </>
      )}
    </div>
  );
};

export default AIFloatButton;
