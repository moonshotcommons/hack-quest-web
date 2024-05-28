import { FC, useRef } from 'react';
import { FormComponentProps } from '..';
import Image from 'next/image';
import Button from '@/components/Common/Button';
import { cn } from '@/helper/utils';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import message from 'antd/es/message';
import { errorMessage } from '@/helper/ui';
import { useRedirect } from '@/hooks/router/useRedirect';
import { LOCATIONS_SHORT } from '../../constants';
import { ProjectLocation } from '@/service/webApi/resourceStation/type';
import Link from 'next/link';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';

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

  const confirmModal = useRef<ConfirmModalRef>(null);

  const { runAsync: submit, loading } = useRequest(
    () => {
      return webApi.resourceStationApi.projectSubmit(projectId!);
    },
    {
      manual: true,
      onSuccess() {
        !isSubmit && message.success(`Submit ${info.projectName} success!`);
        isSubmit && message.success(`Update register info success!`);
        if (simpleHackathonInfo.id === '61b378f5-14ce-4136-b0f4-74b659175013') {
          window.open('https://aspecta.id/builder-matrix/Linea-builder-launchpad');
        }
        redirectToUrl(`/hackathon/dashboard`);
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
          <div className="flex h-[450px] flex-col rounded-[8px] border border-neutral-light-gray px-6 py-3 text-left">
            <div
              className="body-s flex cursor-pointer items-center justify-between text-neutral-rich-gray"
              onClick={() => gotoStep(0)}
            >
              <span>Basic Info</span>
              {arrowIcon}
            </div>
            {/* Logo */}
            <div className=" mt-2 flex flex-col gap-2">
              <div className="flex flex-1 justify-between">
                <span className="body-xs flex items-center text-neutral-rich-gray">Logo</span>
                <Image
                  src={formState.info.projectLogo}
                  alt="logo"
                  width={24}
                  height={24}
                  className="rounded-[4px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]"
                />
              </div>
              <div className="flex flex-1 items-center justify-between">
                <span className="body-xs flex items-center  text-neutral-rich-gray">Name</span>
                <span className="body-xs text-neutral-off-black">{info.projectName}</span>
              </div>
              <div className="flex flex-1 items-center justify-between">
                <span className="body-xs flex items-center  text-neutral-rich-gray">Location</span>
                <span className="body-xs text-neutral-off-black">
                  {LOCATIONS_SHORT[info.location as ProjectLocation]}
                </span>
              </div>
              <div className="flex flex-1 items-center justify-between">
                <span className="body-xs flex items-center  text-neutral-rich-gray">Prize Track</span>
                <span className="body-xs text-neutral-off-black">{info.prizeTrack}</span>
              </div>
              <div className="flex flex-1 items-center justify-between">
                <span className="body-xs flex items-center  text-neutral-rich-gray">Hackathon Track</span>
                <span className="body-xs text-neutral-off-black">{info.track}</span>
              </div>
            </div>
            {/* Track */}
            <div className="my-4 h-[1px] w-full scale-y-50 border-none bg-neutral-medium-gray" />
            <div className="body-xs flex flex-col gap-1  text-neutral-off-black">
              <span>One Line Introduction</span>
              <div className="caption-12pt line-clamp-2 h-[32px] w-full leading-normal">{info.intro}</div>
            </div>
            <div className="my-4 h-[1px] w-full scale-y-50 border-none bg-neutral-medium-gray" />
            <div className="body-xs flex flex-col gap-1 text-neutral-off-black">
              <span>Detailed Introduction</span>
              <p className="caption-12pt line-clamp-[7] h-[112px] w-full leading-normal">{info.detailedIntro}</p>
            </div>
            {/* <div className="flex w-full cursor-pointer items-center justify-between" onClick={() => gotoStep(0)}>
              <div className="flex flex-1 items-center">
                <span className="body-s flex w-[130px] items-center text-neutral-rich-gray">Track</span>
                <span className="body-s text-neutral-off-black">{info.track}</span>
              </div>
              {arrowIcon}
            </div> */}

            {/* Patch Video */}
            {/* <hr className="my-4 h-[1px] scale-y-50 border-none bg-neutral-medium-gray" /> */}
            {/* <div className="flex h-12 w-full cursor-pointer items-center justify-between" onClick={() => gotoStep(1)}>
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
            </div> */}

            {/* Project Demo */}
            {/* <hr className="h-[1px] scale-y-50 border-none bg-neutral-medium-gray" />
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
            </div> */}

            {/* Github Link */}
            {/* <hr className="h-[1px] scale-y-50 border-none bg-neutral-medium-gray" />
            <div className="flex w-full cursor-pointer items-center justify-between" onClick={() => gotoStep(3)}>
              <div className="flex flex-1 items-center">
                <span className="body-s flex w-[130px] items-center text-neutral-rich-gray">Github</span>
                <span className="body-s text-neutral-off-black">{others.githubLink}</span>
              </div>
              {arrowIcon}
            </div> */}

            {/* Open Source */}
            {/* <hr className="h-[1px] scale-y-50 border-none bg-neutral-medium-gray" />
            <div className="flex w-full cursor-pointer items-center justify-between" onClick={() => gotoStep(3)}>
              <div className="flex flex-1 items-center">
                <span className="body-s flex w-[130px] items-center text-neutral-rich-gray">Open Source</span>
                <span className="body-s text-neutral-off-black">{others.isPublic ? 'Yes' : 'No'}</span>
              </div>
              {arrowIcon}
            </div> */}
          </div>
          <div className="flex flex-col  gap-6 text-left">
            <div
              className="flex h-[96px] items-center justify-between rounded-[8px] border border-neutral-light-gray p-6"
              onClick={() => gotoStep(1)}
            >
              <div className="flex flex-1 items-center">
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
            <div
              className="flex h-[96px] items-center justify-between rounded-[8px] border border-neutral-light-gray p-6"
              onClick={() => gotoStep(2)}
            >
              <div className="flex flex-1 items-center">
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
            <div className="flex h-[100px]  flex-col gap-2 rounded-[8px] border border-neutral-light-gray px-6 py-3">
              <div
                className="body-s flex cursor-pointer items-center justify-between text-neutral-rich-gray"
                onClick={() => gotoStep(3)}
              >
                <span>Other Info</span>
                {arrowIcon}
              </div>
              <div className="flex flex-1 items-center justify-between gap-4">
                <span className="body-xs flex items-center  text-neutral-rich-gray">Github</span>
                <Link href={others.githubLink} className="body-xs truncate text-neutral-off-black">
                  {others.githubLink}
                </Link>
              </div>
              <div className="flex flex-1 items-center justify-between">
                <span className="body-xs flex items-center  text-neutral-rich-gray">Open Source</span>
                <span className="body-xs text-neutral-off-black">{others.isPublic ? 'Yes' : 'No'}</span>
              </div>
            </div>
            <div className="flex h-[86px]  flex-col gap-4 rounded-[8px] border border-neutral-light-gray px-6 py-3">
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
          onClick={() => {
            confirmModal.current?.open({
              onConfirm: submit
            });
          }}
          loading={loading}
        >
          {isSubmit ? 'update' : 'submit'}
        </Button>
      </div>
      <ConfirmModal ref={confirmModal} confirmText="YES">
        <h4 className="text-h4 text-center text-neutral-black">Do you want to submit your project?</h4>
        <p className="body-m mt-5 text-center text-neutral-off-black">
          After successful submission, you will be directed to Aspecta’s builder Launchpad page. You can attest to your
          builder’s identity and join Linea Buidlers Club there.{' '}
        </p>
      </ConfirmModal>
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
