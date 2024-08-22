'use client';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import React, { useMemo, useState } from 'react';
import PartnerCardModal from './PartnerCardModal';
import { PartnerShipType } from '@/service/webApi/resourceStation/type';
import BaseImage from '@/components/Common/BaseImage';

interface PartnerListProp {
  lang: Lang;
  partnerShips: PartnerShipType[];
}

const PartnerList: React.FC<PartnerListProp> = ({ lang, partnerShips }) => {
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const [curTag, setCurTag] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [curPartner, setCurPartner] = useState<PartnerShipType>({} as PartnerShipType);
  const partnerTags = useMemo(() => {
    const tags: string[] = [];
    partnerShips.forEach((v) => {
      tags.push(...v.tags);
    });
    const newTags = [...new Set(tags)].map((v) => ({
      value: v,
      label: v
    }));
    return [
      {
        label: 'All Regions',
        value: ''
      },
      ...newTags
    ];
  }, [partnerShips]);
  const list = useMemo(() => {
    if (!curTag) return partnerShips;
    return partnerShips.filter((v) => v.tags?.includes(curTag));
  }, [curTag, partnerShips]);
  return (
    <div className="container mx-auto flex flex-col items-center gap-[40px]">
      <p className="text-h2 text-neutral-off-black">{t('partners.whoAreOurPartners')}</p>
      <div className="no-scrollbar flex  w-full gap-[8px]  overflow-auto">
        {partnerTags?.map((v) => (
          <div
            key={v.value}
            className={`body-m flex-center h-[48px] flex-shrink-0 cursor-pointer rounded-[24px] px-[20px] ${curTag === v.value ? 'bg-yellow-primary text-neutral-black' : 'bg-neutral-white text-neutral-medium-gray'}`}
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
            className="card-hover w-[calc((100%-64px)/5)] overflow-hidden rounded-[16px] bg-neutral-white shadow-[0_0_4px_0_rgba(0,0,0,0.12)]"
            onClick={() => {
              setCurPartner(v);
              setModalOpen(true);
            }}
          >
            <BaseImage src={v.logo} alt={v.name} className="h-0 w-full bg-neutral-light-gray pt-[56%]" contain={true} />
            <div className="h-[84px] p-[16px]">
              <h2 className="body-m line-clamp-2 text-neutral-off-black">{v.name}</h2>
            </div>
          </div>
        ))}
      </div>
      <PartnerCardModal open={modalOpen} onClose={() => setModalOpen(false)} partner={curPartner as PartnerShipType} />
    </div>
  );
};

export default PartnerList;
