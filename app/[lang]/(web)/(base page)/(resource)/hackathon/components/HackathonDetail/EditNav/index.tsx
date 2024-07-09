import React, { useContext, useEffect } from 'react';
import { HackathonEditNavType } from '../../../constants/type';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';

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
    <div className="sticky left-0 top-[20px] z-[2]">
      <SlideHighlight
        className={` flex h-[66px] w-full justify-between rounded-[16px] border border-neutral-light-gray bg-neutral-white px-[40px]`}
        type="LEARNING_TRACK"
        currentIndex={curAnchorIndex}
      >
        {navList.map((v, i) => (
          <div
            key={v.value}
            className={`h-full cursor-pointer items-center  ${curAnchorIndex === i ? 'body-m-bold text-neutral-off-black' : 'body-m text-neutral-medium-gray'} ${v.value ? 'flex' : 'hidden'}`}
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
