'use client';
import React, { useContext } from 'react';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';
import { OffsetTopsType } from '../../../../../constants/type';

import Button from '@/components/Common/Button';

interface NavProp {
  handleClickAnchor: (index: number) => void;
  curAnchorIndex: number;
  offsetTops: OffsetTopsType[];
  onSava: VoidFunction;
  onExit: VoidFunction;
  submitDisable: boolean;
  sectionData: string[];
}

const Nav: React.FC<NavProp> = ({ handleClickAnchor, curAnchorIndex, onSava, onExit, submitDisable, sectionData }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  return (
    <div className="body-l sticky left-0 top-[80px] w-[365px] pr-[40px]">
      <div>
        {sectionData.map((v, i) => (
          <div
            key={v}
            onClick={() => handleClickAnchor(i)}
            className={`mb-[4px] flex h-[42px] cursor-pointer items-center overflow-hidden rounded-l-[8px] border-l-[9px]  pl-[28px] ${i === curAnchorIndex ? 'border-yellow-primary bg-neutral-white text-neutral-black' : 'border-transparent text-neutral-medium-gray'}`}
          >
            {t(v)}
          </div>
        ))}
      </div>
      <div className="mx-auto w-[calc(100%-40px)]">
        <div className="my-6 h-px w-full scale-y-50 bg-neutral-medium-gray"></div>
        <Button
          block
          type="primary"
          htmlType="submit"
          className="button-text-m uppercase"
          // onClick={onSava}
          disabled={submitDisable}
        >
          Save & resubmit
        </Button>
        <Button block ghost htmlType="button" className="button-text-m mt-4 uppercase" onClick={onExit}>
          exit
        </Button>
      </div>
    </div>
  );
};

export default Nav;
