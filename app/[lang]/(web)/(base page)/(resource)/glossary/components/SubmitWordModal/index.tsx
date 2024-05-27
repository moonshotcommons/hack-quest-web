import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import Modal from '@/components/Common/Modal';
import { LangContext } from '@/components/Provider/Lang';
import { HACKQUEST_DISCORD } from '@/constants/links';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import webApi from '@/service';
import { CoustomKeywordType } from '@/service/webApi/resourceStation/type';
import message from 'antd/es/message';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { HiArrowLongRight } from 'react-icons/hi2';

interface SubmitWordModalProp {
  open: boolean;
  onClose: VoidFunction;
  keyword?: string;
}

const SubmitWordModal: React.FC<SubmitWordModalProp> = ({ open, onClose, keyword: k }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const onSubmit = () => {
    if (!keyword || loading) return;
    setLoading(true);
    webApi.resourceStationApi
      .customKeyword({
        type: CoustomKeywordType.GLOSSARY,
        keyword
      })
      .then(() => {
        setIsSuccess(true);
      })
      .catch((err) => {
        message.error(err.msg);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (open) {
      setKeyword(k || '');
      setIsSuccess(false);
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} showCloseIcon icon={<FiX size={30} />} iconClassName="right-[16px] top-[16px]">
      <div className="flex w-[670px] flex-col items-center gap-[20px] rounded-[16px] bg-neutral-white px-[40px] py-[48px]">
        {!isSuccess ? (
          <>
            <p className="text-h3 text-neutral-black">{t('submitWord')}</p>
            <div className="w-full">
              <Input
                label={<span className="body-l text-neutral-medium-gray">{t('requiredQuestion')}</span>}
                name=""
                value={keyword}
                theme="light"
                placeholder={t('anyWordAboutWeb3')}
                className="border-neutral-medium-gray"
                maxLength={60}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <div className="body-l mt-[10px] flex w-full justify-end text-neutral-medium-gray">{`${keyword.length}/60`}</div>
            </div>
            <Button
              loading={loading}
              className={`button-text-m h-[48px] w-[256px] uppercase ${keyword ? 'bg-yellow-primary text-neutral-black' : 'cursor-not-allowed bg-neutral-light-gray text-neutral-medium-gray'}`}
              onClick={onSubmit}
            >
              {t('submit')}
            </Button>
          </>
        ) : (
          <>
            <p className="text-h3 text-neutral-black">{t('submittedSuccessfully')}</p>
            <p className="body-s text-neutral-black">{t('ThanksForSubmission')}</p>
            <Button ghost onClick={onClose} className="button-text-m h-[48px] w-[256px] border-neutral-black uppercase">
              {t('close')}
            </Button>
          </>
        )}
        <div className="caption-14pt flex justify-center gap-[16px] pt-[16px] text-neutral-black">
          <span>{t('hearFollowup')}?</span>
          <Link href={HACKQUEST_DISCORD} target="_blank" className="flex items-center gap-[6px]">
            <span>{t('join')} Discord</span>
            <HiArrowLongRight size={20}></HiArrowLongRight>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default SubmitWordModal;
