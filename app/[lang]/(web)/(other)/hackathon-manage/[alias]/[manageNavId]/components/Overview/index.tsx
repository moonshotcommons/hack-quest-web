'use client';
import HackathonRenderer from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/components/HackathonRenderer';
import BaseImage from '@/components/Common/BaseImage';
import Button from '@/components/Common/Button';
import Loading from '@/components/Common/Loading';
import { TEXT_EDITOR_TYPE } from '@/components/Common/TextEditor';
import { LangContext } from '@/components/Provider/Lang';
import { separationNumber } from '@/helper/utils';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import webApi from '@/service';
import { HackathonVariousType } from '@/service/webApi/resourceStation/type';
import { useHackathonAuditStore } from '@/store/zustand/hackathonAuditStore';
import { createEditor } from '@wangeditor/editor';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useContext, useMemo, useState } from 'react';
import { GrView } from 'react-icons/gr';
import { HiArrowLongRight } from 'react-icons/hi2';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
import { LiaUserEditSolid } from 'react-icons/lia';
import { MdAppRegistration } from 'react-icons/md';
import { useShallow } from 'zustand/react/shallow';

interface OverviewProp {}

const Overview: React.FC<OverviewProp> = () => {
  const { alias } = useParams();
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { hackathon } = useHackathonAuditStore(
    useShallow((state) => ({
      hackathon: state.hackathon
    }))
  );

  const [variousData, setVariousData] = useState<HackathonVariousType>();

  const {} = useRequest(
    async () => {
      const res = await webApi.resourceStationApi.getHackathonVariousData(alias as string);
      return res;
    },
    {
      onSuccess(data) {
        setVariousData(data);
      }
    }
  );
  const description = useMemo(() => {
    return hackathon?.info?.description;
  }, [hackathon]);

  const domNode = useMemo(() => {
    return (
      <div
        className="body-m reset-editor-style whitespace-pre-line text-neutral-rich-gray"
        dangerouslySetInnerHTML={{
          __html: createEditor({ content: description?.content || [] }).getHtml()
        }}
      ></div>
    );
  }, [description]);

  const renderDescription = () => {
    if (typeof description === 'string') {
      return <div className="whitespace-pre-line">{description}</div>;
    }

    if (description?.type === TEXT_EDITOR_TYPE) {
      return domNode;
    }

    if (description?.length) {
      return <HackathonRenderer content={description} />;
    }
    return null;
  };

  return (
    <Loading loading={!hackathon.id}>
      <div className="flex flex-col gap-[60px]">
        <div className="flex items-stretch justify-between gap-[40px]">
          {hackathon?.info?.image ? (
            <BaseImage
              src={hackathon?.info?.image || ''}
              alt={hackathon?.name || ''}
              contain={true}
              className="min-h-[268px] w-[473px] flex-shrink-0 rounded-[16px] shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"
            />
          ) : (
            <div className="h-[268px] w-[473px] flex-shrink-0"></div>
          )}

          <div className="flex flex-1 flex-col justify-between gap-[30px]">
            <div className="">
              <h1 className="text-h3 text-neutral-off-black">{hackathon?.name}</h1>
              <div className="body-m mt-[12px] text-neutral-rich-gray">{renderDescription()}</div>
            </div>
            <Button ghost className="button-text-l h-[57px] w-[340px] uppercase">
              {t('hackathonAudit.viewHackathonDetails')}
            </Button>
          </div>
        </div>
        <div>
          <p className="text-h35 mb-[40px] text-neutral-off-black">{t('hackathonAudit.hackathonStatsToday')}</p>
          <div className="flex gap-[20px] [&>div]:flex [&>div]:h-[280px] [&>div]:flex-1 [&>div]:flex-shrink-0 [&>div]:flex-col [&>div]:gap-[72px] [&>div]:rounded-[16px] [&>div]:bg-neutral-off-white [&>div]:px-[40px] [&>div]:py-[32px]">
            <div>
              <div className="body-l flex items-center gap-[8px] text-neutral-rich-gray">
                <GrView />
                <span>Page View</span>
              </div>
              <div>
                <p className="text-h2 text-neutral-off-black">{separationNumber(variousData?.pageView ?? 0)}</p>
                <p className="body-s mt-[4px] text-neutral-medium-gray">{`+${separationNumber(variousData?.todayPageView ?? 0)} Views`}</p>
              </div>
            </div>
            <div>
              <div className="body-l flex items-center gap-[8px] text-neutral-rich-gray">
                <LiaUserEditSolid />
                <span>Applacation</span>
              </div>
              <div>
                <p className="text-h2 text-neutral-off-black">{separationNumber(variousData?.application ?? 0)}</p>
                <p className="body-s mt-[4px] text-neutral-medium-gray">{`+${separationNumber(variousData?.todayApplication ?? 0)} Applications`}</p>
                <Link href={'/'} className="flex">
                  <div className="body-s mt-[16px] flex items-center gap-[6px] border-b-[2px] border-yellow-dark text-neutral-black">
                    <span>View All Applications</span>
                    <HiArrowLongRight />
                  </div>
                </Link>
              </div>
            </div>
            <div>
              <div className="body-l flex items-center gap-[8px] text-neutral-rich-gray">
                <IoCheckmarkCircleOutline />
                <span>Confirmation</span>
              </div>
              <div>
                <p className="text-h2 text-neutral-off-black">{separationNumber(variousData?.confirmation ?? 0)}</p>
                <p className="body-s mt-[4px] text-neutral-medium-gray">{`+${separationNumber(variousData?.todayConfirmation ?? 0)} Confirmations`}</p>
              </div>
            </div>
            <div>
              <div className="body-l flex items-center gap-[8px] text-neutral-rich-gray">
                <MdAppRegistration />
                <span>Submission</span>
              </div>
              <div>
                <p className="text-h2 text-neutral-off-black">{separationNumber(variousData?.submission ?? 0)}</p>
                <p className="body-s mt-[4px] text-neutral-medium-gray">{`+${separationNumber(variousData?.todaySubmission ?? 0)} Submissions`}</p>
                <Link href={'/'} className="flex">
                  <div className="body-s mt-[16px] flex items-center gap-[6px] border-b-[2px] border-yellow-dark text-neutral-black">
                    <span>View All Submissions</span>
                    <HiArrowLongRight />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Loading>
  );
};

export default Overview;
