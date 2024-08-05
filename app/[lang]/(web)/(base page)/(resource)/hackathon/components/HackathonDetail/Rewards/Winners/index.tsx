import { HackathonType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import Title from '../../Title';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import Button from '@/components/Common/Button';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';
import { separationNumber } from '@/helper/utils';
import WinnerCard from './WinnerCard';
import SliderCard from '@/components/Web/Business/SliderCard';

interface WinnersProp {
  hackathon: HackathonType;
}

const Winners: React.FC<WinnersProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="flex flex-col gap-[32px]">
      <div className="flex items-center justify-between">
        <Title title={`hackathonDetail.rewards`} />
        <Link href={`${MenuLink.PROJECTS}?keyword=${hackathon.name}`}>
          <span className="underline-l text-neutral-off-black">{t('viewAllProjects')}</span>
        </Link>
      </div>
      <div className={'flex flex-col gap-[32px]'}>
        <div className="flex flex-col">
          <div className="body-m flex items-center gap-[8px] text-neutral-medium-gray">
            <div className="text-h4 text-neutral-black">{`${separationNumber(100000)} USD`}</div>
            <div className="border-l border-neutral-light-gray pl-[8px]">Web3 Track</div>
          </div>
          <div>
            <SliderCard
              className="py-[20px]"
              renderItem={(contarinerWidth) => {
                return [1, 2, 3].map((item) => (
                  <div
                    key={item}
                    style={{
                      width: `${contarinerWidth}px`
                    }}
                  >
                    <WinnerCard />
                  </div>
                ));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Winners;
