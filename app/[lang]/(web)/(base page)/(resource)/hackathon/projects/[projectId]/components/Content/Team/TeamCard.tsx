'use client';
import Image from 'next/image';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useMemo } from 'react';
import { IoIosMail } from 'react-icons/io';
import { IoLogoWechat } from 'react-icons/io5';
import { FaTelegramPlane } from 'react-icons/fa';
import { HackathonMemberType } from '@/service/webApi/resourceStation/type';
import { copyText } from '@/helper/utils';

interface TeamCardProp {
  member: HackathonMemberType;
}

const TeamCard: React.FC<TeamCardProp> = ({ member }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);

  const about = member.info?.About;
  const contact = member.info?.Contact;
  const username = useMemo(() => {
    if (about?.firstName || about?.lastName) {
      return `${about?.firstName} ${about?.lastName}`;
    }
    return '';
  }, [member]);

  return (
    <div className="shaow-[0_0_8px_0_rgba(rgba(0,0,0,0.12))] body-m flex flex-col items-center gap-[16px] rounded-[16px] bg-neutral-white p-[16px] text-neutral-off-black">
      <div className="relative h-[84px] w-[84px] overflow-hidden rounded-[50%]">
        <Image src={member.avatar} alt={username} fill className="object-cover" />
      </div>
      <div className="flex w-full flex-col items-center">
        <h2 className="body-m-bold line-clamp-1 w-full text-center">{username}</h2>
        <p className="body-s line-clamp-1 text-neutral-rich-gray">
          {member.isAdmin ? t('projectsDetail.teamLeader') : t('projectsDetail.teamMember')}
        </p>
        <p className="body-xs mt-[8px] line-clamp-3 h-[58px] w-full  text-neutral-medium-gray">{about?.bio || ''}</p>
      </div>
      <div className="body-xs flex w-full items-center justify-between">
        <div className="flex gap-[16px]">
          {contact?.email && <IoIosMail size={16} className="cursor-pointer" onClick={() => copyText(contact.email)} />}
          {contact?.weChat && (
            <IoLogoWechat size={16} className="cursor-pointer" onClick={() => copyText(contact.weChat)} />
          )}
          {contact?.telegram && (
            <FaTelegramPlane size={16} className="cursor-pointer" onClick={() => copyText(contact.telegram)} />
          )}
        </div>
        {/* <span>{t('learnMore')}</span> */}
      </div>
    </div>
  );
};

export default TeamCard;
