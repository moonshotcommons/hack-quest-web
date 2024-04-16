import Button from '@/components/Common/Button';
import { LangContext } from '@/components/Provider/Lang';
import { useRedirect } from '@/hooks/router/useRedirect';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { ProcessType } from '@/service/webApi/course/type';
import { useContext } from 'react';
interface NoDataType {
  curTab: ProcessType;
}
const NoData: React.FC<NoDataType> = ({ curTab }) => {
  const { redirectToUrl } = useRedirect();

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);

  return (
    <div className="flex flex-col items-center pb-[100px] ">
      <p className="body-l text-neutral-medium-gray">
        {curTab === ProcessType.IN_PROCESS ? t('dashboard.noOnGoingCourse') : t('dashboard.noCompletedCourse')}
      </p>
      <Button
        onClick={() => redirectToUrl('learning-track')}
        className="button-text-m my-[12px] h-[48px] w-[212px] bg-yellow-primary p-0 uppercase text-neutral-black"
      >
        {t('dashboard.addLearningTracks')}
      </Button>
      <Button
        onClick={() => redirectToUrl('electives')}
        className="button-text-m h-[48px] w-[212px] border border-neutral-black  p-0 uppercase text-neutral-black"
      >
        {t('dashboard.exploreElectives')}
      </Button>
    </div>
  );
};

export default NoData;
