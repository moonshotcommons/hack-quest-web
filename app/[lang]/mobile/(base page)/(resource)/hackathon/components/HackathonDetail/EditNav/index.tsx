import React, { useContext, useEffect, useMemo } from 'react';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import {
  HackathonEditContext,
  HackathonEditNavType
} from '@/app/[lang]/(web)/(base page)/(resource)/hackathon/constants/type';

interface EditNavProp {
  curAnchorIndex: number;
  handleClickAnchor: (index: number) => void;
  navList: HackathonEditNavType[];
}

const EditNav: React.FC<EditNavProp> = ({ curAnchorIndex, handleClickAnchor, navList }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  useEffect(() => {
    handleClickAnchor(0);
  }, [navList]);
  return (
    <div className="no-scrollbar sticky left-0  top-0 z-[2] overflow-auto border-y border-neutral-light-gray bg-neutral-white">
      <SlideHighlight
        className={` flex h-[3.1875rem] gap-[1rem]  px-[1.25rem]`}
        type="LEARNING_TRACK"
        currentIndex={curAnchorIndex}
      >
        {navList.map((v, i) => (
          <div
            key={v.value}
            className={`flex h-full cursor-pointer items-center whitespace-nowrap  ${curAnchorIndex === i ? 'body-xs-bold text-neutral-off-black' : 'body-xs text-neutral-medium-gray'}`}
            onClick={() => handleClickAnchor(i)}
          >
            {t(v.label)}
          </div>
        ))}
      </SlideHighlight>
    </div>
  );
};

export default EditNav;
