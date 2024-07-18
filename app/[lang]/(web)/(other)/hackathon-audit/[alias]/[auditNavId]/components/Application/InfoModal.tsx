import Modal from '@/components/Common/Modal';
import React, { useState } from 'react';
import { FiUser, FiX } from 'react-icons/fi';
import Title from '../Title';
import Button from '@/components/Common/Button';
import { PiWarningCircleLight } from 'react-icons/pi';
import { AiOutlineTeam } from 'react-icons/ai';
import Link from 'next/link';
import { ApplicationStatus } from '../../../../constants/type';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { BiXCircle } from 'react-icons/bi';
import { MdKeyboardArrowDown, MdOutlineAccessTimeFilled } from 'react-icons/md';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface InfoModalProp {
  open: boolean;
  onClose: VoidFunction;
}

const InfoModal: React.FC<InfoModalProp> = ({ open, onClose }) => {
  const isTeam = false;
  const [curMemberInfo, setCurMemberInfo] = useState(0);
  const [status, setStatus] = useState<ApplicationStatus>(ApplicationStatus.REVIEW);
  const confirmed = false;
  const [expandTypes, setExpandTypes] = useState<string[]>([]);
  const renderStatus = () => {
    switch (status) {
      case ApplicationStatus.APPROVED:
        return (
          <div className="flex h-[48px] gap-[20px]">
            <div className="relative flex  h-full flex-1 flex-shrink-0 items-center justify-center gap-[8px] rounded-[8px] bg-yellow-extra-light">
              <IoCheckmarkCircleSharp size={24} className="text-status-success" />
              <span>Approve by organizer</span>
              <div
                className="absolute right-[20px] top-0 flex h-full cursor-pointer items-center text-neutral-medium-gray underline"
                onClick={() => handleStatus(ApplicationStatus.REVIEW)}
              >
                Undo
              </div>
            </div>
            {confirmed ? (
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
      case ApplicationStatus.REJECTED:
        return (
          <div className="relative flex  h-[48px] w-full items-center justify-center gap-[8px] rounded-[8px] bg-yellow-extra-light">
            <BiXCircle size={24} className="text-status-error-dark" />
            <span>Declined by organizer</span>
            <div
              className="absolute right-[20px] top-0 flex h-full cursor-pointer items-center text-neutral-medium-gray underline"
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
                onClick={() => handleStatus(ApplicationStatus.REJECTED)}
              >
                Declined
              </div>
              <div
                className="flex h-full cursor-pointer items-center text-neutral-medium-gray"
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
              onClick={() => handleStatus(ApplicationStatus.APPROVED)}
            >
              approve
            </Button>
            <Button
              className="button-text-m h-[48px] flex-1 flex-shrink-0 bg-neutral-black uppercase text-neutral-white"
              onClick={() => handleStatus(ApplicationStatus.REJECTED)}
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

  const handleExpand = (type: string) => {
    const newExpandTypes = expandTypes.includes(type) ? expandTypes.filter((v) => v !== type) : [...expandTypes, type];
    setExpandTypes(newExpandTypes);
  };

  const handleStatus = (sta: ApplicationStatus) => {
    setStatus(sta);
  };
  return (
    <Modal open={open} onClose={onClose} showCloseIcon={true} icon={<FiX size={26} />} iconClassName="right-[90px]">
      <div className="relative flex w-[1036px] justify-center">
        <div
          className={`flex-center absolute left-[0] top-[50%] h-[54px] w-[54px] translate-y-[-50%] rounded-[50%] bg-neutral-light-gray text-neutral-medium-gray ${true ? 'cursor-pointer hover:bg-neutral-white hover:text-neutral-black' : 'cursor-not-allowed'}`}
        >
          <ChevronLeft size={40} />
        </div>
        <div
          className={`flex-center absolute right-[0] top-[50%] h-[54px] w-[54px] translate-y-[-50%] rounded-[50%] bg-neutral-light-gray  text-neutral-medium-gray ${true ? 'cursor-pointer hover:bg-neutral-white hover:text-neutral-black' : 'cursor-not-allowed'}`}
        >
          <ChevronRight size={40} />
        </div>
        <div className="flex max-h-[80vh] w-[888px] flex-col rounded-[16px] bg-neutral-white pb-[40px] pt-[60px]">
          <div className="px-[40px]">
            <Title title={'Peter Parker'} />
          </div>
          <div className=" scroll-wrap-y flex-1 px-[40px] py-[20px]">
            <div className="flex flex-col gap-[20px]">
              {isTeam && (
                <div className="body-s flex items-center gap-[8px] rounded-[16px] bg-neutral-off-white p-[16px] text-neutral-medium-gray">
                  <PiWarningCircleLight />
                  <span>
                    You can check a profile by clicking on the member’s name and the decision of
                    approve/decline/waitlist is for the team.
                  </span>
                </div>
              )}
              {isTeam ? (
                <div className="flex flex-col gap-[12px]">
                  <div className="item-center body-m flex gap-[8px] text-neutral-black">
                    <div className="flex-center h-[32px] w-[32px] rounded-[50%] border border-neutral-black">
                      <AiOutlineTeam />
                    </div>
                    <span>Group Project</span>
                  </div>
                  <p className="body-l text-neutral-medium-gray">
                    You can check all profiles in this team by clicking on their name and the decision for the approval
                    is for the team as a whole.
                  </p>
                  <div className="flex flex-wrap gap-[12px]">
                    {[0, 1, 2, 3, 4, 5].map((v) => (
                      <div
                        key={v}
                        className={`flex w-[calc((100%-36px)/4)] cursor-pointer flex-col items-center rounded-[8px] border-[3px] p-[12px]  ${v === curMemberInfo ? 'border-yellow-dark bg-yellow-extra-light' : 'border-neutral-off-white'}`}
                        onClick={() => {
                          setCurMemberInfo(v);
                        }}
                      >
                        <div className="flex items-center gap-[8px]">
                          <div className="h-[32px] w-[32px] flex-shrink-0 rounded-[50%] bg-neutral-off-white"></div>
                          <div className={`line-clamp-2 flex-1 text-neutral-black ${true ? 'body-xs' : 'body-m '}`}>
                            123456 7890 12345678
                          </div>
                        </div>
                        <p className="caption-12pt text-neutral-medium-gray">Member</p>
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
                    <div className="h-[32px] w-[32px] flex-shrink-0 rounded-[50%] bg-neutral-off-white"></div>
                    <div className={`body-m text-neutral-black `}>123456 7890 12345678</div>
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
                  className={`grid overflow-hidden transition-all ${expandTypes.includes('about') ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className={`flex flex-wrap  gap-[8px_40px] overflow-hidden text-neutral-off-black  `}>
                    {[
                      { key: 'resume', value: 'View Resume' },
                      { key: 'name', value: 'sssdsd' },
                      { key: 'gender', value: 'male' },
                      {
                        key: 'bio',
                        value:
                          '是的是的是的实打实是的是的是的实打实是的是的是的实打实是的是的是的实打实是的是的是的实打实是的是的是的实打实是的是的是的实打实是的是的是的实打实是的是的是的实打实'
                      }
                    ].map((v) =>
                      v.key === 'resume' ? (
                        <Link href={v.value} target="_blank" key={v.key}>
                          <p className="capitalize text-neutral-medium-gray">{v.key.toLocaleLowerCase()}</p>
                          <p className="underline">{v.value}</p>
                        </Link>
                      ) : (
                        <div key={v.key}>
                          <p className="capitalize text-neutral-medium-gray">{v.key.toLocaleLowerCase()}</p>
                          <p className={`${v.key === 'bio' && 'text-neutral-rich-gray'}`}>{v.value}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="body-l">
                <div
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => handleExpand('profiles')}
                >
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
                    {[
                      { key: 'resume', value: 'View Resume' },
                      { key: 'name', value: 'sssdsd' },
                      { key: 'gender', value: 'male' }
                    ].map((v) => (
                      <div key={v.key}>
                        <p className="capitalize text-neutral-medium-gray">{v.key.toLocaleLowerCase()}</p>
                        <p>{v.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="body-l">
                <div
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => handleExpand('contact')}
                >
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
                    {[
                      { key: 'resume', value: 'View Resume' },
                      { key: 'name', value: 'sssdsd' },
                      { key: 'gender', value: 'male' }
                    ].map((v) => (
                      <div key={v.key}>
                        <p className="capitalize text-neutral-medium-gray">{v.key.toLocaleLowerCase()}</p>
                        <p>{v.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="body-s border-t border-neutral-light-gray px-[40px] pt-[40px] text-neutral-off-black">
            {renderStatus()}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InfoModal;
