import Image from 'next/image';
import { FC, ReactNode, useRef } from 'react';
import CertificationImage from './certificate.png';
import Button from '@/components/v2/Common/Button';
import CertificationModal, {
  CertificationModalInstance,
  CertificationStatus
} from '../CertificationModal';
import { message } from 'antd';
interface CertificationCardProps {}

const CertificationCard: FC<CertificationCardProps> = (props) => {
  const CertificationModalRef = useRef<CertificationModalInstance>(null);
  return (
    <div className="w-full relative">
      <div className="w-full h-fit flex justify-end relative">
        <div className="w-full h-fit absolute -z-1 top-1/2 -translate-y-1/2 py-[24px] px-[30px] bg-[#FFF4CE] rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
          <p className="text-[21px] font-next-poster-Bold tracking-[1.26px] text-[#0B0B0B]">
            Earn a Web3 Certification
          </p>
          <p className="mt-[10px] mb-[20px] w-[46.5%] text-[18px] font-next-book leading-[160%] tracking-[0.36px] text-[#0B0B0B]">
            {`Upon completing the course, you'll earn a certification, attesting
            to your proficiency in Web3 development .`}
          </p>
          <Button
            ghost
            className="py-2 w-[140px] flex justify-center items-center px-0 border-[#0B0B0B] font-next-book text-[14px] leading-[125%] tracking-[0.28px]"
            onClick={() => {
              CertificationModalRef.current?.open({
                status: CertificationStatus.CERTIFIED
              });
            }}
          >
            Learn More
          </Button>
        </div>
        <div className="w-[246px] h-[283px] relative mr-[130px]">
          <Image
            fill
            src={CertificationImage}
            alt="certification"
            className="z-50"
          ></Image>
        </div>
      </div>
      <CertificationModal ref={CertificationModalRef}></CertificationModal>
    </div>
  );
};

export default CertificationCard;
