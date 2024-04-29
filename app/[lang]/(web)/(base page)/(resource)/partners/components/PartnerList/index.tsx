'use client';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { partnerTags, partnerList } from '../../constants/data';
import PartnerCardModal from './PartnerCardModal';
import { PartnerType } from '../../constants/type';

interface PartnerListProp {
  lang: Lang;
}

const PartnerList: React.FC<PartnerListProp> = ({ lang }) => {
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const [curTag, setCurTag] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [curPartner, setCurPartner] = useState({});
  const list = useMemo(() => {
    if (!curTag) return partnerList;
    return partnerList.filter((v) => v.tags?.includes(curTag));
  }, [curTag]);
  return (
    <div className="container mx-auto flex flex-col items-center gap-[40px]">
      <p className="text-h2 text-neutral-off-black">{t('partners.whoAreOurPartners')}</p>
      <div className="no-scrollbar flex  w-full gap-[8px]  overflow-auto">
        {partnerTags.map((v) => (
          <div
            key={v.value}
            className={`body-m flex-center h-[48px] w-[140px] flex-shrink-0 cursor-pointer rounded-[24px] ${curTag === v.value ? 'bg-yellow-primary text-neutral-black' : 'bg-neutral-white text-neutral-medium-gray'}`}
            onClick={() => setCurTag(v.value)}
          >
            {v.label}
          </div>
        ))}
      </div>
      <div className="flex w-full flex-wrap gap-x-[16px]  gap-y-[40px]">
        {list.map((v, i) => (
          <div
            key={i}
            className="card-hover w-[calc((100%-64px)/5)] overflow-hidden rounded-[16px] bg-neutral-white"
            onClick={() => {
              setCurPartner(v);
              setModalOpen(true);
            }}
          >
            <div className="relative h-0 w-full bg-neutral-light-gray pt-[58%]">
              {v.img && <Image src={v.img} alt={v.name} fill className="object-cover" />}
            </div>
            <div className="h-[84px] p-[16px]">
              <h2 className="body-m line-clamp-2 text-neutral-off-black">{v.name}</h2>
            </div>
          </div>
        ))}
      </div>
      <PartnerCardModal open={modalOpen} onClose={() => setModalOpen(false)} partner={curPartner as PartnerType} />
    </div>
  );
};

export default PartnerList;
