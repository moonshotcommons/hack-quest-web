import { FC, ReactNode, useContext, useRef } from 'react';
import { BoxType, ProfileContext } from '../type';
import { getThirdPartyMedia, thirdPartyMedia } from '@/helper/thirdPartyMedia';
import { RiShareBoxLine } from 'react-icons/ri';
import Button from '@/components/v2/Common/Button';
import Tooltip from '@/components/v2/Common/Tooltip';
import EditButton from '../PersonalEdit/EditButton';

import HoverIcon from '../components/HoverIcon';
import { IconType } from '../components/HoverIcon/type';
interface OnChainActivityProps {}

const OnChainActivity: FC<OnChainActivityProps> = (props) => {
  const { profile } = useContext(ProfileContext);

  console.log(profile);

  return (
    <div className="w-full h-fit p-[30px] pb-[40px] bg-white rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] group hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] hover:-translate-y-1 transition-all duration-300 relative cursor-pointer">
      <p className="text-black font-next-poster-Bold text-[28px] tracking-[1.68px] leading-[125%]">
        On-Chain Activity
      </p>
      {Object.keys(profile.onChainActivity || {}).length > 0 && (
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
      )}
      <div className="flex mt-[30px]">
        <div className="flex flex-col items-center flex-1 relative after:absolute after:right-0 after:top-0 after:h-full after:bg-black after:w-[1px] after:scale-x-50">
          <span className="font-next-book-Thin text-[54px] leading-[160%] tracking-[0.162px] text-black">
            56
          </span>
          <p className="mt-5 font-next-book leading-[125%] tracking-[0.32px] text-[16px] text-[#8C8C8C]">
            Deployed Contracts
          </p>
        </div>
        <div className="flex flex-col items-center flex-1">
          <span className="font-next-book-Thin text-[54px] leading-[160%] tracking-[0.162px] text-black">
            96
          </span>
          <p className="mt-5 font-next-book leading-[125%] tracking-[0.32px] text-[16px] text-[#8C8C8C]">
            Defi Interaction
          </p>
        </div>
      </div>
      {/* {Object.keys(profile.onChainActivity || {}).length <= 0 && (
        <div className="flex flex-col items-center">
          <p className="mt-[57px] text-center font-next-book text-[18px] leading-[160%] tracking-[0.054px]">
            Share your on-chain activities
          </p>
          <Button
            type="primary"
            className="w-[223px] px-0 py-[12px] text-[16px] font-next-book leading-[125%] tracking-[0.32px] text-[#0B0B0B] mt-[25px] mb-[30px]"
            // onClick={() => personalLinkEditRef.current?.onEdit({})}
          >
            Connect to MetaMask
          </Button>
        </div>
      )} */}
      {/* <PersonalLinkEditModal ref={personalLinkEditRef}></PersonalLinkEditModal>  */}
    </div>
  );
};

export default OnChainActivity;
