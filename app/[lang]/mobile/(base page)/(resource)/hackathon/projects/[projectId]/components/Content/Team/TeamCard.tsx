'use client';
import Image from 'next/image';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useMemo } from 'react';
import { HackathonMemberType } from '@/service/webApi/resourceStation/type';
import MenuLink from '@/constants/MenuLink';
import { useRedirect } from '@/hooks/router/useRedirect';

interface TeamCardProp {
  member: HackathonMemberType;
}

const TeamCard: React.FC<TeamCardProp> = ({ member }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { redirectToUrl } = useRedirect();
  const about = member.info?.About;
  const contact = member.info?.Contact;
  const username = useMemo(() => {
    if (about?.firstName || about?.lastName) {
      return `${about?.firstName} ${about?.lastName}`;
    }
    return '';
  }, [member]);

  return (
    <div
      className="shaow-[0_0_8px_0_rgba(rgba(0,0,0,0.12))] flex gap-[1rem] rounded-[1rem] bg-neutral-white p-[.75rem] text-neutral-off-black"
      onClick={() => {
        redirectToUrl(`${MenuLink.USER_PROFILE}/${member.username}`);
      }}
    >
      <div className="flex-shrink-0">
        <div className="relative h-[5.25rem] w-[5.25rem] overflow-hidden rounded-[50%]">
          <Image src={member.avatar} alt={username} fill className="object-cover" />
        </div>
        <div className="mt-[.5rem] flex justify-between">
          {/* {contact?.email && (
            <IoIosMail
              size={16}
              onClick={(e: any) => {
                e.stopPropagation();
                copyText(contact.email);
              }}
            />
          )}
          {contact?.weChat && (
            <IoLogoWechat
              size={16}
              onClick={(e: any) => {
                e.stopPropagation();
                copyText(contact.weChat);
              }}
            />
          )}
          {contact?.telegram && (
            <FaTelegramPlane
              size={16}
              onClick={(e: any) => {
                e.stopPropagation();
                copyText(contact.telegram);
              }}
            />
          )} */}
        </div>
      </div>

      <div className="flex flex-1 flex-shrink-0 flex-col">
        <div className="h-[5.25rem]">
          <h2 className="body-s-bold line-clamp-1">{username}</h2>
          <p className="body-xs line-clamp-1 text-neutral-rich-gray">
            {member.isAdmin ? t('projectsDetail.teamLeader') : t('projectsDetail.teamMember')}
          </p>
          <p className="body-xs mt-[.25rem] line-clamp-2 h-[58px] w-full  text-neutral-medium-gray">{about?.bio}</p>
        </div>
        {/* <div className="body-xs mt-[.5rem] flex w-full justify-end">
          <span>{t('learnMore')}</span>
        </div> */}
      </div>
    </div>
  );
};

export default TeamCard;
