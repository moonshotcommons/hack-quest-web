import React, { useEffect, useMemo, useState } from 'react';
import { FiUser, FiX } from 'react-icons/fi';
import Button from '@/components/Common/Button';
import { PiWarningCircleLight } from 'react-icons/pi';
import { AiOutlineTeam } from 'react-icons/ai';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { BiXCircle } from 'react-icons/bi';
import { MdKeyboardArrowDown, MdOutlineAccessTimeFilled } from 'react-icons/md';
import Title from '../../Title';
import { ApplicationStatus, HackathonManageApplicationType } from '@/service/webApi/resourceStation/type';
import { useShallow } from 'zustand/react/shallow';
import dayjs from 'dayjs';
import BaseImage from '@/components/Common/BaseImage';
import { applicationAboutBasicKeys } from '../../../../../constants/data';
import Link from 'next/link';
import { isUuid } from '@/helper/utils';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import { cloneDeep } from 'lodash-es';

interface InfoContentProp {
  info: HackathonManageApplicationType;
  onClose: VoidFunction;
  handleStautusSingle: (item: HackathonManageApplicationType, sta: ApplicationStatus) => void;
}

const InfoContent: React.FC<InfoContentProp> = ({ info: team, onClose, handleStautusSingle }) => {
  const { hackathon } = useHackathonManageStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );
  const [curMemberInfo, setCurMemberInfo] = useState<HackathonManageApplicationType>(
    {} as HackathonManageApplicationType
  );
  const [expandTypes, setExpandTypes] = useState<string[]>(['about', 'profiles', 'contact']);

  const status = useMemo(() => {
    return team?.joinState;
  }, [team]);
  const disableHandleButton = useMemo(() => {
    return dayjs().tz().isAfter(hackathon?.timeline?.registrationClose);
  }, [hackathon]);
  const showHandleButton = useMemo(() => {
    return hackathon?.info?.allowSubmission === false;
  }, [hackathon]);
  const renderStatus = () => {
    switch (status) {
      case ApplicationStatus.APPROVED:
        return (
          <div className="flex h-[48px] gap-[20px]">
            <div className="relative flex  h-full flex-1 flex-shrink-0 items-center justify-center gap-[8px] rounded-[8px] bg-yellow-extra-light">
              <IoCheckmarkCircleSharp size={24} className="text-status-success" />
              <span>Approve by organizer</span>
              <div
                className={`absolute right-[20px] top-0 flex h-full  items-center text-neutral-medium-gray underline ${disableHandleButton ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => handleStatus(ApplicationStatus.REVIEW)}
              >
                Undo
              </div>
            </div>
            {team.isRegister ? (
              <div className="relative flex  h-full flex-1 flex-shrink-0 items-center justify-center gap-[8px] rounded-[8px] bg-yellow-extra-light">
                <IoCheckmarkCircleSharp size={24} className="text-status-success" />
                <span>Confirmed by applicant</span>
              </div>
            ) : (
              <div className="relative flex  h-full flex-1 flex-shrink-0 items-center justify-center gap-[8px] rounded-[8px] bg-neutral-off-white text-neutral-medium-gray">
                <IoCheckmarkCircleSharp size={24} />
                <span>Wait for confirmation from the applicant</span>
              </div>
            )}
          </div>
        );
      case ApplicationStatus.DECLINE:
        return (
          <div className="relative flex  h-[48px] w-full items-center justify-center gap-[8px] rounded-[8px] bg-yellow-extra-light">
            <BiXCircle size={24} className="text-status-error-dark" />
            <span>Declined by organizer</span>
            <div
              className={`absolute right-[20px] top-0 flex h-full  items-center text-neutral-medium-gray underline ${disableHandleButton ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => handleStatus(ApplicationStatus.REVIEW)}
            >
              Undo
            </div>
          </div>
        );
      case ApplicationStatus.WAIT:
        return (
          <div className="relative flex  h-[48px] w-full items-center justify-center gap-[8px] rounded-[8px] bg-yellow-extra-light">
            <MdOutlineAccessTimeFilled size={24} />
            <span>Declined by organizer</span>
            <div className="absolute right-[20px] top-0 flex h-full   gap-[20px] text-neutral-off-black underline">
              <div
                className="flex h-full cursor-pointer items-center"
                onClick={() => handleStatus(ApplicationStatus.APPROVED)}
              >
                Approve
              </div>
              <div
                className="flex h-full cursor-pointer items-center "
                onClick={() => handleStatus(ApplicationStatus.DECLINE)}
              >
                Declined
              </div>
              <div
                className={`flex h-full cursor-pointer items-center text-neutral-medium-gray ${disableHandleButton ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => handleStatus(ApplicationStatus.REVIEW)}
              >
                Undo
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex gap-[16px] ">
            <Button
              className="button-text-m h-[48px] flex-1 flex-shrink-0 bg-yellow-primary uppercase text-neutral-black"
              disabled={disableHandleButton}
              onClick={() => handleStatus(ApplicationStatus.APPROVED)}
            >
              approve
            </Button>
            <Button
              className="button-text-m h-[48px] flex-1 flex-shrink-0 bg-neutral-black uppercase text-neutral-white"
              onClick={() => handleStatus(ApplicationStatus.DECLINE)}
            >
              decline
            </Button>
            <Button
              className="button-text-m h-[48px] flex-1 flex-shrink-0 border border-neutral-black uppercase text-neutral-black"
              onClick={() => handleStatus(ApplicationStatus.WAIT)}
            >
              waitlist
            </Button>
          </div>
        );
    }
  };

  const handleStatus = (sta: ApplicationStatus) => {
    if (disableHandleButton) return;
    handleStautusSingle(team, sta);
  };

  const handleExpand = (type: string) => {
    const newExpandTypes = expandTypes.includes(type) ? expandTypes.filter((v) => v !== type) : [...expandTypes, type];
    setExpandTypes(newExpandTypes);
  };

  const getInfoObj = (infoKey: 'About' | 'Contact' | 'OnlineProfiles', key: string, value: string) => {
    if (isUuid(key)) {
      const application = hackathon?.info?.application;
      const label = (application[infoKey]?.find((v) => v.id === key)?.property as any)?.label;
      return {
        label,
        value
      };
    } else {
      return {
        label: key,
        value
      };
    }
  };

  const mInfo = useMemo(() => {
    const memberInfo = curMemberInfo.info;
    let About = (cloneDeep(memberInfo?.About) || {}) as Record<string, any>;
    const Contact = memberInfo?.Contact;
    const OnlineProfiles = memberInfo?.OnlineProfiles;
    About.name = `${About?.firstName} ${About?.lastName}`;
    delete About.firstName;
    delete About.lastName;
    let aboutsBasic: any = [],
      aboutsCustom = [],
      contacts = [],
      onlineProfiles = [];
    applicationAboutBasicKeys.forEach((v) => {
      if (About[v]) aboutsBasic.push(getInfoObj('About', v, About[v]));
    });
    for (let key in About) {
      if (key === 'bio') continue;
      if (!applicationAboutBasicKeys.includes(key)) {
        aboutsCustom.push(getInfoObj('About', key, About[key]));
      }
    }
    for (let key in Contact) {
      contacts.push(getInfoObj('Contact', key, Contact[key]));
    }
    for (let key in OnlineProfiles) {
      onlineProfiles.push(getInfoObj('OnlineProfiles', key, OnlineProfiles[key]));
    }
    return {
      aboutsBasic,
      aboutsCustom,
      contacts,
      onlineProfiles
    };
  }, [curMemberInfo, hackathon]);

  useEffect(() => {
    if (team.type === 'team') {
      setCurMemberInfo(team.members?.[0] as HackathonManageApplicationType);
    } else {
      setCurMemberInfo(team);
    }
  }, [team]);
  return (
    <div className="relative flex max-h-[80vh] w-[888px] flex-col rounded-[16px] bg-neutral-white pb-[40px] pt-[60px]">
      <FiX size={26} className="absolute right-[20px] top-[20px] cursor-pointer" onClick={onClose} />
      <div className="px-[40px]">
        <Title title={team?.name} />
      </div>
      <div className=" scroll-wrap-y flex-1 px-[40px] py-[20px]">
        <div className="flex flex-col gap-[20px]">
          {team.type === 'team' && (
            <div className="body-s flex items-center gap-[8px] rounded-[16px] bg-neutral-off-white p-[16px] text-neutral-medium-gray">
              <PiWarningCircleLight />
              <span>
                You can check a profile by clicking on the member’s name and the decision of approve/decline/waitlist is
                for the team.
              </span>
            </div>
          )}
          {team.type === 'team' ? (
            <div className="flex flex-col gap-[12px]">
              <div className="body-m flex items-center gap-[8px] text-neutral-black">
                <div className="flex-center h-[32px] w-[32px] rounded-[50%] border border-neutral-black">
                  <AiOutlineTeam />
                </div>
                <span>Group Project</span>
              </div>
              <p className="body-l text-neutral-medium-gray">
                You can check all profiles in this team by clicking on their name and the decision for the approval is
                for the team as a whole.
              </p>
              <div className="flex flex-wrap gap-[12px]">
                {team?.members?.map((v) => (
                  <div
                    key={v.id}
                    className={`flex w-[calc((100%-36px)/4)] cursor-pointer flex-col items-center rounded-[8px] border-[3px] p-[12px]  ${v === curMemberInfo ? 'border-yellow-dark bg-yellow-extra-light' : 'border-neutral-off-white'}`}
                    onClick={() => {
                      setCurMemberInfo(v);
                    }}
                  >
                    <div className="flex items-center gap-[8px]">
                      <BaseImage
                        src={v?.avatar || ''}
                        alt={v.name}
                        className="h-[32px] w-[32px] flex-shrink-0 rounded-[50%]"
                      />
                      <div
                        className={`line-clamp-2 flex-1 text-neutral-black ${v.id === curMemberInfo.id ? 'body-xs' : 'body-m '}`}
                      >
                        {v.name}
                      </div>
                    </div>
                    <p className="caption-12pt text-neutral-medium-gray">{v.isAdmin ? 'Admin' : 'Member'}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex">
              <div className="flex items-center gap-[8px] border-r border-neutral-light-gray pr-[16px]">
                <div className="flex-center h-[32px] w-[32px] rounded-[50%] border border-neutral-black">
                  <FiUser />
                </div>
                <span>Solo Project</span>
              </div>
              <div className="flex items-center gap-[8px] pl-[16px]">
                <BaseImage
                  src={team?.avatar || ''}
                  alt={team.name}
                  className="h-[32px] w-[32px] flex-shrink-0 rounded-[50%]"
                />
                <div className={`body-m text-neutral-black `}>{team.name}</div>
              </div>
            </div>
          )}
          <div className={`body-l`}>
            <div className="flex cursor-pointer items-center justify-between" onClick={() => handleExpand('about')}>
              <p className="body-l-bold mb-[8px] text-neutral-off-black">About</p>
              <MdKeyboardArrowDown
                size={24}
                className={`transition-all ${expandTypes.includes('about') && 'rotate-[180deg]'}`}
              />
            </div>

            <div
              className={`grid overflow-hidden text-neutral-off-black transition-all ${expandTypes.includes('about') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="flex flex-col gap-[8px] overflow-hidden">
                <div className={`flex flex-wrap  gap-[8px_40px] overflow-hidden   `}>
                  {mInfo?.aboutsBasic.map((v: any) => (
                    <div key={v.label}>
                      <p className="capitalize text-neutral-medium-gray">{v?.label?.toLocaleLowerCase()}</p>
                      {v.label === 'resume' ? (
                        <Link
                          href={v?.value || ''}
                          target="_blank"
                          className="text-neutral-off-black underline outline-none"
                        >
                          View Resume
                        </Link>
                      ) : (
                        <p>{v?.value}</p>
                      )}
                    </div>
                  ))}
                </div>
                {curMemberInfo?.info?.About?.bio && (
                  <div>
                    <p className="capitalize text-neutral-medium-gray">{'Bio'}</p>
                    <p className={`whitespace-pre-line text-neutral-rich-gray`}>{curMemberInfo?.info?.About?.bio}</p>
                  </div>
                )}

                {mInfo?.aboutsCustom?.length > 0 && (
                  <div className="flex gap-[8px_40px]">
                    {mInfo?.aboutsCustom.map((v) => (
                      <div key={v.label}>
                        <p className="capitalize text-neutral-medium-gray">{v.label.toLocaleLowerCase()}</p>
                        <p className={`text-neutral-rich-gray`}>{v.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="body-l">
            <div className="flex cursor-pointer items-center justify-between" onClick={() => handleExpand('profiles')}>
              <p className="body-l-bold mb-[8px] text-neutral-off-black">Online Profiles</p>
              <MdKeyboardArrowDown
                size={24}
                className={`transition-all ${expandTypes.includes('profiles') && 'rotate-[180deg]'}`}
              />
            </div>
            <div
              className={`grid overflow-hidden transition-all ${expandTypes.includes('profiles') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="flex flex-wrap gap-[8px_40px] overflow-hidden text-neutral-off-black">
                {mInfo?.onlineProfiles?.map((v) => (
                  <div key={v.label}>
                    <p className="capitalize text-neutral-medium-gray">{v.label.toLocaleLowerCase()}</p>
                    <p>{v.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="body-l">
            <div className="flex cursor-pointer items-center justify-between" onClick={() => handleExpand('contact')}>
              <p className="body-l-bold mb-[8px] text-neutral-off-black">Contact</p>
              <MdKeyboardArrowDown
                size={24}
                className={`transition-all ${expandTypes.includes('contact') && 'rotate-[180deg]'}`}
              />
            </div>
            <div
              className={`grid overflow-hidden transition-all ${expandTypes.includes('contact') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="flex flex-wrap gap-[8px_40px] overflow-hidden text-neutral-off-black">
                {mInfo?.contacts?.map((v) => (
                  <div key={v.label}>
                    <p className="capitalize text-neutral-medium-gray">{v.label.toLocaleLowerCase()}</p>
                    <p>{v.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showHandleButton && (
        <div className="body-s border-t border-neutral-light-gray px-[40px] pt-[40px] text-neutral-off-black">
          {renderStatus()}
        </div>
      )}
    </div>
  );
};

export default InfoContent;
