import Modal from '@/components/Common/Modal';
import React, { useState } from 'react';
import { FiUser, FiX } from 'react-icons/fi';
import Title from '../Title';
import Button from '@/components/Common/Button';
import { PiWarningCircleLight } from 'react-icons/pi';
import { AiOutlineTeam } from 'react-icons/ai';
import { CiUser } from 'react-icons/ci';
import Link from 'next/link';
import { ApplicationStatus } from '../../../../constants/type';

interface InfoModalProp {}

const InfoModal: React.FC<InfoModalProp> = () => {
  const isTeam = false;
  const [curMemberInfo, setCurMemberInfo] = useState(0);
  const [status, setStatus] = useState<ApplicationStatus | null>(null);
  const renderStatus = () => {
    switch (status) {
      case ApplicationStatus.APPROVED:
        return null;
      case ApplicationStatus.REJECTED:
        return null;
      case ApplicationStatus.WAIT:
        return null;
      default:
        return null;
    }
  };

  const handleStatus = (sta: ApplicationStatus) => {};
  return (
    <div>
      <Modal open={true} onClose={() => {}} showCloseIcon={true} icon={<FiX size={26} />}>
        <div className="relative">
          <div className="flex max-h-[80vh] w-[888px] flex-col rounded-[16px] bg-neutral-white pb-[40px] pt-[60px]">
            <div className="px-[40px]">
              <Title title={'Peter Parker'} />
            </div>
            <div className=" flex-1 overflow-auto px-[40px] py-[20px]">
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
                      You can check all profiles in this team by clicking on their name and the decision for the
                      approval is for the team as a whole.
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
                <div className="body-l">
                  <p className="body-l-bold mb-[8px] text-neutral-off-black">About</p>
                  <div className="flex flex-wrap gap-[8px_40px] text-neutral-off-black">
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
                <div className="body-l">
                  <p className="body-l-bold mb-[8px] text-neutral-off-black">Online Profiles</p>
                  <div className="flex flex-wrap gap-[8px_40px] text-neutral-off-black">
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
                <div className="body-l">
                  <p className="body-l-bold mb-[8px] text-neutral-off-black">Contact</p>
                  <div className="flex flex-wrap gap-[8px_40px] text-neutral-off-black">
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
            <div className="flex gap-[16px] border-t border-neutral-light-gray px-[40px] pt-[40px]">
              {status === null ? (
                <>
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
                </>
              ) : (
                renderStatus()
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InfoModal;
