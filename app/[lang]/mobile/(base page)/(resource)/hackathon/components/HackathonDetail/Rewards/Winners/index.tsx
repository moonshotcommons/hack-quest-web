import { HackathonType } from '@/service/webApi/resourceStation/type';
import React, { useContext } from 'react';
import Title from '../../Title';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { LangContext } from '@/components/Provider/Lang';
import { separationNumber } from '@/helper/utils';
import WinnerCard from './WinnerCard';
import SliderCard from '@/components/Web/Business/SliderCard';
import { MoveRight } from 'lucide-react';

interface WinnersProp {
  hackathon: HackathonType;
}

const Winners: React.FC<WinnersProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="flex flex-col gap-[1rem] px-[1.25rem]">
      <div className="">
        <Title title={`hackathonDetail.rewards`} />
        <Link
          href={`${MenuLink.PROJECTS}?keyword=${hackathon.name}`}
          className="mt-[.5rem] flex items-center gap-[.5rem]"
        >
          <span className="body-s text-neutral-black">{t('viewAllProjects')}</span>
          <MoveRight size={16} className="text-neutral-black" />
        </Link>
      </div>
      <div className={'flex flex-col gap-[1rem]'}>
        <div className="flex flex-col">
          <div className="body-m flex items-center gap-[8px] text-neutral-medium-gray">
            <div className="text-h4 text-neutral-black">{`${separationNumber(100000)} USD`}</div>
            <div className="border-l border-neutral-light-gray pl-[8px]">Web3 Track</div>
          </div>
          <div>
            <SliderCard
              isMobile={true}
              className="py-[1rem]"
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
