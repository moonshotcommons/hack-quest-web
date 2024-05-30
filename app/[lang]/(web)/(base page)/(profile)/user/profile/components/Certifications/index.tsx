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
import message from 'antd/es/message';
interface PersonalLinksProps {}

const MintButton = (props: {
  certification: CertificationType;
  updateSelectCertification: (certification: CertificationType) => void;
}) => {
  const { certification, updateSelectCertification } = props;
  const { safeMintAsync } = useMintCertification();

  const { run: safeMint, loading } = useRequest(
    async (params: { sourceType: 'Certification'; sourceId: string; signatureId: number }) => {
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
        'body-s my-[10px] h-[28px] rounded-[10px] p-0 text-neutral-black outline-none',
        certification.mint ? 'cursor-not-allowed opacity-40' : ''
      )}
      onClick={async () => {
        if (!certification.name.toLowerCase().startsWith('mantle')) {
          const zoology = certification.name.replace(' Learning Track', '');
          message.info(`${zoology} NFT will open for minting soon!`);
          return;
        }

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
  const [selectCertification, setSelectCertification] = useState<CertificationType | null>(null);

  useEffect(() => {
    if (selectCertification) {
      certificationModalInstance.current?.open();
    }
  }, [selectCertification]);

  return (
    <div className="group relative cursor-pointer rounded-[10px] bg-neutral-white p-[30px] pb-[40px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
      <p className="text-h3  text-neutral-black">{`Certifications (${profile?.certifications?.length || 0})`}</p>
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
        <ul className="mt-[20px] flex flex-wrap gap-[20px]">
          {profile.certifications.map((item) => {
            return (
              <li key={item.id} className="flex w-[195px] flex-col justify-center">
                <div className=" relative h-[108px] rounded-[10px]">
                  <Image src={item.image} fill alt="Solidity Learning Track"></Image>
                </div>
                <MintButton
                  certification={item}
                  updateSelectCertification={(certification: CertificationType) => {
                    setSelectCertification(certification);
                    refresh();
                  }}
                ></MintButton>
                <Typography.Paragraph
                  ellipsis={{ rows: 2 }}
                  className="body-m text-center"
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
          <p className="body-l mt-[56.2px] text-center">You don’t have any certificate yet~</p>
          <Link href={'/dashboard'}>
            <Button
              type="primary"
              className="body-m mb-[30px] mt-[25px] w-[265px] px-0 py-[12px] leading-[125%] tracking-[0.32px] text-neutral-black"
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
