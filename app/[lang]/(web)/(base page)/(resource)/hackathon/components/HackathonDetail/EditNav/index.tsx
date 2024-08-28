import React, { useContext, useMemo } from 'react';
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

  const navs = useMemo(() => navList.filter((v) => v.value), [navList]);
  const index = useMemo(() => {
    if (curAnchorIndex < 0) return 0;
    if (curAnchorIndex > navs.length - 1) return navs.length - 1;
    return curAnchorIndex;
  }, [curAnchorIndex, navs]);
  return (
    <div
      className={`sticky left-0 top-[20px] z-[2]  rounded-[16px]  border border-neutral-light-gray bg-neutral-white px-[20px]`}
    >
      <div className="no-scrollbar w-full overflow-auto ">
        <SlideHighlight
          className={` flex h-[66px]    ${navs.length < 12 ? 'w-full justify-between' : 'gap-[40px]'}`}
          type="LEARNING_TRACK"
          currentIndex={index}
        >
          {navs.map((v, i) => (
            <div
              key={v.value}
              className={`flex h-full flex-shrink-0 cursor-pointer items-center  ${index === i ? 'body-m-bold text-neutral-off-black' : 'body-m text-neutral-medium-gray'}`}
              onClick={() => handleClickAnchor(i)}
            >
              {t(v.label)}
            </div>
          ))}
        </SlideHighlight>
      </div>
    </div>
  );
};

export default EditNav;
