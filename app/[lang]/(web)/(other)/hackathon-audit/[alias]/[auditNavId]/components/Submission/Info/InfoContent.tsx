import React, { useState } from 'react';
import { FiDownload, FiUser, FiX } from 'react-icons/fi';
import Button from '@/components/Common/Button';
import { MdKeyboardArrowDown } from 'react-icons/md';
import BaseImage from '@/components/Common/BaseImage';
import TeamCard from '../TeamCard';
import { useHackathonAuditStore } from '@/store/zustand/hackathonAuditStore';
import { useShallow } from 'zustand/react/shallow';
import ProjectVideo from '../ProjectVideo';

interface InfoContentProp {
  info: any;
  onClose: VoidFunction;
}

const InfoContent: React.FC<InfoContentProp> = ({ info, onClose }) => {
  const { hackathon } = useHackathonAuditStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const [expandTypes, setExpandTypes] = useState<string[]>([]);

  const handleExpand = (type: string) => {
    const newExpandTypes = expandTypes.includes(type) ? expandTypes.filter((v) => v !== type) : [...expandTypes, type];
    setExpandTypes(newExpandTypes);
  };

  return (
    <div className="relative flex max-h-[80vh] w-[888px] flex-col rounded-[16px] bg-neutral-white pb-[40px] pt-[60px]">
      <FiX size={26} className="absolute right-[20px] top-[20px] cursor-pointer" onClick={onClose} />
      <div className="flex items-center gap-[8px] px-[40px]">
        <div className="h-[34px] w-[34px] rounded-[8px] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"></div>
        <span className="text-h35 text-neutral-off-black">MetaLine-X</span>
      </div>
      <div className=" body-l scroll-wrap-y flex-1 px-[40px] py-[20px]">
        <div className="flex flex-col gap-[20px]">
          <div>
            <div className="flex cursor-pointer items-center justify-between" onClick={() => handleExpand('info')}>
              <p className="body-l-bold mb-[8px] text-neutral-off-black">Basic Info</p>
              <MdKeyboardArrowDown
                size={24}
                className={`transition-all ${expandTypes.includes('info') && 'rotate-[180deg]'}`}
              />
            </div>
            <div
              className={`grid overflow-hidden transition-all ${expandTypes.includes('info') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="flex flex-wrap gap-[8px_40px] overflow-hidden">
                <div>
                  <p className="text-neutral-medium-gray">Location</p>
                  <div>Americas</div>
                </div>
                <div>
                  <p className="text-neutral-medium-gray">Prize Track</p>
                  <div>Americas</div>
                </div>
                <div>
                  <p className="text-neutral-medium-gray">Sector</p>
                  <div>Americas</div>
                </div>
                <div>
                  <p className="text-neutral-medium-gray">Wallet Information</p>
                  <div className="flex items-center gap-[8px]">
                    <BaseImage src={'/images/login/metamask.svg'} alt={'metaMaskIcon'} className="h-[28px] w-[28px]" />
                    <span>0x6a5cccccccccc...c102</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex cursor-pointer items-center justify-between" onClick={() => handleExpand('team')}>
              <p className="body-l-bold mb-[8px] text-neutral-off-black">Team</p>
              <MdKeyboardArrowDown
                size={24}
                className={`transition-all ${expandTypes.includes('team') && 'rotate-[180deg]'}`}
              />
            </div>
            <div
              className={`grid overflow-hidden transition-all ${expandTypes.includes('team') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="w-full overflow-hidden">
                <p className="text-neutral-medium-gray">kkk</p>
                <div className="flex w-full flex-wrap gap-[20px]">
                  {hackathon?.members.map((v, i) => (
                    <div key={i} className="w-[calc((100%-60px)/4)]">
                      <TeamCard member={v} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex cursor-pointer items-center justify-between" onClick={() => handleExpand('details')}>
              <p className="body-l-bold mb-[8px] text-neutral-off-black">Project Details</p>
              <MdKeyboardArrowDown
                size={24}
                className={`transition-all ${expandTypes.includes('details') && 'rotate-[180deg]'}`}
              />
            </div>
            <div
              className={`grid overflow-hidden transition-all ${expandTypes.includes('details') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="flex flex-col gap-[8px] overflow-hidden">
                <div>
                  <p className="text-neutral-medium-gray">One Line Intro of Your Project </p>
                  <div className="whitespace-pre-line text-neutral-rich-gray">是打算打算打算的</div>
                </div>
                <div>
                  <p className="text-neutral-medium-gray">Detailed Intro of Your Project </p>
                  <div className="whitespace-pre-line text-neutral-rich-gray">是打算打算打算的</div>
                </div>
                <div>
                  <p className="text-neutral-medium-gray">Team Background </p>
                  <div className="whitespace-pre-line text-neutral-rich-gray">是打算打算打算的</div>
                </div>
                <div>
                  <p className="text-neutral-medium-gray">Progress During Hackathon</p>
                  <div className="whitespace-pre-line text-neutral-rich-gray">是打算打算打算的</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex cursor-pointer items-center justify-between" onClick={() => handleExpand('videos')}>
              <p className="body-l-bold mb-[8px] text-neutral-off-black">Videos</p>
              <MdKeyboardArrowDown
                size={24}
                className={`transition-all ${expandTypes.includes('videos') && 'rotate-[180deg]'}`}
              />
            </div>
            <div
              className={`grid overflow-hidden transition-all ${expandTypes.includes('videos') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="flex gap-[20px] overflow-hidden">
                <div>
                  <p className="text-neutral-medium-gray">Pitch Video</p>
                  <div className="w-[240px] overflow-hidden rounded-[10px]">
                    <ProjectVideo videoUrl="https://youtu.be/S-leGr8RuL0?si=piYNr-bWsXeNo-jQ" />
                  </div>
                </div>
                <div>
                  <p className="text-neutral-medium-gray">Demo Video</p>
                  <div className="w-[240px]  overflow-hidden rounded-[10px]">
                    <ProjectVideo videoUrl="https://youtu.be/S-leGr8RuL0?si=piYNr-bWsXeNo-jQ" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex cursor-pointer items-center justify-between" onClick={() => handleExpand('additions')}>
              <p className="body-l-bold mb-[8px] text-neutral-off-black">Additions</p>
              <MdKeyboardArrowDown
                size={24}
                className={`transition-all ${expandTypes.includes('additions') && 'rotate-[180deg]'}`}
              />
            </div>
            <div
              className={`grid overflow-hidden transition-all ${expandTypes.includes('additions') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="flex flex-wrap gap-[8px_40px] overflow-hidden">
                <div>
                  <p className="text-neutral-medium-gray">Project Github</p>
                  <div>dssdsdsddsdssd</div>
                </div>
                <div>
                  <p className="text-neutral-medium-gray">Open Source</p>
                  <div>dssdsdsddsdssd</div>
                </div>
                <div>
                  <p className="text-neutral-medium-gray">Contract Address</p>
                  <div className="whitespace-pre-line">dssdsdsddsdssd</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="body-s flex justify-center border-t border-neutral-light-gray px-[40px] pt-[40px] text-neutral-off-black">
        <Button icon={<FiDownload size={24} />} className="button-text-m h-[48px] uppercase" ghost>
          Download submission
        </Button>
      </div>
    </div>
  );
};

export default InfoContent;
