'use client';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useClickAway } from 'ahooks';
import Options from './Options';
import AIChatbotModal from '../AIChatbotModal/ChatModal';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useDrag } from 'react-dnd';
import type { XYCoord } from 'react-dnd';
import { useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { useInteractions, useFloating, useClick, offset, flip } from '@floating-ui/react';
import { useUserStore } from '@/store/zustand/userStore';
import { useGetPageInfo } from '@/hooks/dom/useGetPageInfo';

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

  const { windowWidth, windowHeight } = useGetPageInfo();

  const [, drop] = useDrop(
    () => ({
      accept: 'ai box',
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        const maxTop = windowHeight - 48 - 8;
        const minTop = 64;
        const minLeft = 0;
        const maxLeft = windowWidth - 48;
        if (top >= maxTop) top = maxTop;
        if (top <= minTop) top = minTop;
        if (left >= maxLeft) left = maxLeft;
        if (left <= minLeft) left = minLeft;
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPosition({
        ...position,
        top: windowHeight - 188,
        left: windowWidth - 48
      });
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
                pageType={pageType}
              />
            </div>
          )}
          {aiModalOpen && (
            <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles}>
              <AIChatbotModal pageType={pageType} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIFloatButton;
