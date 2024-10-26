import Image from 'next/image';
import React, { useContext } from 'react';
import HackLogo from '@/public/images/user/hack_logo.png';
import dayjs from '@/components/Common/Dayjs';
import { FiTrash2 } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { BiSpreadsheet } from 'react-icons/bi';
import { NotificateType, NotificationType } from '@/service/webApi/user/type';
import webApi from '@/service';
import Link from 'next/link';
import { useShallow } from 'zustand/react/shallow';
import { useUserStore } from '@/store/zustand/userStore';

interface NotificationCardProp {
  message: NotificationType;
  border: boolean;
  updateList: VoidFunction;
  openInfoModal: VoidFunction;
}

const NotificationCard: React.FC<NotificationCardProp> = ({ message, border, updateList, openInfoModal }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const { setNotificationModalOpen } = useUserStore(
    useShallow((state) => ({
      setNotificationModalOpen: state.setNotificationModalOpen
    }))
  );
  const hoverRender = () => {
    switch (message.type) {
      case NotificateType.MESSAGE:
        return (
          <div className="flex cursor-pointer items-center gap-[8px]" onClick={() => handleClick()}>
            <div className="flex-center h-[28px] w-[28px] rounded-[50%] bg-yellow-primary">
              <BiSpreadsheet />
            </div>
            <span>{t('notificationModal.readFullMessage')}</span>
          </div>
        );
      default:
        return (
          <Link href={message.content.link} className="flex items-center gap-[8px] " onClick={() => handleClick(false)}>
            <div className="flex-center h-[28px] w-[28px] rounded-[50%] bg-yellow-primary text-neutral-black">
              <IoIosArrowForward />
            </div>
            <span className="text-neutral-black">{t('learnMore')}</span>
          </Link>
        );
    }
  };
  const handleClick = async (open = true) => {
    await webApi.userApi.notificationReadById(message.id);
    updateList();
    open ? openInfoModal() : setNotificationModalOpen(false);
  };
  const handleDelete = async () => {
    await webApi.userApi.notificationDeteleById(message.id);
    updateList();
  };
  return (
    <div
      className={`group border-b border-t  py-[10px]  ${border ? 'border-neutral-light-gray' : 'border-b-transparent'} ${message.isRead && 'opacity-[0.5]'}`}
    >
      <div className="relative py-[6px] group-hover:px-[20px]">
        <div className="flex gap-[16px] ">
          <div className="relative h-[36px] w-[36px] flex-shrink-0 overflow-hidden rounded-[50%]">
            <Image src={message.avatar || HackLogo} alt={'hack-logo'} fill className="object-cover" />
          </div>
          <div className="flex-1 ">
            <p className="body-m whitespace-pre-line text-neutral-black">{message.content.content}</p>
            <div className="caption-12pt mt-[4px] flex items-center justify-between text-neutral-rich-gray">
              <div className="flex gap-[16px]">
                <span>{dayjs(message.createdAt).format('MMM D,YY')}</span>
                <span className="capitalize">{message.type?.toLocaleLowerCase()}</span>
              </div>
              <div className="relative z-[3] cursor-pointer" onClick={handleDelete}>
                <FiTrash2 size={16} />
              </div>
            </div>
          </div>
        </div>
        <div className="body-m absolute left-0 top-0 flex h-0 w-full items-center  justify-center overflow-hidden rounded-[8px] bg-yellow-extra-light text-neutral-black opacity-[0.95] transition-all  group-hover:h-full">
          {hoverRender()}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
