'use client';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useGlobalStore } from '@/store/zustand/globalStore';
import React, { useContext } from 'react';
import { useShallow } from 'zustand/react/shallow';

interface WechatTipsModalProp {}

const WechatTipsModal: React.FC<WechatTipsModalProp> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);
  const { wechatTipsOpen, setWechatTipsOpen } = useGlobalStore(
    useShallow((state) => ({
      setWechatTipsOpen: state.setWechatTipsOpen,
      wechatTipsOpen: state.wechatTipsOpen
    }))
  );
  return (
    <Modal open={wechatTipsOpen} onClose={() => setWechatTipsOpen(false)}>
      <div className="flex flex-col items-center gap-[30px] rounded-[16px] bg-neutral-white p-[40px] pb-[30px]">
        <div className="body-l text-neutral-off-black">{t('wechatTips')}：HackQuest-Lily</div>
        <Button type="primary" onClick={() => setWechatTipsOpen(false)} className="h-[36px] w-[160px]">
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default WechatTipsModal;
