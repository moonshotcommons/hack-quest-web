import Button from '@/components/v2/Common/Button';
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
      const res = await webApi.campaignsApi.getCertificationDetail(
        certificationId
      );
      return res;
    },
    {
      onSuccess(res) {
        setCertification(res);
      }
    }
  );

  return (
    <div className="w-full relative">
      <div className="w-full h-fit flex justify-end relative">
        <div className="w-full h-fit absolute -z-1 top-1/2 -translate-y-1/2 py-[24px] px-[30px] bg-[#FFF4CE] rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
          <p className="text-[21px] font-next-poster-Bold tracking-[1.26px] text-[#0B0B0B]">
            {certification?.name}
          </p>
          <Typography.Paragraph ellipsis={{ rows: 2 }}>
            <p className="mt-[10px] mb-[20px] w-[46.5%] text-[18px] font-next-book leading-[160%] tracking-[0.36px] text-[#0B0B0B]">
              {certification?.description}
            </p>
          </Typography.Paragraph>
          <Button
            ghost
            className="py-2 w-[140px] flex justify-center items-center px-0 border-[#0B0B0B] font-next-book text-[14px] leading-[125%] tracking-[0.28px]"
            onClick={() => {
              CertificationModalRef.current?.open();
            }}
          >
            Learn More
          </Button>
        </div>
        <div className="w-[421px] h-[233px] relative mr-[20px]">
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
