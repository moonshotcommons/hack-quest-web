import Button from '@/components/Common/Button';
import webApi from '@/service';
import { CertificationType } from '@/service/webApi/campaigns/type';
import { useRequest } from 'ahooks';
import Image from 'next/image';
import { FC, useRef, useState } from 'react';
import CertificationModal, { CertificationModalInstance } from '../CertificationModal';

import { Typography } from 'antd';

interface CertificationCardProps {
  certificationId: string;
}

const CertificationCard: FC<CertificationCardProps> = (props) => {
  const CertificationModalRef = useRef<CertificationModalInstance>(null);
  const { certificationId } = props;
  const [certification, setCertification] = useState<CertificationType>();

  const { refresh } = useRequest(
    async () => {
      const res = await webApi.campaignsApi.getCertificationDetail(certificationId);
      return res;
    },
    {
      onSuccess(res) {
        setCertification(res);
      }
    }
  );

  return (
    <div className="relative w-full">
      <div className="relative flex h-fit w-full justify-end">
        <div className="-z-1 absolute top-1/2 h-fit w-full -translate-y-1/2 rounded-[10px] bg-[#FFF4CE] px-[30px] py-[24px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
          <p className="text-h4 text-neutral-black">{certification?.name}</p>
          <Typography.Paragraph ellipsis={{ rows: 2 }}>
            <p className="body-l mb-[20px] mt-[10px] w-[46.5%] text-neutral-black">{certification?.description}</p>
          </Typography.Paragraph>
          <Button
            ghost
            className="body-s flex w-[140px] items-center justify-center border-neutral-black px-0 py-2"
            onClick={() => {
              CertificationModalRef.current?.open();
            }}
          >
            Learn More
          </Button>
        </div>
        <div className="relative mr-[20px] h-[233px] w-[421px]">
          {certification?.image && (
            <Image fill src={certification?.image || ''} alt="certification" className="z-50"></Image>
          )}
        </div>
      </div>
      {certification && (
        <CertificationModal
          ref={CertificationModalRef}
          certification={certification}
          refreshCertification={refresh}
        ></CertificationModal>
      )}
    </div>
  );
};

export default CertificationCard;
