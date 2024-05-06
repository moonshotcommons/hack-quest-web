'use client';
import { FC, useContext, useMemo, useRef } from 'react';
import CertificationModal, { CertificationModalInstance } from '../../CertificationModal';
import Button from '@/components/Common/Button';
import { CertificationCardContext } from '../CertificationCardProvider';
import { CertificationType } from '@/service/webApi/campaigns/type';
import { LearningTrackDetailContext } from '@/components/Mobile/MobDetailPageV2/Provider/LearningTrackDetailProvider';
import { useRedirect } from '@/hooks/router/useRedirect';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';

interface LearnMoreButtonProps {
  certification: CertificationType;
}

const LearnMoreButton: FC<LearnMoreButtonProps> = ({ certification: propCertification }) => {
  const CertificationModalRef = useRef<CertificationModalInstance>(null);
  const { redirectToUrl } = useRedirect();

  const {
    certification: contextCertification,
    refreshCertification,
    refreshCertificationAsync
  } = useContext(CertificationCardContext);

  const { learningTrackDetail, refreshLearningTrackDetail } = useContext(LearningTrackDetailContext);

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);

  const certification = contextCertification ?? propCertification;
  const progress = learningTrackDetail?.progress || 0;
  const enrolled = learningTrackDetail?.enrolled;
  const mint = certification?.mint;
  const claimed = certification?.claimed;

  const { run: claim, loading: claimLoading } = useRequest(
    async () => {
      const res = await webApi.campaignsApi.claimCertification(certification.id);
      await refreshCertificationAsync();
      return res;
      // return null;
    },
    {
      manual: true,
      onSuccess: () => {
        CertificationModalRef.current?.open();
      },
      onError(e) {
        errorMessage(e);
      }
    }
  );

  const buttonNode = useMemo(() => {
    if (progress >= 1 && enrolled && claimed) {
      return (
        <Button
          ghost
          // type="primary"
          className="button-text-s flex w-[140px] items-center justify-center border-neutral-black px-0 py-2 uppercase"
          onClick={() => {
            redirectToUrl('/user/profile');
          }}
        >
          {t('courses.viewMore')}
        </Button>
      );
    } else {
      return (
        <Button
          ghost={!enrolled || progress < 1}
          type={enrolled && progress >= 1 ? 'primary' : 'default'}
          className="button-text-s flex w-[140px] items-center justify-center border-neutral-black px-0 py-2 uppercase"
          disabled={!enrolled || progress < 1 || claimed || claimLoading}
          loading={claimLoading}
          onClick={() => {
            if (learningTrackDetail?.campaignId) {
              redirectToUrl('/campaigns');
            } else if (!certification.claimed) {
              claim();
            }
          }}
        >
          {t('courses.claim')}
        </Button>
      );
    }
  }, [learningTrackDetail, certification]);

  return (
    <>
      {buttonNode}
      {certification && (
        <CertificationModal
          ref={CertificationModalRef}
          showCoin
          certification={certification}
          refreshCertification={refreshCertification}
        ></CertificationModal>
      )}
    </>
  );
};

export default LearnMoreButton;
