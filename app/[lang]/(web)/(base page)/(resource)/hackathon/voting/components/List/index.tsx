import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import React from 'react';
import PastHackathonCard from '../../../components/HackathonBox/Past/PastHackathonCard';
import NoData from '../NoData';

interface ListProp {
  lang: Lang;
  hackathons: HackathonType[];
}

const List: React.FC<ListProp> = async ({ lang, hackathons }) => {
  const { t } = await useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="mt-[60px]">
      <p className="text-h3 text-neutral-black">{t('votingHackathons')}</p>
      {hackathons.length > 0 ? (
        <div className="mt-[40px] flex flex-wrap gap-x-[20px] gap-y-[40px]">
          {hackathons.map((hackathon) => (
            <div key={hackathon.id} className="w-[calc((100%-60px)/4)]">
              <PastHackathonCard hackathon={hackathon} isVoting={true} />
            </div>
          ))}
        </div>
      ) : (
        <NoData lang={lang} />
      )}
    </div>
  );
};

export default List;
