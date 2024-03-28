import { FC, useContext, useMemo, useRef } from 'react';
import { ProfileContext, ProfileHandleType } from '../../constants/type';
import { getThirdPartyMedia, thirdPartyMedia } from '@/helper/thirdPartyMedia';
import { RiShareBoxLine } from 'react-icons/ri';
import Button from '@/components/Common/Button';
import PersonalLinkEditModal, { PersonalLinkEditModalRef } from './PersonalLinkEditModal';
import HoverIcon from '@/components/Web/Business/HoverIcon';
import { IconType } from '@/components/Web/Business/HoverIcon/type';
import { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
interface PersonalLinksProps {}

const PersonalLinks: FC<PersonalLinksProps> = (props) => {
  const { profile } = useContext(ProfileContext);
  const personalLinkEditRef = useRef<PersonalLinkEditModalRef>(null);
  const query = useSearchParams();
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

    if (query.get('type') === ProfileHandleType.PERSONAL_EDIT) {
      personalLinkEditRef.current?.onEdit({});
    }
  }, [profile]);

  return (
    <div className="group relative w-full cursor-pointer rounded-[10px] bg-neutral-white p-[30px] pb-[40px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]">
      <p className="text-h3 text-neutral-black">Personal Links</p>
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
            const media = getThirdPartyMedia(key as keyof typeof thirdPartyMedia);
            if (!media) return null;
            return (
              <li
                key={index}
                className="relative flex items-center py-[20px] text-neutral-black after:absolute after:bottom-0 after:h-[1px] after:w-full after:scale-y-[0.5] after:bg-neutral-black"
              >
                <div className="flex h-full flex-1 items-center gap-x-[15px]">
                  <span>{media.icon}</span>
                  <span className="body-l text-neutral-black">{media.name}</span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <p className="body-s w-[140px] flex-1 truncate text-neutral-medium-gray">{personLinks[key]}</p>
                  {personLinks[key] && key !== 'discord' && (
                    <Link href={personLinks[key]} target="_blank" className="hover:text-neutral-black/40 transition duration-200">
                      <RiShareBoxLine size={20} color="currentColor"></RiShareBoxLine>
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {!showLinks && (
        <div className="flex flex-col items-center">
          <p className="body-l mt-[56.2px] text-center">Share your social media information</p>
          <Button
            type="primary"
            className="body-m mb-[30px] mt-[25px] w-[223px] px-0 py-[12px] text-neutral-black"
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
