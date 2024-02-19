'use client';
import { FC, useContext, useMemo, useRef } from 'react';
import CertificationModal, {
  CertificationModalInstance
} from '../../CertificationModal';
import Button from '@/components/Common/Button';
import { CertificationCardContext } from '../CertificationCardProvider';
import { CertificationType } from '@/service/webApi/campaigns/type';
import { LearningTrackDetailContext } from '@/components/Web/DetailPageV2/Provider/LearningTrackDetailProvider';

interface LearnMoreButtonProps {
  certification: CertificationType;
}

const LearnMoreButton: FC<LearnMoreButtonProps> = ({
  certification: propCertification
}) => {
  const CertificationModalRef = useRef<CertificationModalInstance>(null);

  const { certification: contextCertification, refreshCertification } =
    useContext(CertificationCardContext);

  const { learningTrackDetail, refreshLearningTrackDetail } = useContext(
    LearningTrackDetailContext
  );

  const certification = contextCertification ?? propCertification;

  // console.log(certification);
  // console.log(learningTrackDetail);

  // console.log(certification);
  // progress小于1显示disable状态的claim
  // progress大于等于1显示允许点击的claim
  // mint以后显示view more
  const buttonText = useMemo(() => {
    if (
      (learningTrackDetail?.progress || 0) >= 1 &&
      learningTrackDetail?.enrolled &&
      certification?.mint
    ) {
      return 'View More';
    } else {
      return 'Claim';
    }
  }, []);

  return (
    <>
      <Button
        ghost
        // type="primary"
        className="body-s flex w-[140px] items-center justify-center border-neutral-black px-0 py-2 uppercase"
        disabled
        onClick={() => {
          CertificationModalRef.current?.open();
        }}
      >
        {buttonText}
      </Button>
      {certification && (
        <CertificationModal
          ref={CertificationModalRef}
          certification={certification}
          refreshCertification={refreshCertification}
        ></CertificationModal>
      )}
    </>
  );
};

export default LearnMoreButton;
