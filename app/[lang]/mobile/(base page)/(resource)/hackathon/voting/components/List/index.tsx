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
    <div className="mt-[3.75rem]">
      <p className="text-h2-mob text-neutral-black">{t('votingHackathons')}</p>
      {hackathons.length > 0 ? (
        <div className="mt-[1.25rem] flex flex-col  gap-[1.25rem]">
          {hackathons.map((hackathon) => (
            <div key={hackathon.id} className="w-full">
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
