import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useEffect, useRef, useState } from 'react';
import OverviewCover from '@/public/images/learn/overview_cover.png';
import NtuLogoText from '@/public/images/learn/ntu_logo_text.png';
import HackLogo from '@/public/images/learn/hack_logo.png';
import Image from 'next/image';
import { overviewData } from '../../constants/data';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import Button from '@/components/Common/Button';
import RegisterSuccessModal from './RegisterSuccessModal';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import VideoModal from './VideoModal';
import { useUserStore } from '@/store/zustand/userStore';
import { isMobile } from 'react-device-detect';
import { useGlobalStore } from '@/store/zustand/globalStore';

interface OverviewProp {}

const Overview: React.FC<OverviewProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);
  const ref = useRef<{ open: VoidFunction }>(null);
  const [open, setOpen] = useState(false);

  const userInfo = useUserStore((state) => state.userInfo);
  const setAuthModalOpen = useUserStore((state) => state.setAuthModalOpen);
  const setTipsModalOpenState = useGlobalStore((state) => state.setTipsModalOpenState);

  const query = useSearchParams();
  const pathname = usePathname();
  const isRegisterQuery = query.get('isRegister');
  const { data, run, loading } = useRequest(
    () => {
      return webApi.courseApi.getNtuRegisterInfo();
    },
    {
      manual: true
    }
  );

  useEffect(() => {
    run();
    if (isRegisterQuery === 'true') {
      ref.current?.open();
      window.history.replaceState({}, '', pathname);
    }
  }, []);

  return (
    <div className="flex gap-[40px]">
      <div className="relative h-[498px] w-[498px] flex-shrink-0">
        <Image src={OverviewCover} fill alt="npt-course" priority className="object-cover" />
        {/* <div className="group absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-black/50 hover:bg-black/70">
          <span className="transition group-hover:scale-125" onClick={() => setOpen(true)}>
            <FaRegCirclePlay color={'#f4f4f4'} size={80} />
          </span>
        </div> */}
      </div>

      <div className="flex h-[498px] flex-col justify-between">
        <h1 className="text-h2">{t(overviewData.name)}</h1>
        <div className="body-m">
          <p className="mb-[4px] text-neutral-medium-gray">{t('ntuCourse.time')}</p>
          <p>{overviewData.time}</p>
        </div>
        <div className="body-m">
          <p className="mb-[4px] text-neutral-medium-gray">{t('ntuCourse.overview.format')}</p>
          <p>{overviewData.format}</p>
        </div>
        <div className="body-m">
          <p className="mb-[4px] text-neutral-medium-gray">{t('ntuCourse.overview.hosts')}</p>
          <div className="flex items-center gap-[20px]">
            <Image src={HackLogo} height={32} alt="hack_logo" />
            <div className="flex items-center gap-[2px]">
              <Image src={NtuLogoText} height={32} alt="htu_logo" />
            </div>
          </div>
        </div>
        <div className="body-m">
          <p className="mb-[4px] text-neutral-medium-gray">{t('ntuCourse.overview.discussionGroups')}</p>
          <div className="flex items-center gap-[40px]">
            {overviewData.discussionGroups.map((v) => (
              <Link key={v.name} href={v.link} target="_blank">
                <div className="flex items-center gap-[8px]">
                  {v.icon()}
                  <div className="relative flex items-center gap-[6px]">
                    <span>{v.name}</span>
                    <IoIosArrowForward />
                    <div className="absolute bottom-0 left-0 h-[2px] w-full rounded-[2px] bg-yellow-dark"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full pt-[20px]">
          <Link
            href={!userInfo ? '#' : overviewData.registerLink}
            target={userInfo ? '_blank' : ''}
            onClick={(e) => {
              if (!userInfo) e.preventDefault();
            }}
          >
            <Button
              type="primary"
              className="button-text-l h-[60px] w-full uppercase text-neutral-off-black"
              disabled={loading || data?.isRegister}
              loading={loading}
              onClick={(e) => {
                if (isMobile) {
                  setTipsModalOpenState(true);
                  return;
                }
                if (!userInfo) {
                  e.stopPropagation();
                  setAuthModalOpen(true);
                }
              }}
            >
              {data?.isRegister ? t('ntuCourse.overview.registered') : t('ntuCourse.overview.registerNow')}
            </Button>
          </Link>
        </div>
      </div>
      <RegisterSuccessModal ref={ref} />
      <VideoModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Overview;
