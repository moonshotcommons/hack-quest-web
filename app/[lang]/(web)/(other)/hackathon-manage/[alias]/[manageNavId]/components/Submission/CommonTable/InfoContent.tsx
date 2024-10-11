import React, { useMemo, useState } from 'react';
import { FiDownload, FiX } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import BaseImage from '@/components/Common/BaseImage';
import ProjectVideo from '../ProjectVideo';
import { ProjectType } from '@/service/webApi/resourceStation/type';
import { insertAsterisk } from '@/helper/utils';
import TeamCard from '../TeamCard';
import Button from '@/components/Common/Button';

interface InfoContentProp {
  info: ProjectType;
  onClose: VoidFunction;
  handleDown: VoidFunction;
  handleMark: VoidFunction;
}

const InfoContent: React.FC<InfoContentProp> = ({ info, onClose, handleDown, handleMark }) => {
  const [expandTypes, setExpandTypes] = useState<string[]>(['info', 'team', 'details', 'videos', 'additions']);

  const handleExpand = (type: string) => {
    const newExpandTypes = expandTypes.includes(type) ? expandTypes.filter((v) => v !== type) : [...expandTypes, type];
    setExpandTypes(newExpandTypes);
  };

  const customInfo = useMemo(() => {
    const addition = info.addition?.fields || {};
    const base = info.fields || {};
    const detail = info.detail?.fields || {};
    let additionFields = [],
      baseFields = [],
      detailFields = [];
    for (let key in addition) {
      additionFields.push({
        label: addition[key]?.label,
        value: addition[key]?.value
      });
    }
    for (let key in base) {
      baseFields.push({
        label: base[key]?.label,
        value: base[key]?.value
      });
    }
    for (let key in detail) {
      detailFields.push({
        label: detail[key]?.label,
        value: detail[key]?.value
      });
    }
    return {
      additionFields,
      baseFields,
      detailFields
    };
  }, [info]);

  return (
    <div className="relative flex max-h-[80vh] w-[888px] flex-col rounded-[16px] bg-neutral-white pb-[40px] pt-[60px]">
      <FiX size={26} className="absolute right-[20px] top-[20px] cursor-pointer" onClick={onClose} />
      <div className="flex items-center gap-[8px] px-[40px]">
        <BaseImage
          src={info.logo}
          alt={info.name}
          className="h-[34px] w-[34px] rounded-[8px] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"
        />
        <span className="text-h35 text-neutral-off-black">{info.name}</span>
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
                  <div>{info.location}</div>
                </div>
                <div>
                  <p className="text-neutral-medium-gray">Prize Track</p>
                  <div>{info.prizeTrack}</div>
                </div>
                <div>
                  <p className="text-neutral-medium-gray">Sector</p>
                  <div>{info.tracks?.join(',')}</div>
                </div>
                <div>
                  <p className="text-neutral-medium-gray">Wallet Information</p>
                  <div className="flex items-center gap-[8px]">
                    {/* <BaseImage src={'/images/login/metamask.svg'} alt={'metaMaskIcon'} className="h-[28px] w-[28px]" /> */}
                    <span>
                      {insertAsterisk({
                        str: info.wallet,
                        start: 16,
                        end: 4
                      })}
                    </span>
                  </div>
                </div>
                {customInfo?.baseFields.map((v, i) => (
                  <div key={i}>
                    <p className="text-neutral-medium-gray">{v.label}</p>
                    <div>{v.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {info.members?.length > 0 && (
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
                  <p className="text-neutral-medium-gray">{info.team?.name || ''}</p>
                  <div className="flex w-full flex-wrap gap-[20px]">
                    {info?.members.map((v, i) => (
                      <div key={i} className="w-[calc((100%-60px)/4)]">
                        <TeamCard member={v} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {info.detail && (
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
                    <div className="whitespace-pre-line text-neutral-rich-gray">{info.detail?.oneLineIntro}</div>
                  </div>
                  <div>
                    <p className="text-neutral-medium-gray">Detailed Intro of Your Project </p>
                    <div
                      className={`reset-editor-style whitespace-pre-line`}
                      dangerouslySetInnerHTML={{
                        __html: info.detail?.detailedIntro || ''
                      }}
                    ></div>
                  </div>
                  <div>
                    <p className="text-neutral-medium-gray">Team Background </p>
                    <div className="whitespace-pre-line text-neutral-rich-gray">{info.detail?.teamBackground}</div>
                  </div>
                  <div>
                    <p className="text-neutral-medium-gray">Progress During Hackathon</p>
                    <div className="whitespace-pre-line text-neutral-rich-gray">{info.detail?.progress}</div>
                  </div>
                  {customInfo.detailFields?.length > 0 && (
                    <div className="flex flex-wrap gap-[8px_40px] overflow-hidden">
                      {customInfo?.detailFields.map((v, i) => (
                        <div key={i}>
                          <p className="text-neutral-medium-gray">{v.label}</p>
                          <div>{v.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {(info.pitchVideo || info.demoVideo) && (
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
                  {info.pitchVideo && (
                    <div>
                      <p className="text-neutral-medium-gray">Pitch Video</p>
                      <div className="w-[240px] overflow-hidden rounded-[10px]">
                        <ProjectVideo videoUrl={info.pitchVideo} />
                      </div>
                    </div>
                  )}
                  {info.demoVideo && (
                    <div>
                      <p className="text-neutral-medium-gray">Demo Video</p>
                      <div className="w-[240px]  overflow-hidden rounded-[10px]">
                        <ProjectVideo videoUrl={info.demoVideo} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {info.addition && (
            <div>
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => handleExpand('additions')}
              >
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
                    <div>{info.addition?.githubLink}</div>
                  </div>
                  <div>
                    <p className="text-neutral-medium-gray">Open Source</p>
                    <div>{info.addition?.isOpenSource ? 'Yes' : 'No'}</div>
                  </div>
                  <div>
                    <p className="text-neutral-medium-gray">Contract Address</p>
                    <div className="whitespace-pre-line">{info.addition?.contract}</div>
                  </div>
                  {customInfo?.additionFields.map((v, i) => (
                    <div key={i}>
                      <p className="text-neutral-medium-gray">{v.label}</p>
                      <div>{v.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-neutral-light-gray px-[40px] pt-[40px]">
        {info.invalid && info.invalidReason && (
          <p className="body-s mb-[10px] text-center text-status-error-dark">
            Reasons for disqualification：{info.invalidReason}
          </p>
        )}
        <div className="flex justify-center gap-2">
          <Button
            icon={<FiDownload size={24} />}
            className="button-text-m h-[48px] w-[280px] uppercase"
            ghost
            onClick={handleDown}
          >
            Download submission
          </Button>
          <Button type="primary" className="button-text-m h-[48px] w-[280px] uppercase" onClick={handleMark}>
            {` Mark as Invalid ${info.invalid ? '(Undo)' : ''}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoContent;
