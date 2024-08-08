'use client';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import PartnerCardModal from './PartnerCardModal';
import { PartnerShipType } from '@/service/webApi/resourceStation/type';

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
    <div className="flex flex-col items-center gap-[1.25rem]">
      <p className="text-h2-mob text-neutral-off-black">{t('partners.whoAreOurPartners')}</p>
      <div className="no-scrollbar flex w-full gap-[.5rem] overflow-auto">
        {partnerTags.map((v) => (
          <div
            key={v.value}
            className={`body-s flex-center h-[2.5rem] w-[7.5rem] flex-shrink-0 rounded-[1.5rem] ${curTag === v.value ? 'bg-yellow-primary text-neutral-black' : 'bg-neutral-white text-neutral-medium-gray'}`}
            onClick={() => setCurTag(v.value)}
          >
            {v.label}
          </div>
        ))}
      </div>
      <div className="flex w-full flex-wrap gap-x-[.75rem]  gap-y-[1.25rem]">
        {list.map((v, i) => (
          <div
            key={i}
            className="card-hover w-[calc((100%-0.75rem)/2)] overflow-hidden rounded-[1rem] bg-neutral-white"
            onClick={() => {
              setCurPartner(v);
              setModalOpen(true);
            }}
          >
            <div className="relative h-0 w-full bg-neutral-light-gray pt-[58%]">
              {v.logo && <Image src={v.logo} alt={v.name} fill className="object-cover" />}
            </div>
            <div className="h-[3.25rem] p-[.75rem]">
              <h2 className="caption-10pt line-clamp-2 text-neutral-off-black">{v.name}</h2>
            </div>
          </div>
        ))}
      </div>
      <PartnerCardModal open={modalOpen} onClose={() => setModalOpen(false)} partner={curPartner as PartnerShipType} />
    </div>
  );
};

export default PartnerList;
