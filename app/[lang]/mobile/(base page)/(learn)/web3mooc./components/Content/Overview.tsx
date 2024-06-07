'use client';
import { TransNs, Lang } from '@/i18n/config';
import React, { useEffect, useRef, useState } from 'react';
import OverviewCover from '@/public/images/learn/overview_cover.png';
import NtuLogoText from '@/public/images/learn/ntu_logo_text.svg';
import HackLogo from '@/public/images/learn/hack_logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import Button from '@/components/Common/Button';
import { NTU_ZOOM_LINK, overviewData } from '@/app/[lang]/(web)/(base page)/(learn)/web3mooc/constants/data';
import { useTranslation } from '@/i18n/client';
import { useGlobalStore } from '@/store/zustand/globalStore';
import webApi from '@/service';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRequest } from 'ahooks';
import VideoModal from './VideoModal';
import RegisterSuccessModal from './RegisterSuccessModal';
import { useUserStore } from '@/store/zustand/userStore';
import { NavType } from '@/components/Mobile/MobLayout/constant';

interface OverviewProp {
  lang: Lang;
}

const Overview: React.FC<OverviewProp> = ({ lang }) => {
  const { t } = useTranslation(lang, TransNs.LEARN);
  const mobileNavModalToggleOpenHandle = useGlobalStore((state) => state.mobileNavModalToggleOpenHandle);
  const [open, setOpen] = useState(false);
  const ref = useRef<{ open: VoidFunction }>(null);
  const query = useSearchParams();
  const pathname = usePathname();
  const isRegisterQuery = query.get('isRegister');
  const userInfo = useUserStore((state) => state.userInfo);
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
    <div className="">
      <div className="relative mb-[1.75rem] w-full pt-[100%]">
        <Image src={OverviewCover} fill alt="npt-course" priority className="object-cover" />
        {/* <div className="group absolute left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-black/50 hover:bg-black/70">
          <span className="transition group-hover:scale-125" onClick={() => setOpen(true)}>
            <FaRegCirclePlay color={'#f4f4f4'} size={80} />
          </span>
        </div> */}
      </div>

      <div className="flex flex-col gap-[1.25rem]">
        <h1 className="text-h3-mob">{t(overviewData.name)}</h1>
        <div className="body-s">
          <p className="mb-[.25rem] text-neutral-medium-gray">{t('ntuCourse.date')}</p>
          <p>{overviewData.date}</p>
        </div>
        <div className="body-s">
          <p className="mb-[.25rem] text-neutral-medium-gray">{t('ntuCourse.time')}</p>
          <p>{overviewData.time}</p>
        </div>
        <div className="body-s">
          <p className="mb-[.25rem] text-neutral-medium-gray">{t('ntuCourse.overview.format')}</p>
          <p>{overviewData.format}</p>
        </div>
        <div className="body-s">
          <p className="mb-[.25rem] text-neutral-medium-gray">{t('ntuCourse.overview.hosts')}</p>
          <div className="flex items-center gap-[1.25rem]">
            <Image src={HackLogo} width={90} alt="hack_logo" />
            <div className="flex items-center gap-[.125rem]">
              <Image src={NtuLogoText} width={148} alt="htu_logo" />
            </div>
          </div>
        </div>
        <div className="body-s">
          <p className="mb-[.25rem] text-neutral-medium-gray">{t('ntuCourse.overview.discussionGroups')}</p>
          <div className="flex items-center gap-9">
            {overviewData.discussionGroups.map((v) => (
              <Link key={v.name} href={v.link} target="_blank">
                <div className="flex items-center gap-[.25rem]">
                  {v.icon(18)}
                  <div className="relative flex items-center gap-[.25rem]">
                    <span>{v.name}</span>
                    <IoIosArrowForward />
                    <div className="absolute bottom-0 left-0 h-[.125rem] w-full rounded-[.125rem] bg-yellow-dark"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full pt-[.625rem]">
          <Link
            href={!userInfo ? '#' : !data?.isRegister ? overviewData.registerLink : NTU_ZOOM_LINK}
            target={userInfo ? '_blank' : ''}
            onClick={(e) => {
              if (!userInfo) e.preventDefault();
            }}
          >
            <Button
              type="primary"
              disabled={loading}
              className="button-text-m h-[3rem] w-full uppercase text-neutral-off-black"
              onClick={(e) => {
                if (!userInfo) {
                  e.stopPropagation();
                  mobileNavModalToggleOpenHandle.setNavType(NavType.AUTH);
                  mobileNavModalToggleOpenHandle.toggleOpen();
                }
              }}
            >
              {data?.isRegister ? t('ntuCourse.overview.zoomLink') : t('ntuCourse.overview.registerNow')}
            </Button>
          </Link>
        </div>
      </div>
      <RegisterSuccessModal ref={ref} className={'w-full'} />
      <VideoModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default Overview;
