import React, { useContext, useEffect } from 'react';
import { HackathonEditContext } from '../../../constants/type';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';

interface EditNavProp {
  curAnchorIndex: number;
  handleClickAnchor: (index: number) => void;
}

const EditNav: React.FC<EditNavProp> = ({ curAnchorIndex, handleClickAnchor }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { navs } = useContext(HackathonEditContext);
  useEffect(() => {
    handleClickAnchor(0);
  }, [navs]);
  return (
    <div className="sticky left-0 top-0 z-[2]">
      <SlideHighlight
        className={` flex h-[66px] w-full justify-between rounded-[16px] border border-neutral-light-gray bg-neutral-white px-[40px]`}
        type="LEARNING_TRACK"
        currentIndex={curAnchorIndex}
      >
        {navs.map((v, i) => (
          <div
            key={v.value}
            className={`flex h-full cursor-pointer items-center  ${curAnchorIndex === i ? 'body-m-bold text-neutral-off-black' : 'body-m text-neutral-medium-gray'}`}
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
