import Modal from '@/components/Common/Modal';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ChangeState, ScrollContainer } from '@/components/Common/ScrollContainer';

interface InfoModalProp {
  open: boolean;
  curInfo: any;
  renderItem: () => ReactNode;
}

const InfoModal: React.FC<InfoModalProp> = ({ open, curInfo, renderItem }) => {
  const [scrollContainerState, setScrollContainerState] = useState<ChangeState>();
  const [isInit, setIsInit] = useState(true);
  const scrollContainerRef = useRef<{ changeTranslateX: (x: number) => void }>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isInit && curInfo?.id) {
      scrollContainerRef?.current?.changeTranslateX(-908 * curInfo.index);
      setTimeout(() => {
        setShow(true);
      }, 250);
    }
  }, [curInfo, scrollContainerRef, isInit]);

  useEffect(() => {
    if (!open) {
      setIsInit(true);
      setShow(false);
    }
  }, [open]);
  return (
    <Modal open={open} onClose={() => {}}>
      <div className={`relative flex w-[1036px] justify-center ${show ? 'opacity-[1]' : 'opacity-[0]'}`}>
        <div
          className={`flex-center absolute left-[0] top-[50%] h-[54px] w-[54px] translate-y-[-50%] rounded-[50%] bg-neutral-light-gray text-neutral-medium-gray ${scrollContainerState?.leftArrowVisible ? 'cursor-pointer hover:bg-neutral-white hover:text-neutral-black' : 'cursor-not-allowed'}`}
          onClick={() => {
            if (!scrollContainerState?.leftArrowVisible) return;
            scrollContainerState?.handleArrowClick?.('left');
          }}
        >
          <ChevronLeft size={40} />
        </div>
        <div
          className={`flex-center absolute right-[0] top-[50%] h-[54px] w-[54px] translate-y-[-50%] rounded-[50%] bg-neutral-light-gray  text-neutral-medium-gray ${scrollContainerState?.rightArrowVisible ? 'cursor-pointer hover:bg-neutral-white hover:text-neutral-black' : 'cursor-not-allowed'}`}
          onClick={() => {
            if (!scrollContainerState?.rightArrowVisible) return;
            scrollContainerState?.handleArrowClick?.('right');
          }}
        >
          <ChevronRight size={40} />
        </div>
        {open && (
          <div className="w-[888px]">
            <ScrollContainer
              ref={scrollContainerRef}
              width={888}
              gap={20}
              onChange={(state: any) => {
                setScrollContainerState(state);
                if (isInit) setIsInit(false);
              }}
            >
              <div className="flex items-center gap-[20px]">{renderItem()}</div>
            </ScrollContainer>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default InfoModal;
