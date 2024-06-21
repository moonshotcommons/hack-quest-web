import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useMemo } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { HackathonEditContext } from '../../../constants/type';
import useDealHackathonData from '@/hooks/resource/useDealHackathonData';

interface ListModalProp {
  hackathon: HackathonType;
}

const ListModal: React.FC<ListModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setModalType } = useContext(HackathonEditContext);
  const { dealModalList } = useDealHackathonData();
  const modalList = useMemo(() => {
    return dealModalList(hackathon);
  }, [hackathon]);
  return (
    <div className="">
      <div className="text-center">
        <p className="text-h3 text-neutral-black">{t('hackathonDetail.addNewsection')}</p>
        <p className="body-s mt-[16px] text-neutral-black">{t('hackathonDetail.pleaseChooseSectionType')}</p>
      </div>
      <div className="scroll-wrap-y mt-[24px] flex flex-1 flex-wrap items-stretch gap-[24px] px-[40px]">
        {modalList.map((v) => (
          <div
            key={v.type}
            className={` w-[calc((100%-24px)/2)] rounded-[16px]  border-[3px] p-[24px]  ${!v.added ? 'cursor-pointer border-neutral-off-white bg-neutral-white text-neutral-black  hover:border-yellow-dark hover:bg-yellow-extra-light' : 'cursor-not-allowed border-neutral-light-gray bg-neutral-off-white text-neutral-medium-gray'}`}
            onClick={() => {
              if (v.added) return;
              setModalType(v.type);
            }}
          >
            <p className="text-h5">{t(v.label)}</p>
            <p className="body-s mt-[24px]">{t(`${v.label}Intro`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListModal;
