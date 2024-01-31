import { FC, useContext, useEffect, useRef, useState } from 'react';
import { ProfileContext } from '../../constants/type';

import Button from '@/components/Common/Button';

import { Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import CertificationModal, {
  CertificationModalInstance
} from '@/components/Web/Business/Certification/CertificationModal';
import { CertificationType } from '@/service/webApi/campaigns/type';
import { errorMessage } from '@/helper/ui';
import { cn } from '@/helper/utils';
import { useMintCertification } from '@/hooks/useMintCertification';
import { useRequest } from 'ahooks';
import webApi from '@/service';
interface PersonalLinksProps {}

const MintButton = (props: {
  certification: CertificationType;
  updateSelectCertification: (certification: CertificationType) => void;
}) => {
  const { certification, updateSelectCertification } = props;
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

      return await webApi.campaignsApi.getCertificationDetail(params.sourceId);
    },
    {
      manual: true,
      onSuccess(res) {
        updateSelectCertification(res);
      },
      onError(e) {
        errorMessage(e);
      }
    }
  );

  return (
    <Button
      type="primary"
      block
      loading={loading}
      className={cn(
        'p-0 my-[10px] h-[28px] text-neutral-black rounded-[10px] text-[14px] leading-[125%] tracking-[0.32px] outline-none',
        certification.mint ? 'cursor-not-allowed opacity-40' : ''
      )}
      onClick={async () => {
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
  );
};

const Certifications: FC<PersonalLinksProps> = (props) => {
  const { profile, refresh } = useContext(ProfileContext);
  const certificationModalInstance = useRef<CertificationModalInstance>(null);
  const [selectCertification, setSelectCertification] =
    useState<CertificationType | null>(null);

  useEffect(() => {
    if (selectCertification) {
      certificationModalInstance.current?.open();
    }
  }, [selectCertification]);

  return (
    <div className="p-[30px] pb-[40px] bg-neutral-white rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] group hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] hover:-translate-y-1 transition-all duration-300 relative cursor-pointer">
      <p className="text-neutral-black  text-h3">
        {`Certifications (${profile?.certifications?.length || 0})`}
      </p>
      {/* {showLinks && (
        <div className="absolute right-[30px] top-[25px] hidden group-hover:block">
          <HoverIcon
            type={IconType.EDIT}
            tooltip="Edit your personal links"
            tooltipProps={{
              placement: 'topRight'
            }}
            // onClick={() => personalLinkEditRef.current?.onEdit({})}
          ></HoverIcon>
        </div>
      )} */}
      {profile?.certifications?.length > 0 && (
        <ul className="flex gap-[20px] mt-[20px] flex-wrap">
          {profile.certifications.map((item) => {
            return (
              <li
                key={item.id}
                className="flex w-[195px] flex-col justify-center"
              >
                <div className=" h-[108px] relative rounded-[10px]">
                  <Image
                    src={item.image}
                    fill
                    alt="Solidity Learning Track"
                  ></Image>
                </div>
                <MintButton
                  certification={item}
                  updateSelectCertification={(
                    certification: CertificationType
                  ) => {
                    setSelectCertification(certification);
                    refresh();
                  }}
                ></MintButton>
                <Typography.Paragraph
                  ellipsis={{ rows: 2 }}
                  className="text-center body-m"
                  style={{ marginBottom: '0px' }}
                >
                  {item.name}
                </Typography.Paragraph>
              </li>
            );
          })}
        </ul>
      )}
      {!profile?.certifications?.length && (
        <div className="flex flex-col items-center">
          <p className="mt-[56.2px] text-center body-l">
            You don’t have any certificate yet~
          </p>
          <Link href={'/dashboard'}>
            <Button
              type="primary"
              className="w-[265px] px-0 py-[12px] body-m leading-[125%] tracking-[0.32px] text-neutral-black mt-[25px] mb-[30px]"
              // onClick={() => personalLinkEditRef.current?.onEdit({})}
            >
              Go to Learning
            </Button>
          </Link>
        </div>
      )}
      {selectCertification && (
        <CertificationModal
          ref={certificationModalInstance}
          certification={selectCertification}
          onClose={() => {
            setSelectCertification(null);
          }}
        ></CertificationModal>
      )}
    </div>
  );
};

export default Certifications;
