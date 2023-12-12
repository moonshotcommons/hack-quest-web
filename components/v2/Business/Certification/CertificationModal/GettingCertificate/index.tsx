import Button from '@/components/v2/Common/Button';
import Tooltip from '@/components/v2/Common/Tooltip';
import {
  ShareWrap,
  shareList
} from '@/components/v2/Home/InviteCodeCard/constant';
import { cn, errorMessage } from '@/helper/utils';
import { useMintCertification } from '@/hooks/useMintCertification';
import webApi from '@/service';
import { CertificationType } from '@/service/webApi/campagins/type';
import { useRequest } from 'ahooks';
import Link from 'next/link';
import { FC, useState } from 'react';
import { RiShareBoxLine } from 'react-icons/ri';
interface GettingCertificateProps {
  certification: CertificationType;
  refreshCertification?: VoidFunction;
  closeModal?: VoidFunction;
}

const badge = (
  <svg
    width="53"
    height="70"
    viewBox="0 0 53 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28.4489 44.4586L21.6389 40.5269L10.6508 59.5588L14.62 68.411L28.4489 44.4586Z"
      fill="#FDEAAA"
      stroke="#DADADA"
      strokeLinecap="square"
    />
    <path
      d="M14.8289 36.5951L21.6389 40.5269L10.6508 59.5588L1 60.5475L14.8289 36.5951Z"
      fill="#FCC409"
      stroke="#DADADA"
      strokeLinecap="square"
    />
    <path
      d="M24.5406 44.4586L31.3506 40.5269L42.3387 59.5588L38.3695 68.411L24.5406 44.4586Z"
      fill="#FCC409"
      stroke="#DADADA"
    />
    <path
      d="M38.1606 36.5951L31.3506 40.5269L42.3387 59.5588L51.9895 60.5475L38.1606 36.5951Z"
      fill="#FDEAAA"
      stroke="#DADADA"
      strokeLinecap="round"
    />
    <circle
      cx="26.4856"
      cy="24.0344"
      r="23.4455"
      fill="#FFD850"
      stroke="#DADADA"
    />
    <path
      d="M33.789 16.4553L33.7918 16.4526C33.1338 15.8126 32.3922 15.2583 31.5848 14.8079C30.0778 13.967 28.3417 13.4877 26.493 13.4871L16.477 13.9468L16.016 23.9639C16.0169 26.86 17.201 29.4892 19.1132 31.3885L19.22 31.4945L19.2172 31.4973C19.6529 31.9178 20.1249 32.3009 20.6281 32.6413C22.2999 33.7724 24.3157 34.4332 26.4862 34.4339L36.5017 33.9741L36.9628 23.957C36.9619 21.0756 35.7899 18.4585 33.895 16.5614L33.789 16.4553Z"
      fill="#3E3E3E"
      stroke="#3E3E3E"
      strokeWidth="0.3"
    />
    <path
      d="M26.5019 30.1138C30.0043 30.1138 32.6559 27.5829 32.6559 23.9597C32.6559 20.3365 30.0043 17.8056 26.5019 17.8056C22.9995 17.8056 20.3478 20.3365 20.3478 23.9597C20.3478 27.5829 22.9995 30.1138 26.5019 30.1138Z"
      fill="#FFD850"
      stroke="#3E3E3E"
      strokeWidth="0.3"
    />
  </svg>
);

const GettingCertificate: FC<GettingCertificateProps> = ({
  certification,
  refreshCertification,
  closeModal
}) => {
  const [showShare, setShowShare] = useState(false);
  const { safeMintAsync } = useMintCertification();

  const { run: safeMint, loading } = useRequest(
    async (params: {
      sourceType: 'Certification';
      sourceId: string;
      signatureId: number;
    }) => {
      const res = await safeMintAsync({
        sourceType: params.sourceType,
        sourceId: params.sourceId,
        signatureId: params.signatureId
      });

      return res;
    },
    {
      manual: true,
      onSuccess(res) {
        refreshCertification?.();
      },
      onError(e) {
        errorMessage(e);
      }
    }
  );

  return (
    <div className="flex-1">
      <div className="flex items-center gap-x-5 h-fit">
        <div>{badge}</div>
        <h3 className="font-next-poster-Bold leading-[125%] text-[28px] tracking-[1.68px] text-[#131313]">
          Congratulations! You are now a Certified Mantle Developer.
        </h3>
      </div>

      <p className="mt-5 text-[#0B0B0B] font-next-book text-[16px] leading-[160%] tracking-[0.32px]">
        {`This certificate, co-issued by Mantle Network and HackQuest, certifies that you have successfully completed the Mantle Learning Track. It attests that you have acquired foundational skills and understanding in Solidity Development, Deploying to Mantle, Mantle Architecture, and EVM Concepts. Share your accomplishment with the world!`}
      </p>

      <div
        className="flex gap-x-[10px] mt-[30px]"
        onMouseLeave={() => {
          if (showShare) setShowShare(false);
        }}
      >
        {/* <Tooltip
          show={showShare}
          // customize={true}
          title={
            <div className="flex gap-[20px]">
              {shareList('').map((item) => {
                return (
                  <ShareWrap
                    key={item.name}
                    name={item.name}
                    component={item.component}
                    icon={item.icon}
                    props={item.props}
                    showName={false}
                    iconSize={24}
                  ></ShareWrap>
                );
              })}
            </div>
          }
          placement="bottom"
          className="-mt-[6px]"
        >
          <Button
            type="primary"
            icon={<RiShareBoxLine />}
            iconPosition="left"
            className="w-[210px] py-[11px] px-0 font-next-book text-[#0B0B0B] text-[16px] leading-[125%] tracking-[0.32px] outline-none"
            onClick={() => setShowShare(true)}
          >
            Share
          </Button>
        </Tooltip> */}
        <Button
          type="primary"
          loading={loading}
          className={cn(
            'w-[210px] py-[11px] px-0 font-next-book text-[#0B0B0B] text-[16px] leading-[125%] tracking-[0.32px] outline-none',
            certification.mint ? 'cursor-not-allowed opacity-40' : ''
          )}
          onClick={() => {
            if (certification.mint) {
              return;
            }
            safeMint({
              sourceType: 'Certification',
              sourceId: certification.id,
              signatureId: certification.signatureId
            });
          }}
        >
          {certification.mint ? 'Minted' : 'Mint'}
        </Button>
        <Link href={'/user/profile'}>
          <Button
            ghost
            className="w-[210px] py-[11px] px-0 font-next-book text-[#0B0B0B] text-[16px] leading-[125%] tracking-[0.32px] border-[#0B0B0B]"
            onClick={() => closeModal?.()}
          >
            Check Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default GettingCertificate;
