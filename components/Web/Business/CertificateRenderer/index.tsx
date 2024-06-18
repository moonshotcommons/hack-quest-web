import { UserCertificateInfo } from '@/service/webApi/campaigns/type';
import Image from 'next/image';
import { FC } from 'react';
import dayjs from 'dayjs';

interface CertificateRendererProps {
  template: string;
  certificateInfo?: UserCertificateInfo;
}

const CertificateRenderer: FC<CertificateRendererProps> = ({ template, certificateInfo }) => {
  const { certificateId, certificateTime, username } = certificateInfo || {};

  return (
    <div className="relative">
      {/* <div className="fixed left-0 top-0" id="image-123456 z-[999999]"> */}
      <Image
        src={template || '/Linea Builder.png'}
        alt={certificateInfo ? `${name}-${certificateId}` : 'user-certificate'}
        width={1524}
        height={841}
        crossOrigin="anonymous"
      />
      {certificateInfo && (
        <>
          <span className="absolute left-[111px] top-[400px] font-next-book-Thin text-[64px] italic leading-[120%]">
            {username}
          </span>
          <span className="absolute right-[91px] top-[172px] text-[16px]">No.{certificateId}</span>
          <span className="absolute bottom-[73px] left-[534px] text-[16px] font-medium italic">
            {dayjs(certificateTime).format('YYYY-MM-DD')}
          </span>
        </>
      )}
    </div>
  );
};

export default CertificateRenderer;
