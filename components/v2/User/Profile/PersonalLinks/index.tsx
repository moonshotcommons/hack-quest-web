import { FC, ReactNode, useContext, useRef } from 'react';
import { ProfileContext } from '../type';
import { getThirdPartyMedia, thirdPartyMedia } from '@/helper/thirdPartyMedia';
import { RiShareBoxLine } from 'react-icons/ri';
import Button from '@/components/v2/Common/Button';
import Tooltip from '@/components/v2/Common/Tooltip';
import EditButton from '../PersonalEdit/EditButton';
import PersonalLinkEditModal, {
  PersonalLinkEditModalRef
} from './PersonalLinkEditModal';
interface PersonalLinksProps {}

const PersonalLinks: FC<PersonalLinksProps> = (props) => {
  const { profile } = useContext(ProfileContext);
  const personalLinkEditRef = useRef<PersonalLinkEditModalRef>(null);
  return (
    <div className="w-[420px] h-fit p-[30px] pb-[40px] bg-white rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] hover:-translate-y-1 transition-all duration-300 relative cursor-pointer">
      <p className="text-black font-next-poster-Bold text-[28px] tracking-[1.68px] leading-[125%]">
        Personal Links
      </p>
      <div
        className="absolute right-[30px] top-[25px]"
        onClick={() => personalLinkEditRef.current?.onEdit({})}
      >
        <Tooltip title="Edit your personal links" placement="topRight">
          <EditButton className="bg-[#F4F4F4]"></EditButton>
        </Tooltip>
      </div>
      {Object.keys(profile.personalLinks || {}).length > 0 && (
        <ul>
          {Object.keys(
            profile.personalLinks || {
              x: '',
              github: '',
              linkedIn: '',
              telegram: ''
            }
          ).map((key, index) => {
            const media = getThirdPartyMedia(
              key as keyof typeof thirdPartyMedia
            );
            if (!media) return null;
            return (
              <li
                key={index}
                className="text-black relative flex items-center py-[20px] after:absolute after:h-[1px] after:scale-y-[0.5] after:w-full after:bg-black after:bottom-0"
              >
                <div className="flex gap-x-[15px] items-center h-full flex-1">
                  <span>{media.icon}</span>
                  <span className="text-[18px] text-[#0B0B0B] font-next-book leading-[160%] tracking-[0.36px]">
                    {media.name}
                  </span>
                </div>
                <div className="flex gap-[10px] items-center">
                  <p className="w-[140px] flex-1 truncate text-[14px] font-next-book text-[#8C8C8C] leading-[160%] -tracking-[0.154px]">
                    {profile.personalLinks[key]}
                  </p>
                  <RiShareBoxLine size={20}></RiShareBoxLine>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {Object.keys(profile.personalLinks || {}).length <= 0 && (
        <div className="flex flex-col items-center">
          <p className="mt-[57px] text-center font-next-book text-[18px] leading-[160%] tracking-[0.054px]">
            Share your social media information
          </p>
          <Button
            type="primary"
            className="w-[223px] px-0 py-[12px] text-[16px] font-next-book leading-[125%] tracking-[0.32px] text-[#0B0B0B] mt-[25px] mb-[30px]"
            onClick={() => personalLinkEditRef.current?.onEdit({})}
          >
            Add Personal links
          </Button>
        </div>
      )}
      <PersonalLinkEditModal ref={personalLinkEditRef}></PersonalLinkEditModal>
    </div>
  );
};

export default PersonalLinks;
