import { FC, ReactNode, useContext, useMemo, useRef } from 'react';
import { BoxType, ProfileContext } from '../type';
import { getThirdPartyMedia, thirdPartyMedia } from '@/helper/thirdPartyMedia';
import { RiShareBoxLine } from 'react-icons/ri';
import Button from '@/components/v2/Common/Button';
import Tooltip from '@/components/v2/Common/Tooltip';
import EditButton from '../PersonalEdit/EditButton';
import PersonalLinkEditModal, {
  PersonalLinkEditModalRef
} from './PersonalLinkEditModal';
import HoverIcon from '../components/HoverIcon';
import { IconType } from '../components/HoverIcon/type';
import { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
interface PersonalLinksProps {}

const PersonalLinks: FC<PersonalLinksProps> = (props) => {
  const { profile } = useContext(ProfileContext);
  const personalLinkEditRef = useRef<PersonalLinkEditModalRef>(null);

  const [personLinks, setPersonLinks] = useState<Record<string, string>>({});

  const showLinks = useMemo(() => {
    const keys = Object.keys(personLinks);
    if (!keys.length) return false;
    if (!keys.filter((key) => !!personLinks[key].trim()).length) return false;
    return true;
  }, [personLinks]);

  useEffect(() => {
    let newValues: Record<string, string> = {
      x: '',
      github: '',
      linkedIn: '',
      telegram: ''
    };

    Object.keys(profile?.personalLinks || {}).forEach((key: string) => {
      newValues[key] = profile?.personalLinks[key];
    });

    setPersonLinks(newValues);
  }, [profile]);

  return (
    <div className="w-[420px] h-fit p-[30px] pb-[40px] bg-white rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] group hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] hover:-translate-y-1 transition-all duration-300 relative cursor-pointer">
      <p className="text-black font-next-poster-Bold text-[28px] tracking-[1.68px] leading-[125%]">
        Personal Links
      </p>
      {showLinks && (
        <div className="absolute right-[30px] top-[25px] hidden group-hover:block">
          <HoverIcon
            type={IconType.EDIT}
            tooltip="Edit your personal links"
            tooltipProps={{
              placement: 'topRight'
            }}
            onClick={() => personalLinkEditRef.current?.onEdit({})}
          ></HoverIcon>
        </div>
      )}
      {showLinks && (
        <ul>
          {Object.keys(personLinks).map((key, index) => {
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
                    {personLinks[key]}
                  </p>
                  <Link
                    href={personLinks[key]}
                    target="_blank"
                    className="hover:text-black/40 transition duration-200"
                  >
                    <RiShareBoxLine
                      size={20}
                      color="currentColor"
                    ></RiShareBoxLine>
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {!showLinks && (
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
