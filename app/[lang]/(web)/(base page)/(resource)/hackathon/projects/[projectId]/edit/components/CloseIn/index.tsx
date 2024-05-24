'use client';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import React, { ForwardRefRenderFunction, forwardRef, useContext, useImperativeHandle, useMemo } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { LangContext } from '@/components/Provider/Lang';
import dayjs from '@/components/Common/Dayjs';
import CountDown from '@/components/Web/Business/CountDown';

interface CloseInProp {
  hackathon: HackathonType;
}

const CloseIn: ForwardRefRenderFunction<{ isClose: boolean }, CloseInProp> = ({ hackathon }, ref) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  const isClose = useMemo(() => {
    return dayjs().tz().isAfter(hackathon?.reviewTime);
  }, [hackathon]);

  useImperativeHandle(ref, () => {
    return {
      isClose
    };
  });

  return (
    <div className="sticky left-0 top-0 z-[2] h-[64px] w-full rounded-[4px] bg-yellow-extra-light px-[28px]">
      <div className="relative flex h-full items-center  justify-center gap-[12px] text-neutral-off-black">
        {!isClose && (
          <>
            <span className="body-s text-neutral-medium-gray">{t('hackathonVoting.submissionCloseIn')}</span>
            <CountDown
              time={hackathon?.reviewTime}
              countItemClassName={'bg-neutral-white body-l-bold'}
              formatClassName="body-m"
            />
          </>
        )}
        {isClose && <span className="body-s text-neutral-medium-gray">{t('hackathonVoting.submissionClosed')}</span>}
      </div>
    </div>
  );
};

export default forwardRef(CloseIn);
