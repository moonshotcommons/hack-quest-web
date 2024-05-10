'use client';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useEffect, useRef, useState } from 'react';
// import NotificationCard from './NotificationCard';
import { useUserStore } from '@/store/zustand/userStore';
import { useShallow } from 'zustand/react/shallow';
import { motion } from 'framer-motion';
import { ani } from './data';
import MessageModal from './MessageModal';
import Loading from '@/components/Common/Loading';
import { notificationStore } from '@/store/zustand/notificationStore';
import { useHandleNotification } from '@/hooks/notification/useHandleNotification';
import webApi from '@/service';

interface NotificationModalProp {}

const NotificationModal: React.FC<NotificationModalProp> = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const { updateNotification } = useHandleNotification();
  const [limit, setLimit] = useState(10);
  const { notificationModalOpen, setNotificationModalOpen } = useUserStore(
    useShallow((state) => ({
      notificationModalOpen: state.notificationModalOpen,
      setNotificationModalOpen: state.setNotificationModalOpen
    }))
  );
  const { notificationList, notificationLoading, notificationTotal } = notificationStore(
    useShallow((state) => ({
      notificationList: state.notificationList,
      notificationLoading: state.notificationLoading,
      notificationTotal: state.notificationTotal
    }))
  );

  const handleReadAll = async () => {
    await webApi.userApi.notificationReadAll();
    updateNotification({ limit });
  };

  const handleScroll = () => {
    if (notificationList.length === notificationTotal || notificationLoading) return;
    const clientHeight = boxRef.current?.clientHeight || 0;
    const scrollTop = boxRef.current?.scrollTop || 0;
    const scrollHeight = boxRef.current?.scrollHeight || 0;
    if (clientHeight + scrollTop >= scrollHeight - 1) {
      const newLimit = limit + 10;
      updateNotification({ limit: newLimit });
      setLimit(newLimit);
    }
  };
  console.info(notificationList);
  useEffect(() => {
    setLimit(10);
  }, [notificationModalOpen]);

  return notificationModalOpen ? (
    <>
      <div
        className={`fixed left-0 top-[64px] z-[1200] h-[calc(100vh-64px)]  w-[100vw] bg-neutral-black opacity-[0.5]`}
      ></div>
      <div
        className="flex-center fixed left-0 top-[64px] z-[1200] h-[calc(100vh-64px)] w-[calc(100vw-434px)]"
        onClick={() => {
          setNotificationModalOpen(false);
          setInfoModalOpen(false);
        }}
      >
        <MessageModal open={infoModalOpen} onClose={() => setInfoModalOpen(false)} />
      </div>
      <motion.div
        {...ani}
        className="fixed right-0 top-[64px] z-[1200] flex  h-[calc(100vh-64px)] w-[434px] flex-col bg-neutral-white pb-[10px] pt-[20px] text-neutral-black shadow-[0_8px_8px_0_rgba(0,0,0,0.25)]"
      >
        <div className="body-l flex w-full items-center justify-between border-b border-neutral-light-gray px-[40px] pb-[16px]">
          <span>{t('notificationModal.title')}</span>
          <span className="underline-s cursor-pointer" onClick={handleReadAll}>
            {t('notificationModal.markAll')}
          </span>
        </div>

        <div className="relative w-full flex-1">
          <div
            className="scroll-wrap-y absolute left-0 top-0 h-full w-full px-[20px]"
            ref={boxRef}
            onScroll={handleScroll}
          >
            <Loading loading={notificationLoading}>
              {notificationList.map((message, i) => (
                <div key={i} className={`mt-[-1px] px-[20px] hover:px-[0]`}>
                  {/* <NotificationCard
                    message={message}
                    openInfoModal={() => setInfoModalOpen(true)}
                    border={i !== notificationList.length - 1}
                    updateList={() => updateNotification({ limit })}
                  /> */}
                </div>
              ))}
            </Loading>
          </div>
        </div>
      </motion.div>
    </>
  ) : null;
};

export default NotificationModal;
