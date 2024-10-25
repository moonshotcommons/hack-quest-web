import { UserCertificateInfo } from '@/service/webApi/campaigns/type';
import Image from 'next/image';
import { FC } from 'react';
import dayjs from '@/components/Common/Dayjs';
import { cn } from '@/helper/utils';

interface CertificateRendererProps {
  template: string;
  certificateInfo?: UserCertificateInfo;
  isSmall?: boolean;
}

const CertificateRenderer: FC<CertificateRendererProps> = ({ template, certificateInfo, isSmall = false }) => {
  const { certificateId, certificateTime, username, name } = certificateInfo || {};

  return (
    <div className="relative">
      {/* <div className="fixed left-0 top-0" id="image-123456 z-[999999]"> */}
      <Image
        src={template || '/Linea Builder.png'}
        alt={certificateInfo ? `${name}-${certificateId}` : 'user-certificate'}
        width={isSmall ? 398 : 1524}
        height={isSmall ? 220 : 841}
        crossOrigin="anonymous"
      />
      {certificateInfo && (
        <>
          <span
            className={cn('absolute font-next-book-Thin  italic leading-[120%]', {
              'left-[111px] top-[400px] text-[64px]': !isSmall,
              'left-[28px] top-[108px] text-[24px]': isSmall
            })}
          >
            {username}
          </span>
          <span
            className={cn('absolute ', {
              'right-[91px] top-[172px] text-[16px]': !isSmall,
              'right-[8px] top-[44px] scale-75 text-[12px]': isSmall
            })}
          >
            No.{certificateId}
          </span>
          <span
            className={cn('absolute  font-medium italic', {
              'bottom-[73px] left-[534px] text-[16px]': !isSmall,
              'bottom-[16px] left-[120px] scale-75 text-[12px]': isSmall
            })}
          >
            {dayjs(certificateTime).format('YYYY-MM-DD')}
          </span>
        </>
      )}
    </div>
  );
};

export default CertificateRenderer;
