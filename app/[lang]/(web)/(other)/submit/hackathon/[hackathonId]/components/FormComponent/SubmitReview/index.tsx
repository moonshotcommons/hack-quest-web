import { FC } from 'react';
import { FormComponentProps } from '..';
import Image from 'next/image';

interface SubmitReviewProps {}

const SubmitReview: FC<Omit<FormComponentProps, 'type' | 'onNext'>> = ({ formState, setCurrentStep }) => {
  const gotoStep = (step: number) => {
    setCurrentStep(step);
  };

  const NameBlock = (
    <div
      className="body-s flex cursor-pointer items-center rounded-[8px] border border-neutral-light-gray bg-neutral-white p-6 text-neutral-off-black"
      onClick={() => gotoStep(0)}
    >
      <span className="flex-1 text-left">Name</span>
      <span className="flex-1 text-left">{formState.name.firstName + ' ' + formState.name.lastName}</span>
      {arrowIcon}
    </div>
  );

  const ContractInfoBlock = (
    <div className="flex flex-col gap-2 rounded-[8px] border border-neutral-light-gray bg-neutral-white px-6 py-3">
      <div
        className="body-s flex cursor-pointer items-center justify-between text-neutral-rich-gray"
        onClick={() => gotoStep(1)}
      >
        <span>Contact Info</span>
        {arrowIcon}
      </div>
      <div className="body-xs flex items-center justify-between text-neutral-off-black">
        <span>WeChat</span>
        {!!formState.contractInfo.wechat && <span>{formState.contractInfo.wechat}</span>}
        {!formState.contractInfo.wechat && <span className="text-neutral-medium-gray">{'No Set'}</span>}
      </div>
      <div className="body-xs flex items-center justify-between text-neutral-off-black">
        <span>Telegram</span>
        {!!formState.contractInfo.telegram && <span>{formState.contractInfo.telegram}</span>}
        {!formState.contractInfo.telegram && <span className="text-neutral-medium-gray">{'No Set'}</span>}
      </div>
    </div>
  );

  const BioBlock = (
    <div className="flex min-h-[150px] flex-col gap-2 rounded-[8px] border border-neutral-light-gray bg-neutral-white px-6 py-3">
      <div
        className="body-s flex cursor-pointer items-center justify-between text-neutral-rich-gray"
        onClick={() => gotoStep(2)}
      >
        <span>Bio</span>
        {arrowIcon}
      </div>
      <p className="caption-12pt text-left text-neutral-off-black">{formState.bio}</p>
    </div>
  );

  const TeamBlock = (
    <div className="flex flex-col gap-2 rounded-[8px] border border-neutral-light-gray bg-neutral-white px-6 py-3">
      <div
        className="body-s flex cursor-pointer items-center justify-between text-neutral-rich-gray"
        onClick={() => gotoStep(3)}
      >
        <span>Submission Type</span>
        {arrowIcon}
      </div>
      <div className="flex items-center justify-between">
        <span className="body-xs flex items-center text-neutral-off-black">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11.5" stroke="#3E3E3E" />
            <g clipPath="url(#clip0_8109_38558)">
              <path
                d="M6.5 16V14.6C6.5 14.3167 6.57292 14.0563 6.71875 13.8187C6.86458 13.5813 7.05833 13.4 7.3 13.275C7.81667 13.0167 8.34167 12.8229 8.875 12.6937C9.40833 12.5646 9.95 12.5 10.5 12.5C11.05 12.5 11.5917 12.5646 12.125 12.6937C12.6583 12.8229 13.1833 13.0167 13.7 13.275C13.9417 13.4 14.1354 13.5813 14.2812 13.8187C14.4271 14.0563 14.5 14.3167 14.5 14.6V16H6.5ZM15.5 16V14.5C15.5 14.1333 15.3979 13.7812 15.1938 13.4437C14.9896 13.1063 14.7 12.8167 14.325 12.575C14.75 12.625 15.15 12.7104 15.525 12.8313C15.9 12.9521 16.25 13.1 16.575 13.275C16.875 13.4417 17.1042 13.6271 17.2625 13.8313C17.4208 14.0354 17.5 14.2583 17.5 14.5V16H15.5ZM10.5 12C9.95 12 9.47917 11.8042 9.0875 11.4125C8.69583 11.0208 8.5 10.55 8.5 10C8.5 9.45 8.69583 8.97917 9.0875 8.5875C9.47917 8.19583 9.95 8 10.5 8C11.05 8 11.5208 8.19583 11.9125 8.5875C12.3042 8.97917 12.5 9.45 12.5 10C12.5 10.55 12.3042 11.0208 11.9125 11.4125C11.5208 11.8042 11.05 12 10.5 12ZM15.5 10C15.5 10.55 15.3042 11.0208 14.9125 11.4125C14.5208 11.8042 14.05 12 13.5 12C13.4083 12 13.2917 11.9896 13.15 11.9688C13.0083 11.9479 12.8917 11.925 12.8 11.9C13.025 11.6333 13.1979 11.3375 13.3187 11.0125C13.4396 10.6875 13.5 10.35 13.5 10C13.5 9.65 13.4396 9.3125 13.3187 8.9875C13.1979 8.6625 13.025 8.36667 12.8 8.1C12.9167 8.05833 13.0333 8.03125 13.15 8.01875C13.2667 8.00625 13.3833 8 13.5 8C14.05 8 14.5208 8.19583 14.9125 8.5875C15.3042 8.97917 15.5 9.45 15.5 10ZM7.5 15H13.5V14.6C13.5 14.5083 13.4771 14.425 13.4313 14.35C13.3854 14.275 13.325 14.2167 13.25 14.175C12.8 13.95 12.3458 13.7812 11.8875 13.6688C11.4292 13.5563 10.9667 13.5 10.5 13.5C10.0333 13.5 9.57083 13.5563 9.1125 13.6688C8.65417 13.7812 8.2 13.95 7.75 14.175C7.675 14.2167 7.61458 14.275 7.56875 14.35C7.52292 14.425 7.5 14.5083 7.5 14.6V15ZM10.5 11C10.775 11 11.0104 10.9021 11.2063 10.7062C11.4021 10.5104 11.5 10.275 11.5 10C11.5 9.725 11.4021 9.48958 11.2063 9.29375C11.0104 9.09792 10.775 9 10.5 9C10.225 9 9.98958 9.09792 9.79375 9.29375C9.59792 9.48958 9.5 9.725 9.5 10C9.5 10.275 9.59792 10.5104 9.79375 10.7062C9.98958 10.9021 10.225 11 10.5 11Z"
                fill="#3E3E3E"
              />
            </g>
            <defs>
              <clipPath id="clip0_8109_38558">
                <rect width="11" height="16" fill="white" transform="translate(6.5 4)" />
              </clipPath>
            </defs>
          </svg>
          <span className="ml-1">{formState.submissionType.type}</span>
        </span>
        <span className="body-xs text-neutral-medium-gray">1 member</span>
      </div>
      <hr className="my-1" />
      <div className="flex flex-col gap-4 py-1">
        {formState.submissionType.members.map((member) => {
          return (
            <div key={member.info.name} className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Image src={'/images/user/login_avatar.svg'} alt="测试" width={24} height={24} />
                <span>{member.info.name}</span>
              </div>
              <span>{member.role}</span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="">
      <p className="body-l text-left text-neutral-off-black">
        Please check all information before you submit the registration
      </p>
      <div className="mt-4 flex gap-6 [&>div]:w-[calc(50%-12px)]">
        <div className="flex flex-col gap-6">
          {NameBlock}
          {ContractInfoBlock}
          {BioBlock}
        </div>
        {TeamBlock}
      </div>
    </div>
  );
};

const arrowIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.1671 8.44032L5.83375 14.4403C5.59058 14.7161 5.17001 14.743 4.89375 14.5003C4.61795 14.2572 4.5911 13.8366 4.83375 13.5603L9.77375 8.00032L4.83375 2.44032C4.60988 2.16238 4.64461 1.75743 4.91253 1.52166C5.18045 1.28589 5.58653 1.30293 5.83375 1.56032L11.1671 7.56032C11.3882 7.81199 11.3882 8.18865 11.1671 8.44032Z"
      fill="#131313"
    />
  </svg>
);

export default SubmitReview;
