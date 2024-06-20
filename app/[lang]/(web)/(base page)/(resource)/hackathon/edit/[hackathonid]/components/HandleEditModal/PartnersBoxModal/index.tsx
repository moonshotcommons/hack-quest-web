import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useState, FocusEvent, useMemo } from 'react';
import { HackathonType, MentorType } from '@/service/webApi/resourceStation/type';
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io';
import { v4 } from 'uuid';
import { errorMessage } from '@/helper/ui';

import { message } from 'antd';
import BaseImage from '@/components/Common/BaseImage';
import { cloneDeep } from 'lodash-es';
import Button from '@/components/Common/Button';
import { HackathonEditContext, HackathonEditModalType } from '../../../constants/type';
import EditTitle from '../EditTitle';
import webApi from '@/service';

interface PartnersBoxModalProp {
  hackathon: HackathonType;
}

const PartnersBoxModal: React.FC<PartnersBoxModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [partners, setPartners] = useState<MentorType[]>([]);
  const { modalType, setModalType } = useContext(HackathonEditContext);
  const handleAdd = () => {
    // if (partners.some((v) => !v.name || !v.picture)) return;
    const p = {
      name: '',
      picture: '',
      title: '',
      id: v4()
    };
    setPartners([...partners, p]);
  };

  const handleChangeName = (e: FocusEvent<HTMLInputElement>, index: number) => {
    const name = e.target.value;
    const newPartners = cloneDeep(partners);
    newPartners[index].name = name;
    setPartners(newPartners);
  };

  const handleRemove = (i: number) => {
    const newPartners = cloneDeep(partners);
    newPartners.splice(i, 1);
    setPartners(newPartners);
  };

  const handleRemoveSection = () => {};

  const handleEditTile = (title: string) => {};

  const cantSubmit = useMemo(() => {
    return partners.some((v) => !v.name || !v.picture) || !partners.length;
  }, [partners]);

  return (
    <div className="">
      <div className="px-[40px]">
        <EditTitle title={t(`hackathonDetail.${modalType}`)} handleEditTile={handleEditTile} />
      </div>
      <div className="scroll-wrap-y flex flex-1 flex-col gap-[24px] px-[40px]">
        <p className="body-l text-neutral-off-black">{t('hackathonDetail.mediaPartnersUploadText')}</p>
        <div className="flex flex-wrap gap-[20px]">
          {partners.map((v, i) => (
            <div
              className="group relative flex h-[56px] w-[calc((100%-60px)/4)] items-center gap-[5px] rounded-[80px] border border-neutral-medium-gray bg-neutral-white p-[5px]"
              key={v.id}
            >
              <div
                className="absolute right-0 top-[-10px] hidden cursor-pointer group-hover:block"
                onClick={() => handleRemove(i)}
              >
                <IoIosCloseCircle size={24} className="text-status-error-dark" />
              </div>
              {!v.picture ? (
                <div className="flex-center relative h-[46px] w-[46px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[50%] border border-dashed border-neutral-medium-gray text-neutral-medium-gray">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    className="absolute left-0 top-0 h-full w-full opacity-0"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append('file', file);
                      formData.append('filepath', `hackathons/${hackathon.id}`);
                      formData.append('isPublic', `${true}`);
                      try {
                        const res = await webApi.commonApi.uploadImage(formData);
                        const newPartners = cloneDeep(partners);
                        newPartners[i].picture = res.filepath;
                        setPartners(newPartners);
                        message.success('Upload successfully');
                      } catch (e: any) {
                        errorMessage(e);
                      }
                    }}
                  />
                  <IoIosAddCircle size={26} />
                </div>
              ) : (
                <BaseImage src={v.picture} alt={v.name} className="h-[46px] w-[46px] flex-shrink-0 rounded-[50%]" />
              )}
              {!v.name ? (
                <input
                  type="text"
                  placeholder={t('hackathonDetail.enterName')}
                  className="body-s-bold w-0 flex-1 cursor-pointer border-none text-neutral-off-black outline-none"
                  maxLength={30}
                  onKeyDown={(e) => {
                    if (e.code === 'Enter') {
                      handleChangeName(e as any, i);
                    }
                  }}
                  onBlur={(e) => {
                    handleChangeName(e, i);
                  }}
                />
              ) : (
                <span className="body-s-bold w-0 flex-1 truncate text-neutral-off-black" title={v.name}>
                  {v.name}
                </span>
              )}
            </div>
          ))}
          <div
            className="h-[56px] w-[calc((100%-60px)/4)] cursor-pointer rounded-[80px] bg-neutral-off-white p-[5px]"
            onClick={handleAdd}
          >
            <div className="flex-center h-full w-full rounded-[80px] border border-dashed border-neutral-light-gray text-neutral-medium-gray">
              <IoIosAddCircle size={26} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-[40px]">
        <span className="underline-m cursor-pointer text-neutral-off-black" onClick={handleRemoveSection}>
          {t('hackathonDetail.removeSection')}
        </span>
        <div className="flex gap-[16px]">
          <Button
            ghost
            className="h-[48px] w-[165px] uppercase"
            onClick={() => setModalType(HackathonEditModalType.NULL)}
          >
            {t('cancel')}
          </Button>
          <Button
            type="primary"
            disabled={cantSubmit}
            className={`h-[48px] w-[165px] uppercase ${cantSubmit && 'bg-neutral-light-gray text-neutral-medium-gray'}`}
          >
            {t('handleButtonText.save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartnersBoxModal;
