import { FC } from 'react';
import { FormComponentProps } from '..';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import { cn } from '@/helper/utils';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { message } from 'antd';
import { errorMessage } from '@/helper/ui';
import { useRedirect } from '@/hooks/router/useRedirect';

interface SubmitReviewProps {}

const SubmitReview: FC<Omit<FormComponentProps, 'type' | 'onNext' | 'tracks'>> = ({
  formState,
  setCurrentStep,
  onBack,
  projectId,
  simpleHackathonInfo
}) => {
  const gotoStep = (step: number) => {
    setCurrentStep(step);
  };

  const { redirectToUrl } = useRedirect();

  const { info, projectDemo, others, wallet, isSubmit } = formState;

  const { run: submit, loading } = useRequest(
    () => {
      return webApi.resourceStationApi.projectSubmit(projectId!);
    },
    {
      manual: true,
      onSuccess() {
        !isSubmit && message.success(`Submit ${info.projectName} success!`);
        isSubmit && message.success(`Update register info success!`);
        redirectToUrl(`/hackathon/${simpleHackathonInfo.alias}`);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  return (
    <div>
      <div className="">
        <p className="body-l text-left text-neutral-off-black">Please check your project information</p>
        <div className="mt-4 flex gap-6 [&>div]:w-[calc(50%-12px)]">
          <div className="flex flex-col  gap-4 rounded-[8px] border border-neutral-light-gray p-6 text-left">
            {/* Logo */}
            <div className="flex h-12 w-full cursor-pointer items-center justify-between" onClick={() => gotoStep(0)}>
              <div className="flex flex-1">
                <span className="body-s flex w-[130px] items-center text-neutral-rich-gray">Logo</span>
                <Image
                  src={formState.info.projectLogo}
                  alt="logo"
                  width={48}
                  height={48}
                  className="rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]"
                />
              </div>
              {arrowIcon}
            </div>

            {/*Project  Name */}
            <hr className="h-[1px] scale-y-50 border-none bg-neutral-medium-gray" />
            <div className="flex w-full cursor-pointer items-center justify-between" onClick={() => gotoStep(0)}>
              <div className="flex flex-1 items-center">
                <span className="body-s flex w-[130px] items-center text-neutral-rich-gray">Name</span>
                <span className="body-s text-neutral-off-black">{info.projectName}</span>
              </div>
              {arrowIcon}
            </div>

            {/* Track */}
            <hr className="h-[1px] scale-y-50 border-none bg-neutral-medium-gray" />
            <div className="flex w-full cursor-pointer items-center justify-between" onClick={() => gotoStep(0)}>
              <div className="flex flex-1 items-center">
                <span className="body-s flex w-[130px] items-center text-neutral-rich-gray">Track</span>
                <span className="body-s text-neutral-off-black">{info.track}</span>
              </div>
              {arrowIcon}
            </div>

            {/* Patch Video */}
            <hr className="h-[1px] scale-y-50 border-none bg-neutral-medium-gray" />
            <div className="flex h-12 w-full cursor-pointer items-center justify-between" onClick={() => gotoStep(1)}>
              <div className="flex flex-1">
                <span className="body-s flex w-[130px] items-center text-neutral-rich-gray">Pitch Video</span>
                {formState.pitchVideo && (
                  <Image
                    src={'/images/icons/video_icon.png'}
                    alt="pitch video"
                    width={48}
                    height={48}
                    className="rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]"
                  />
                )}
              </div>
              {arrowIcon}
            </div>

            {/* Project Demo */}
            <hr className="h-[1px] scale-y-50 border-none bg-neutral-medium-gray" />
            <div className="flex h-12 w-full cursor-pointer items-center justify-between" onClick={() => gotoStep(2)}>
              <div className="flex flex-1">
                <span className="body-s flex w-[130px] items-center text-neutral-rich-gray">Project Demo</span>
                {formState.projectDemo && (
                  <Image
                    src={'/images/icons/video_icon.png'}
                    alt="demo video"
                    width={48}
                    height={48}
                    className="rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]"
                  />
                )}
              </div>
              {arrowIcon}
            </div>

            {/* Github Link */}
            <hr className="h-[1px] scale-y-50 border-none bg-neutral-medium-gray" />
            <div className="flex w-full cursor-pointer items-center justify-between" onClick={() => gotoStep(3)}>
              <div className="flex flex-1 items-center">
                <span className="body-s flex w-[130px] items-center text-neutral-rich-gray">Github</span>
                <span className="body-s text-neutral-off-black">{others.githubLink}</span>
              </div>
              {arrowIcon}
            </div>

            {/* Open Source */}
            <hr className="h-[1px] scale-y-50 border-none bg-neutral-medium-gray" />
            <div className="flex w-full cursor-pointer items-center justify-between" onClick={() => gotoStep(3)}>
              <div className="flex flex-1 items-center">
                <span className="body-s flex w-[130px] items-center text-neutral-rich-gray">Open Source</span>
                <span className="body-s text-neutral-off-black">{others.isPublic ? 'Yes' : 'No'}</span>
              </div>
              {arrowIcon}
            </div>
          </div>

          <div className="flex flex-col  gap-6 text-left">
            <div className="flex min-h-[102px]  flex-col gap-2 rounded-[8px] border border-neutral-light-gray px-6 py-3">
              <div
                className="body-s flex cursor-pointer items-center justify-between text-neutral-rich-gray"
                onClick={() => gotoStep(0)}
              >
                <span>One Line Introduction</span>
                {arrowIcon}
              </div>
              <p className="caption-12pt text-left text-neutral-off-black">{formState.info.intro}</p>
            </div>
            <div className="flex min-h-[236px]  flex-col gap-2 rounded-[8px] border border-neutral-light-gray px-6 py-3">
              <div
                className="body-s flex cursor-pointer items-center justify-between text-neutral-rich-gray"
                onClick={() => gotoStep(0)}
              >
                <span>Detailed Introduction</span>
                {arrowIcon}
              </div>
              <p className="caption-12pt text-left text-neutral-off-black">{formState.info.detailedIntro}</p>
            </div>
            <div className="flex min-h-[102px]  flex-col gap-4 rounded-[8px] border border-neutral-light-gray px-6 py-3">
              <div
                className="body-s flex cursor-pointer items-center justify-between text-neutral-rich-gray"
                onClick={() => gotoStep(4)}
              >
                <span>Wallet Information</span>
                {arrowIcon}
              </div>
              <p className="body-s flex gap-1 text-left text-neutral-off-black">
                <Image src={'/images/login/metamask.svg'} alt="wallet" width={24} height={24} />
                <span>{formState.wallet?.toString()?.replace(/(.{15})(.*)(.{4})/, '$1...$3')}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button ghost className="button-text-m w-[165px] px-0 py-4 uppercase" onClick={onBack} htmlType="button">
          Back
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          className={cn('button-text-m w-[165px] px-0 py-4 uppercase')}
          // disabled={disabled}
          onClick={submit}
          loading={loading}
        >
          {isSubmit ? 'update' : 'submit'}
        </Button>
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
