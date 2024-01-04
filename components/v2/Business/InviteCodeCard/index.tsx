'use client';
import { FC, useMemo, useState } from 'react';
import Button from '@/components/v2/Common/Button';
import { VscAdd } from 'react-icons/vsc';
import { ShareWrap, shareList } from './constant';
import { message } from 'antd';
import { BurialPoint } from '@/helper/burialPoint';
import { useGetUserInfo } from '@/hooks/useGetUserInfo';
import PopBox from './PopBox';
import { useSelector } from 'react-redux';
import { AppRootState } from '@/store/redux';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { useGetMissionData } from '@/hooks/useGetMissionData';

interface InviteCodeCardProps {}

const InviteCodeCard: FC<InviteCodeCardProps> = (props) => {
  const [expand, setExpand] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  const beginnerRewards = useSelector((state: AppRootState) => {
    return state.missionCenter?.missionData?.beginnerRewards;
  });

  const { updateMissionData } = useGetMissionData();

  const inviteProgress = useMemo(() => {
    const inviteObject = beginnerRewards.find(
      (item) => item.subType === 'INVITE_USER'
    );
    return {
      progress: inviteObject?.progress.progress || [],
      id: inviteObject?.id,
      claimed: inviteObject?.progress.claimed,
      completed: inviteObject?.progress.completed,
      subType: inviteObject?.subType
    };
  }, [beginnerRewards]);

  const userInfo = useGetUserInfo();

  const inviteCode = useMemo(() => {
    return userInfo?.inviteCode;
  }, [userInfo]);

  const { run: completeProgress, loading } = useRequest(
    async (missionIds: string[]) => {
      const res = await webApi.missionCenterApi.missionClaim(missionIds);
      return res;
    },
    {
      onSuccess(res) {
        message.success('Success!');
        updateMissionData();
      },
      onError(e: any) {
        message.error(e.msg || e.message);
      },
      manual: true
    }
  );

  return (
    <div className="w-[380px] bg-white shadow-md rounded-[10px] p-5">
      <div className="h-fit flex justify-between ">
        <div className="flex items-center gap-[6px]">
          <span className="font-next-book text-[18px] tracking-[1.08pxx] leading-[120%]">
            INVITE CODE
          </span>

          <div
            className="relative h-full flex items-center justify-center pl-1"
            onMouseEnter={(e) => setShowDesc(true)}
            onMouseLeave={(e) => setShowDesc(false)}
          >
            <span className="cursor-pointer">{icons.descIcon}</span>
            {showDesc && (
              <PopBox className="-right-[34px]">
                <p className="w-[340px] text-[12px] font-next-book leading-[160%] -tracking-[0.132px] text-[#0B0B0B]">
                  HackQuest is currently in beta. Share your invite code to help
                  new users sign up. Rewards are available at Mission Center
                  after two users register with your invite code.
                </p>
              </PopBox>
            )}
          </div>
        </div>
        <div
          className="w-5 h-5 flex items-center justify-center cursor-pointer"
          onClick={() => setExpand(!expand)}
        >
          {expand && (
            <span className="block w-full h-[2px] bg-black rounded-full"></span>
          )}
          {!expand && <VscAdd size={24}></VscAdd>}
        </div>
      </div>
      {expand && (
        <>
          <div className="px-[15px] h-[40px] bg-[#F4F4F4] rounded-[50px] mt-[15px] flex justify-between items-center">
            <div className="flex items-center gap-[6px]">
              {icons.inviteIcon}
              <span className="font-next-book text-[14px] leading-[120%] text-[#0B0B0B]">
                {inviteCode}
              </span>
            </div>
            <div className="flex gap-[8.5px] h-full">
              <div
                className="flex gap-[5px] items-center cursor-pointer h-full"
                onClick={async (e) => {
                  try {
                    await navigator.clipboard.writeText(inviteCode || '');
                    BurialPoint.track('home-邀请码复制');
                    message.success('Copy success!');
                  } catch (e) {
                    message.warning(
                      'The browser version is too low or incompatible！'
                    );
                  }
                }}
              >
                {icons.copyIcon}
                <span className="font-next-book text-[12px] leading-[120%] hover:text-[#0B0B0B] text-[#8C8C8C] relative animate">
                  Copy
                </span>
              </div>
              <div
                className="flex gap-[5px] items-center cursor-pointer h-full"
                onMouseEnter={(e) => setShowShare(true)}
                onMouseLeave={(e) => setShowShare(false)}
              >
                {icons.shareIcon}

                <div className="font-next-book text-[12px] leading-[120%] hover:text-[#0B0B0B] text-[#8C8C8C] relative cursor-pointer animate">
                  <span>Share</span>
                  <div>
                    {showShare && (
                      <PopBox showPopTriangle={true}>
                        {shareList(inviteCode || '').map((item) => {
                          return (
                            <ShareWrap
                              key={item.name}
                              name={item.name}
                              component={item.component}
                              icon={item.icon}
                              props={item.props}
                            ></ShareWrap>
                          );
                        })}
                      </PopBox>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-between gap-x-4 items-center">
            <div className="flex-1 flex flex-col gap-[13px]">
              <div className="leading-[100%] font-next-book text-[#0B0B0B] text-[14px] tracking-[0.28px]">
                {`Users you invited (${inviteProgress.progress[0] || 0}/${
                  inviteProgress.progress[1] || 0
                })`}
              </div>
              <div className="flex gap-[3px] w-full">
                {new Array(inviteProgress.progress[1] || 0)
                  .fill('')
                  .map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={cn(
                          `w-1/2 h-[7px] rounded-[3px]`,
                          index < inviteProgress.progress[0]
                            ? 'bg-[#FCC409]'
                            : 'bg-[#DADADA]'
                        )}
                      ></div>
                    );
                  })}
              </div>
            </div>
            <Button
              type="primary"
              loading={loading}
              onClick={() => {
                if (!inviteProgress.claimed && inviteProgress.completed) {
                  completeProgress([inviteProgress.id || '']);
                }
              }}
              disabled={
                inviteProgress.claimed || !inviteProgress.completed || loading
              }
              className={cn(
                `px-5 py-2 font-next-book text-[14px] text-[0B0B0B] leading-[125%] tracking-[0.28px]`,
                inviteProgress.claimed || !inviteProgress.completed
                  ? 'opacity-40'
                  : ''
              )}
            >
              Claim Rewards
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const icons = {
  descIcon: (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="6" cy="6" r="6" fill="#8C8C8C" />
      <circle cx="5.9999" cy="3.00005" r="0.6" fill="white" />
      <rect
        x="5.3999"
        y="4.20001"
        width="1.2"
        height="5.4"
        rx="0.6"
        fill="white"
      />
    </svg>
  ),
  inviteIcon: (
    <svg
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.26453 2.36537C7.71166 2.07473 7.93523 1.92941 8.17611 1.87287C8.38903 1.82289 8.61064 1.82289 8.82356 1.87287C9.06445 1.92941 9.28801 2.07473 9.73514 2.36537L15.0675 5.83139C15.2559 5.95386 15.3501 6.0151 15.4184 6.09678C15.4788 6.16909 15.5242 6.25272 15.5519 6.34279C15.5832 6.44454 15.5832 6.5569 15.5832 6.78163V11.9749C15.5832 13.165 15.5832 13.7601 15.3516 14.2146C15.1478 14.6145 14.8227 14.9396 14.4229 15.1433C13.9683 15.3749 13.3733 15.3749 12.1832 15.3749H4.8165C3.62639 15.3749 3.03134 15.3749 2.57677 15.1433C2.17693 14.9396 1.85185 14.6145 1.64812 14.2146C1.4165 13.7601 1.4165 13.165 1.4165 11.9749V6.78163C1.4165 6.5569 1.4165 6.44454 1.44779 6.34279C1.47549 6.25272 1.52087 6.16909 1.5813 6.09678C1.64955 6.0151 1.74376 5.95386 1.93218 5.83139L7.26453 2.36537Z"
        fill="#8C8C8C"
      />
      <path
        d="M7.26453 9.9678L2.14745 6.6417C1.90384 6.48335 1.78204 6.40418 1.73985 6.30377C1.70298 6.21603 1.70298 6.11714 1.73985 6.02939C1.78204 5.92899 1.90384 5.84981 2.14745 5.69146L7.26453 2.36537C7.71166 2.07473 7.93523 1.92941 8.17611 1.87287C8.38903 1.82289 8.61064 1.82289 8.82356 1.87287C9.06445 1.92941 9.28801 2.07473 9.73514 2.36537L14.8522 5.69146C15.0958 5.84981 15.2176 5.92899 15.2598 6.02939C15.2967 6.11714 15.2967 6.21603 15.2598 6.30377C15.2176 6.40418 15.0958 6.48335 14.8522 6.6417L9.73514 9.9678C9.28802 10.2584 9.06445 10.4038 8.82356 10.4603C8.61064 10.5103 8.38903 10.5103 8.17611 10.4603C7.93523 10.4038 7.71166 10.2584 7.26453 9.9678Z"
        fill="#8C8C8C"
      />
      <path
        d="M1.4165 6.16666L8.49984 10.4167L15.5832 6.16666"
        stroke="#F4F4F4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="6.375" y1="5.2619" x2="10.625" y2="5.2619" stroke="#F4F4F4" />
      <line
        x1="8.6958"
        y1="3.33334"
        x2="8.6958"
        y2="7.58334"
        stroke="#F4F4F4"
      />
    </svg>
  ),
  copyIcon: (
    <svg
      width="8"
      height="10"
      viewBox="0 0 8 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.938698 10C0.680556 10 0.459493 9.902 0.275508 9.706C0.0915237 9.51 -0.000312102 9.27466 7.96857e-07 9V2.5C7.96857e-07 2.35833 0.0450583 2.2395 0.135173 2.1435C0.225288 2.0475 0.33668 1.99967 0.469349 2C0.602331 2 0.71388 2.048 0.803995 2.144C0.89411 2.24 0.939011 2.35867 0.938698 2.5V9H5.63218C5.76516 9 5.87671 9.048 5.96683 9.144C6.05694 9.24 6.10184 9.35866 6.10153 9.5C6.10153 9.64166 6.05647 9.7605 5.96636 9.8565C5.87624 9.9525 5.76485 10.0003 5.63218 10H0.938698ZM2.81609 8C2.55795 8 2.33689 7.902 2.1529 7.706C1.96892 7.51 1.87708 7.27467 1.87739 7V1C1.87739 0.725001 1.96939 0.489501 2.15337 0.293501C2.33736 0.0975008 2.55826 -0.000332484 2.81609 8.48897e-07H7.04023C7.29837 8.48897e-07 7.51943 0.0980008 7.70342 0.294001C7.8874 0.490001 7.97924 0.725334 7.97893 1V7C7.97893 7.275 7.88693 7.5105 7.70295 7.7065C7.51896 7.9025 7.29806 8.00033 7.04023 8H2.81609ZM2.81609 7H7.04023V1H2.81609V7Z"
        fill="#8C8C8C"
      />
    </svg>
  ),
  shareIcon: (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.31685 0.615765L10.3154 3.11459C10.43 3.20954 10.4963 3.3506 10.4963 3.49941C10.4963 3.64822 10.43 3.78929 10.3154 3.88423L7.31685 6.38306C7.22694 6.45756 7.11378 6.49823 6.997 6.498C6.92461 6.49839 6.85299 6.48305 6.7871 6.45302C6.60996 6.37104 6.49676 6.19343 6.49724 5.99824V5.0237C4.50033 5.21913 2.7924 6.54233 2.1043 8.4271L1.4696 10.1663C1.39806 10.3642 1.21024 10.496 0.999819 10.4961C0.971734 10.5013 0.942943 10.5013 0.914859 10.4961C0.672435 10.4543 0.496477 10.2423 0.500054 9.99636V8.49707C0.50305 5.10495 3.11517 2.28603 6.49724 2.0251V1.00058C6.49692 0.806541 6.60896 0.629855 6.7846 0.547387C6.96025 0.464919 7.16776 0.491577 7.31685 0.615765ZM7.49675 4.49895V4.93375L9.21594 3.49942L7.49675 2.06509V2.49989C7.49675 2.7759 7.273 2.99965 6.99698 2.99965C4.56569 3.00016 2.42348 4.59767 1.72946 6.92781C2.86379 5.10961 4.85396 4.00312 6.99698 3.99918C7.273 3.99918 7.49675 4.22294 7.49675 4.49895Z"
        fill="#8C8C8C"
      />
    </svg>
  )
};

export default InviteCodeCard;
