'use client';
import { FC, useContext, useMemo, useRef } from 'react';
import CertificationModal, {
  CertificationModalInstance
} from '../../CertificationModal';
import Button from '@/components/Common/Button';
import { CertificationCardContext } from '../CertificationCardProvider';
import { CertificationType } from '@/service/webApi/campaigns/type';
import { LearningTrackDetailContext } from '@/components/Web/DetailPageV2/Provider/LearningTrackDetailProvider';
import { useRedirect } from '@/hooks/router/useRedirect';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';

interface LearnMoreButtonProps {
  certification: CertificationType;
}

const LearnMoreButton: FC<LearnMoreButtonProps> = ({
  certification: propCertification
}) => {
  const CertificationModalRef = useRef<CertificationModalInstance>(null);
  const { redirectToUrl } = useRedirect();
  const {
    certification: contextCertification,
    refreshCertification,
    refreshCertificationAsync
  } = useContext(CertificationCardContext);

  const { learningTrackDetail, refreshLearningTrackDetail } = useContext(
    LearningTrackDetailContext
  );

  const certification = contextCertification ?? propCertification;
  const progress = learningTrackDetail?.progress || 0;
  const enrolled = learningTrackDetail?.enrolled;
  const mint = certification?.mint;
  const claimed = certification?.claimed;

  const { run: claim, loading: claimLoading } = useRequest(
    async () => {
      const res = await webApi.campaignsApi.claimCertification(
        certification.id
      );
      await refreshCertificationAsync();
      return res;
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
          className="body-s flex w-[140px] items-center justify-center border-neutral-black px-0 py-2 uppercase"
          onClick={() => {
            redirectToUrl('/user/profile');
          }}
        >
          View more
        </Button>
      );
    } else {
      return (
        <Button
          ghost={!enrolled || progress < 1}
          type={enrolled && progress >= 1 ? 'primary' : 'default'}
          className="body-s flex w-[140px] items-center justify-center border-neutral-black px-0 py-2 uppercase"
          disabled={!enrolled || progress <= 1 || claimed || claimLoading}
          loading={claimLoading}
          onClick={() => {
            if (learningTrackDetail?.campaignId) {
              redirectToUrl('/campaigns');
            } else if (!certification.claimed) {
              claim();
            }
          }}
        >
          Claim
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
          certification={certification}
          showCoin
          refreshCertification={refreshCertification}
        ></CertificationModal>
      )}
    </>
  );
};

export default LearnMoreButton;
