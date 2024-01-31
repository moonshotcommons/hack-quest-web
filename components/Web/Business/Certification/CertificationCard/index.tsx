import Button from '@/components/Common/Button';
import webApi from '@/service';
import { CertificationType } from '@/service/webApi/campaigns/type';
import { useRequest } from 'ahooks';
import Image from 'next/image';
import { FC, useRef, useState } from 'react';
import CertificationModal, {
  CertificationModalInstance
} from '../CertificationModal';

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
      const res =
        await webApi.campaignsApi.getCertificationDetail(certificationId);
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
          <p className="font-next-poster-Bold text-[21px] tracking-[1.26px] text-neutral-black">
            {certification?.name}
          </p>
          <Typography.Paragraph ellipsis={{ rows: 2 }}>
            <p className="mb-[20px] mt-[10px] w-[46.5%] font-next-book text-[18px] leading-[160%] tracking-[0.36px] text-neutral-black">
              {certification?.description}
            </p>
          </Typography.Paragraph>
          <Button
            ghost
            className="flex w-[140px] items-center justify-center border-neutral-black px-0 py-2 font-next-book text-[14px] leading-[125%] tracking-[0.28px]"
            onClick={() => {
              CertificationModalRef.current?.open();
            }}
          >
            Learn More
          </Button>
        </div>
        <div className="relative mr-[20px] h-[233px] w-[421px]">
          {certification?.image && (
            <Image
              fill
              src={certification?.image || ''}
              alt="certification"
              className="z-50"
            ></Image>
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
