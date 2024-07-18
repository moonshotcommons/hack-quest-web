import Modal from '@/components/Common/Modal';
import React, { useEffect, useRef, useState } from 'react';
import { FiDownload, FiUser, FiX } from 'react-icons/fi';
import Button from '@/components/Common/Button';
import { MdKeyboardArrowDown } from 'react-icons/md';
import BaseImage from '@/components/Common/BaseImage';
import TeamCard from '../TeamCard';
import { useHackathonAuditStore } from '@/store/zustand/hackathonAuditStore';
import { useShallow } from 'zustand/react/shallow';
import ProjectVideo from '../ProjectVideo';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import InfoContent from './InfoContent';
import { ChangeState, ScrollContainer } from '@/components/Common/ScrollContainer';

interface InfoProp {
  open: boolean;
  onClose: VoidFunction;
  list: any[];
  curInfo: any;
}

const Info: React.FC<InfoProp> = ({ open, onClose, list, curInfo }) => {
  const [scrollContainerState, setScrollContainerState] = useState<ChangeState>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setTimeout(() => {
      setScrollContainerState({
        ...scrollContainerState,
        translateX: -888 * curInfo.index
      } as ChangeState);
    }, 1000);
  }, [curInfo]);
  return (
    <Modal open={open} onClose={() => {}}>
      <div className="relative flex w-[1036px] justify-center">
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
        <div className="w-[888px] rounded-[16px]">
          <ScrollContainer ref={scrollContainerRef} gap={20} onChange={(state: any) => setScrollContainerState(state)}>
            <div className="flex gap-[20px]">
              {list?.map((info) => <InfoContent key={info.id} info={info} onClose={onClose} />)}
            </div>
          </ScrollContainer>
        </div>
      </div>
    </Modal>
  );
};

export default Info;
