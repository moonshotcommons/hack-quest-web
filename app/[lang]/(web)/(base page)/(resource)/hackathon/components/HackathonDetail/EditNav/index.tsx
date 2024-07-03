import React, { useContext, useEffect, useMemo } from 'react';
import { HackathonEditContext, HackathonEditNavType } from '../../../constants/type';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';

interface EditNavProp {
  curAnchorIndex: number;
  handleClickAnchor: (index: number) => void;
  navList?: HackathonEditNavType[];
}

const EditNav: React.FC<EditNavProp> = ({ curAnchorIndex, handleClickAnchor, navList }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { navs: n } = useContext(HackathonEditContext);
  const navs = useMemo(() => {
    return navList?.length ? navList : n;
  }, [navList, n]);
  useEffect(() => {
    handleClickAnchor(0);
  }, [navs]);
  return (
    <div className="sticky left-0 top-[20px] z-[2]">
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
