import { FC, useContext } from 'react';
import { ProfileContext } from '../type';

import Button from '@/components/v2/Common/Button';

import { Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
interface PersonalLinksProps {}

const Certifications: FC<PersonalLinksProps> = (props) => {
  const { profile } = useContext(ProfileContext);

  return (
    <div className="p-[30px] pb-[40px] bg-white rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] group hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] hover:-translate-y-1 transition-all duration-300 relative cursor-pointer">
      <p className="text-black font-next-poster-Bold text-[28px] tracking-[1.68px] leading-[125%]">
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
                className="flex w-[168px] flex-col justify-center"
              >
                <div className=" h-[193px] relative rounded-[10px]">
                  <Image
                    src={item.image}
                    fill
                    alt="Solidity Learning Track"
                  ></Image>
                </div>
                <Typography.Paragraph
                  ellipsis={{ rows: 2 }}
                  className="text-center mt-[10px] font-next-book text-black leading-[125%] tracking-[0.32px]"
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
          <p className="mt-[56.2px] text-center font-next-book text-[18px] leading-[160%] tracking-[0.054px]">
            You don’t have any certificate yet~
          </p>
          <Link href={'/home'}>
            <Button
              type="primary"
              className="w-[265px] px-0 py-[12px] text-[16px] font-next-book leading-[125%] tracking-[0.32px] text-[#0B0B0B] mt-[25px] mb-[30px]"
              // onClick={() => personalLinkEditRef.current?.onEdit({})}
            >
              Go to Learning
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Certifications;
