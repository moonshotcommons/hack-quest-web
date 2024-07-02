import React, { useContext, useEffect } from 'react';
import { HackathonEditContext } from '../../constants/type';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';

interface EditNavProp {
  curTab: string;
  setCurTab: (tab: string) => void;
}

const EditNav: React.FC<EditNavProp> = ({ curTab, setCurTab }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { navs } = useContext(HackathonEditContext);
  useEffect(() => {
    !curTab && setCurTab(navs[0]?.value);
  }, [navs]);
  return (
    <div className="sticky left-0 top-0 z-[2]">
      <SlideHighlight
        className={` flex h-[66px] w-full justify-between rounded-[16px] border border-neutral-light-gray bg-neutral-white px-[120px]`}
        type="LEARNING_TRACK"
        currentIndex={navs.findIndex((v) => v.value === curTab)}
      >
        {navs.map((v) => (
          <div
            key={v.value}
            className={`flex h-full cursor-pointer items-center  ${v.value === curTab ? 'body-m-bold text-neutral-off-black' : 'body-m text-neutral-medium-gray'}`}
            onClick={() => setCurTab(v.value)}
          >
            {t(v.label)}
          </div>
        ))}
      </SlideHighlight>
    </div>
  );
};

export default EditNav;
