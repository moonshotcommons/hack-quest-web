import React, { useContext, useMemo, useState } from 'react';
import EditBox from '../EditBox';
import { ApplicationStatus, HackathonStatus, HackathonType } from '@/service/webApi/resourceStation/type';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';
import Link from 'next/link';
import Button from '@/components/Common/Button';
import MenuLink from '@/constants/MenuLink';
import { useRedirect } from '@/hooks/router/useRedirect';
import { AuthType, useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import WarningModal from './WarningModal';
import Image from 'next/image';
import CountDown from '@/components/Web/Business/CountDown';
import webApi from '@/service';
import { message } from 'antd';
import { errorMessage } from '@/helper/ui';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';

interface DetailInfoProp {
  hackathon: HackathonType;
}

const DetailInfo: React.FC<DetailInfoProp> = ({ hackathon }) => {
  const query = useSearchParams();
  const { userInfo, setAuthModalOpen, setAuthType } = useUserStore(
    useShallow((state) => ({
      userInfo: state.userInfo,
      setAuthModalOpen: state.setAuthModalOpen,
      setAuthType: state.setAuthType
    }))
  );
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { getStepIndex, getLinks, getHackathonTimeSame } = useDealHackathonData();
  const isSame = getHackathonTimeSame(hackathon);
  const [loading, setLoading] = useState(false);
  const { redirectToUrl } = useRedirect();
  const [warningOpen, setWarningOpen] = useState(false);
  const stepIndex = getStepIndex(hackathon);
  const links = getLinks(hackathon);
  const handleSubmit = (id: string) => {
    if (
      hackathon.participation?.team?.creatorId === hackathon.participation?.userId ||
      !Object.keys(hackathon.participation?.team || {}).length
    ) {
      redirectToUrl(`/form${MenuLink.HACKATHON}/${hackathon.id}/submission/${id}`);
    } else {
      setWarningOpen(true);
    }
  };
  const handleRegister = () => {
    if (!userInfo) {
      setAuthModalOpen(true);
      setAuthType(AuthType.LOGIN);
    } else {
      const utm = query.get('utm');
      const url = `/form${MenuLink.HACKATHON}/${hackathon.id}/register`;
      const path = utm ? `${url}?utm=${utm}` : url;
      redirectToUrl(path);
    }
  };
  const handleSubmitPublish = () => {
    if (loading) return;
    setLoading(true);
    webApi.resourceStationApi
      .submitPublish(hackathon.id)
      .then(() => {
        message.success('Submit Success');
        window.location.reload();
      })
      .catch((err) => {
        errorMessage(err);
        setLoading(false);
      });
  };
  const needConfirm = useMemo(() => {
    return !!(
      hackathon.participation?.joinState === ApplicationStatus.APPROVED &&
      !hackathon.participation?.isRegister &&
      stepIndex <= 2
    );
  }, [hackathon]);
  const renderButton = () => {
    if (hackathon.status !== HackathonStatus.PUBLISH || needConfirm) {
      return null;
    }
    if (stepIndex > -1 && stepIndex <= 2) {
      if (isSame) {
        if (hackathon.participation?.isRegister) {
          if (
            (hackathon.info?.allowSubmission === false || hackathon.allowSubmission === false) &&
            hackathon.participation?.joinState !== ApplicationStatus.APPROVED
          ) {
            return (
              <Button
                type="primary"
                disabled
                className="h-[60px] w-full bg-neutral-light-gray font-medium  text-neutral-medium-gray opacity-100"
              >
                <div>
                  <p className="button-text-l uppercase">Pending</p>
                  <p className="caption-10pt font-light leading-normal">{`You'll be notified by ${dayjs(hackathon.timeline?.submissionOpen).format('MMM D,YYYY H:mm')}`}</p>
                </div>
              </Button>
            );
          }
          if (!hackathon?.participation?.isSubmit) {
            return !hackathon?.participation?.project?.id ? (
              <Button
                className="button-text-l h-[60px] w-full bg-yellow-primary uppercase"
                onClick={() => handleSubmit('-1')}
              >
                {t('submitNow')}
              </Button>
            ) : (
              <Button
                className="button-text-l h-[60px] w-full bg-yellow-primary uppercase"
                onClick={() => handleSubmit(hackathon.participation?.project?.id as string)}
              >
                {t('continueSubmission')}
              </Button>
            );
          } else {
            return (
              <Link href={`${MenuLink.PROJECTS}/${hackathon.participation?.project?.id}/edit`}>
                <Button type="primary" className="button-text-l h-[60px] w-full  uppercase text-neutral-black">
                  {t('hackathonDetail.editSubmission')}
                </Button>
              </Link>
            );
          }
        } else {
          if (hackathon.participation?.joinState !== ApplicationStatus.REVIEW) {
            const buttonText = !hackathon.participation?.status ? t('register') : t('continueRegister');
            return (
              <Button className="button-text-l h-[60px] w-full bg-yellow-primary uppercase" onClick={handleRegister}>
                {buttonText}
              </Button>
            );
          } else {
            return (
              <Button
                type="primary"
                disabled
                className="h-[60px] w-full bg-neutral-light-gray font-medium  text-neutral-medium-gray opacity-100"
              >
                <div>
                  <p className="button-text-l uppercase">Pending</p>
                  <p className="caption-10pt font-light leading-normal">{`You'll be notified by ${dayjs(hackathon.timeline?.submissionOpen).format('MMM D,YYYY H:mm')}`}</p>
                </div>
              </Button>
            );
          }
        }
      } else {
        if (
          dayjs().isAfter(dayjs.utc(hackathon.timeline?.registrationOpen).local()) &&
          dayjs().isBefore(dayjs.utc(hackathon.timeline?.registrationClose).local())
        ) {
          if (hackathon.participation?.isRegister) {
            if (
              (hackathon.info?.allowSubmission === false || hackathon.allowSubmission === false) &&
              hackathon.participation?.joinState !== ApplicationStatus.APPROVED
            ) {
              return (
                <Button
                  type="primary"
                  disabled
                  className="h-[60px] w-full bg-neutral-light-gray font-medium  text-neutral-medium-gray opacity-100"
                >
                  <div>
                    <p className="button-text-l uppercase">Pending</p>
                    <p className="caption-10pt font-light leading-normal">{`You'll be notified by ${dayjs.utc(hackathon.timeline?.submissionOpen).local().format('MMM D,YYYY H:mm')}`}</p>
                  </div>
                </Button>
              );
            }
          } else {
            if (hackathon.participation?.joinState !== ApplicationStatus.REVIEW) {
              const buttonText = !hackathon.participation?.status ? t('register') : t('continueRegister');
              return (
                <Button className="button-text-l h-[60px] w-full bg-yellow-primary uppercase" onClick={handleRegister}>
                  {buttonText}
                </Button>
              );
            } else {
              return (
                <Button
                  type="primary"
                  disabled
                  className="h-[60px] w-full bg-neutral-light-gray font-medium  text-neutral-medium-gray opacity-100"
                >
                  <div>
                    <p className="button-text-l uppercase">Pending</p>
                    <p className="caption-10pt font-light leading-normal">{`You'll be notified by ${dayjs(hackathon.timeline?.submissionOpen).format('MMM D,YYYY H:mm')}`}</p>
                  </div>
                </Button>
              );
            }
          }
        }
        if (stepIndex === 1 && hackathon.participation?.isRegister) {
          return (
            <Button
              type="primary"
              disabled
              className="h-[60px] w-full bg-neutral-light-gray font-medium  text-neutral-medium-gray opacity-100"
            >
              <div>
                <p className="button-text-l uppercase">Submission Start Date</p>
                <p className="caption-10pt font-light leading-normal">{`${dayjs.utc(hackathon.timeline?.submissionOpen).local().format('MMM D,YYYY H:mm')}`}</p>
              </div>
            </Button>
          );
        }
        if (
          dayjs().isAfter(dayjs.utc(hackathon.timeline?.submissionOpen).local()) &&
          dayjs().isBefore(dayjs.utc(hackathon.timeline?.submissionClose).local()) &&
          hackathon.participation?.isRegister
        ) {
          if (!hackathon?.participation?.isSubmit) {
            return !hackathon?.participation?.project?.id ? (
              <Button
                className="button-text-l h-[60px] w-full bg-yellow-primary uppercase"
                onClick={() => handleSubmit('-1')}
              >
                {t('submitNow')}
              </Button>
            ) : (
              <Button
                className="button-text-l h-[60px] w-full bg-yellow-primary uppercase"
                onClick={() => handleSubmit(hackathon.participation?.project?.id as string)}
              >
                {t('continueSubmission')}
              </Button>
            );
          } else {
            return (
              <Link href={`${MenuLink.PROJECTS}/${hackathon.participation?.project?.id}/edit`}>
                <Button type="primary" className="button-text-l h-[60px] w-full  uppercase text-neutral-black">
                  {t('hackathonDetail.editSubmission')}
                </Button>
              </Link>
            );
          }
        }
      }
    }

    return (
      <Link href={`${MenuLink.PROJECTS}?keyword=${hackathon.name}`}>
        <Button ghost className="button-text-l h-[60px] w-full border-neutral-black uppercase text-neutral-black">
          {t('viewAllProjects')}
        </Button>
      </Link>
    );
  };

  const tipsRender = () => {
    if (hackathon.participation?.isRegister || hackathon.participation?.isSubmit) {
      return (
        <div className="caption-12pt absolute left-0 top-0 flex h-[40px] w-full items-center justify-center gap-[4px] bg-yellow-extra-light py-[12px] text-neutral-off-black ">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.9987 0.333008C3.3168 0.333008 0.332031 3.31778 0.332031 6.99967C0.332031 10.6816 3.3168 13.6663 6.9987 13.6663C10.6806 13.6663 13.6654 10.6816 13.6654 6.99967C13.6654 5.23156 12.963 3.53587 11.7127 2.28563C10.4625 1.03539 8.76681 0.333008 6.9987 0.333008ZM7.47204 10.8066C7.40724 10.8655 7.33283 10.9129 7.25204 10.9466C7.09068 11.018 6.90674 11.018 6.74538 10.9466C6.66459 10.9129 6.59018 10.8655 6.52538 10.8066C6.40058 10.6808 6.33102 10.5105 6.33204 10.3333C6.33102 10.1561 6.40058 9.98579 6.52538 9.85998C6.68298 9.7039 6.90789 9.63643 7.12538 9.67998C7.16953 9.68616 7.21234 9.69968 7.25204 9.71998C7.29453 9.73457 7.33488 9.75475 7.37204 9.77998C7.40697 9.80459 7.44036 9.83131 7.47204 9.85998C7.59386 9.98773 7.66292 10.1568 7.66538 10.3333C7.6664 10.5105 7.59683 10.6808 7.47204 10.8066ZM6.9987 8.33333C7.36689 8.33333 7.66536 8.03486 7.66536 7.66667V3.66667C7.66536 3.29848 7.36689 3 6.9987 3C6.63051 3 6.33203 3.29848 6.33203 3.66667V7.66667C6.33203 8.03486 6.63051 8.33333 6.9987 8.33333Z"
              fill="#FAD81C"
            />
          </svg>
          {hackathon.participation?.isSubmit ? (
            <span>{t('hackathonDetail.haveSubmission')}</span>
          ) : (
            <span>{t('hackathonDetail.haveRegistered')}</span>
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  const statusRender = () => {
    if (stepIndex >= 0) {
      if (isSame) {
        return (
          <div className="flex">
            {stepIndex <= 2 ? (
              <div className="body-s-bold rounded-[8px]  border-[2px] border-status-success px-[12px] py-[4px] uppercase uppercase text-status-success">
                {'LIVE NOW'}
              </div>
            ) : stepIndex === 3 ? (
              <div className="body-s-bold  rounded-[8px] border-[2px] border-status-success px-[12px] py-[4px] uppercase text-status-success">
                {'VOTING'}
              </div>
            ) : stepIndex === 4 ? (
              <div className="body-s-bold  rounded-[8px] border-[2px] border-neutral-medium-gray px-[12px] py-[4px] uppercase text-neutral-medium-gray">
                {'ENDED'}
              </div>
            ) : null}
          </div>
        );
      } else {
        return (
          <div className="flex">
            {stepIndex === 0 ? (
              <div className="body-s-bold  rounded-[8px] border-[2px] border-status-success px-[12px] py-[4px] uppercase text-status-success">
                {'LIVE NOW'}
              </div>
            ) : stepIndex === 2 ? (
              <div className="body-s-bold  rounded-[8px] border-[2px] border-status-success px-[12px] py-[4px] uppercase text-status-success">
                {'SUBMISSIONS REVIEW'}
              </div>
            ) : stepIndex === 3 ? (
              <div className="body-s-bold  rounded-[8px] border-[2px] border-status-success px-[12px] py-[4px] uppercase text-status-success">
                {'VOTING'}
              </div>
            ) : stepIndex === 4 ? (
              <div className="body-s-bold  rounded-[8px] border-[2px] border-neutral-medium-gray px-[12px] py-[4px] uppercase text-neutral-medium-gray">
                {'ENDED'}
              </div>
            ) : null}
          </div>
        );
      }
    } else {
      return null;
    }
  };

  const handleConfirmAttendance = () => {
    if (loading) return;
    setLoading(true);
    webApi.resourceStationApi
      .memberConfirmRegister(hackathon.id)
      .then(() => {
        message.success('Confirm Success');
        window.location.reload();
      })
      .catch((err) => {
        errorMessage(err);
        setLoading(false);
      });
  };

  return (
    <EditBox className="relative overflow-hidden">
      <div className={`body-m flex flex-col gap-[16px]  text-neutral-off-black ${tipsRender() ? 'pt-[32px]' : ''}`}>
        {tipsRender()}
        <div>
          <h1 className="text-h3">{hackathon.name}</h1>
          <p className="text-neutral-rich-gray">{hackathon.info?.intro}</p>
        </div>
        {statusRender()}
        {stepIndex <= 0 ? (
          <div>
            <div className="body-m mb-[.25rem] text-neutral-medium-gray">{'Registration Closes In'}</div>
            <CountDown time={hackathon.timeline?.registrationClose} />
          </div>
        ) : stepIndex === 1 ? (
          <div>
            <div className="body-m mb-[.25rem] text-neutral-medium-gray">{'Submission Starts In'}</div>
            <CountDown time={hackathon.timeline?.submissionOpen} />
          </div>
        ) : stepIndex === 2 ? (
          <div>
            <div className="body-m mb-[.25rem] text-neutral-medium-gray">{'Submission Closes In'}</div>
            <CountDown time={hackathon.timeline?.submissionClose} />
          </div>
        ) : null}
        <div className="flex gap-[40px]">
          <div>
            <p className="text-neutral-medium-gray">{t('hackathonDetail.hostBy')}</p>
            <p>{hackathon.info?.host}</p>
          </div>
          <div>
            <p className="text-neutral-medium-gray">{t('hackathonDetail.hackathonMode')}</p>
            <p>{hackathon.info?.allowSubmission === false ? 'OFFLINE' : hackathon.info?.mode}</p>
          </div>
        </div>
        {hackathon.info?.address && hackathon.info?.mode === 'HYBRID' && (
          <div>
            <p className="text-neutral-medium-gray">{t('hackathonDetail.Venue')}</p>
            <p>{hackathon.info?.address}</p>
          </div>
        )}
        {hackathon.members?.length > 0 && (
          <div>
            <p className="text-neutral-medium-gray">{t('participants')}</p>
            <div className="flex items-center gap-[8px]">
              <div className="flex pl-[10px]">
                {hackathon.members.slice(0, 6)?.map((v, i) => (
                  <div
                    key={i}
                    className="relative ml-[-10px] h-[42px] w-[42px] overflow-hidden rounded-[50%] border border-neutral-white"
                  >
                    <Image src={v.avatar} alt={v.firstName} fill className="object-contain"></Image>
                  </div>
                ))}
              </div>

              <p className="body-m">{`${hackathon.memberCount || 0} ${t('hackathonDetail.usersParticipated')}`}</p>
            </div>
          </div>
        )}

        {links?.length > 0 && (
          <div>
            <p className="text-neutral-medium-gray">{`Links`}</p>
            <div className="mt-[4px] flex items-center gap-[12px]">
              {links?.map((v, i) => (
                <Link
                  key={i}
                  href={v.link}
                  target="_blank"
                  className="flex-center h-[40px] w-[40px] rounded-[8px] border border-neutral-light-gray"
                >
                  {v.icon}
                </Link>
              ))}
            </div>
          </div>
        )}

        {renderButton()}
        {userInfo && hackathon.creatorId && userInfo?.id === hackathon.creatorId && (
          <>
            {hackathon.status === HackathonStatus.DRAFT && (
              <Button
                className="button-text-l h-[60px] w-full bg-yellow-primary uppercase"
                loading={loading}
                onClick={handleSubmitPublish}
              >
                {t('hackathonDetail.submitToPreview')}
              </Button>
            )}
            <Link href={`${MenuLink.HACKATHON_ORGANIZER}/${hackathon.alias}`}>
              <Button className="button-text-l h-[60px] w-full bg-yellow-primary uppercase">
                {t('hackathonDetail.backToEdit')}
              </Button>
            </Link>
          </>
        )}
        {needConfirm && (
          <Button
            className="button-text-l h-[60px] w-full bg-yellow-primary uppercase"
            onClick={handleConfirmAttendance}
            loading={loading}
          >
            {t('hackathonDetail.confirmAttendance')}
          </Button>
        )}
        <WarningModal open={warningOpen} onClose={() => setWarningOpen(false)} />
      </div>
    </EditBox>
  );
};

export default DetailInfo;
