'use client';
import { FC, useContext, useRef } from 'react';
import CertificationModal, {
  CertificationModalInstance
} from '../../CertificationModal';
import Button from '@/components/Common/Button';
import { CertificationCardContext } from '../CertificationCardProvider';
import { CertificationType } from '@/service/webApi/campaigns/type';

interface LearnMoreButtonProps {
  certification: CertificationType;
}

const LearnMoreButton: FC<LearnMoreButtonProps> = ({
  certification: propCertification
}) => {
  const CertificationModalRef = useRef<CertificationModalInstance>(null);

  const { certification: contextCertification, refreshCertification } =
    useContext(CertificationCardContext);

  const certification = contextCertification ?? propCertification;

  return (
    <>
      <Button
        ghost
        className="body-s flex w-[140px] items-center justify-center border-neutral-black px-0 py-2"
        onClick={() => {
          CertificationModalRef.current?.open();
        }}
      >
        Learn More
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
