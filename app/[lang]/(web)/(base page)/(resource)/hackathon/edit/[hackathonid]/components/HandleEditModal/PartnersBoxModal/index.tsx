import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useRef, useState, FocusEvent } from 'react';
import { HackathonType, MentorType } from '@/service/webApi/resourceStation/type';
import Title from '../../Title';
import { IoIosAddCircle } from 'react-icons/io';
import { v4 } from 'uuid';
import ImageCrop, { ImageCropRef } from '@/components/Common/ImageCrop';
import { errorMessage } from '@/helper/ui';

import webApi from '@/service';
import { Upload, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import BaseImage from '@/components/Common/BaseImage';
import { cloneDeep } from 'lodash-es';

interface PartnersBoxModalProp {
  hackathon: HackathonType;
  type: 'partners' | 'mediaPartners' | 'communityPartners';
}

const PartnersBoxModal: React.FC<PartnersBoxModalProp> = ({ type, hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const imageCropRef = useRef<ImageCropRef>(null);
  const [partners, setPartners] = useState<MentorType[]>([]);
  const [curIndex, setCurIndex] = useState(-1);
  const handleAdd = () => {
    const p = {
      name: '',
      picture: '',
      title: ''
    };
    setPartners([...partners, p]);
  };

  const handleChangeName = (e: FocusEvent<HTMLInputElement>, index: number) => {
    const name = e.target.value;
    const newPartners = cloneDeep(partners);
    newPartners[index].name = name;
    setPartners(newPartners);
  };

  return (
    <div className="flex w-full flex-col gap-[24px]">
      <Title title={`hackathonDetail.${type}`} />
      <p className="body-l text-neutral-off-black">{t('hackathonDetail.mediaPartnersUploadText')}</p>
      <div className="flex flex-wrap gap-[20px]">
        {partners.map((v, i) => (
          <div
            className="flex h-[56px] w-[calc((100%-60px)/4)] items-center gap-[5px] overflow-hidden rounded-[80px] border border-neutral-medium-gray bg-neutral-white p-[5px]"
            key={`${v4()}${i}`}
          >
            {!v.picture ? (
              <div
                className="flex-center h-[46px] w-[46px] flex-shrink-0 cursor-pointer rounded-[50%] border border-dashed border-neutral-medium-gray text-neutral-medium-gray"
                onClick={() => {
                  setCurIndex(i);
                  imageCropRef.current?.onEdit({
                    imageUrl: ''
                  });
                }}
              >
                <IoIosAddCircle size={26} />
              </div>
            ) : (
              <BaseImage src={v.picture} alt={v.name} className="h-[46px] w-[46px] flex-shrink-0 rounded-[50%]" />
            )}
            {!v.name ? (
              <input
                type="text"
                placeholder={t('hackathonDetail.enterName')}
                className="caption-12pt w-0 flex-1 border-none text-neutral-off-black outline-none"
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

      <ImageCrop
        ref={imageCropRef}
        title={t('uploadImage')}
        cropShape="round"
        quality={1}
        maxZoom={10}
        minZoom={1}
        onModalOk={async (res) => {
          if (!res) return;
          const file = res as RcFile;
          const formData = new FormData();
          formData.append('file', file);
          formData.append('filepath', `hackathons/${hackathon.id}`);
          try {
            const res = await webApi.commonApi.uploadImage(formData);
            const newPartners = cloneDeep(partners);
            newPartners[curIndex].picture = res.content;
            setPartners(newPartners);
            message.success('Updated successfully');
          } catch (e: any) {
            errorMessage(e);
          }
        }}
        aspect={1}
        cropperProps={{
          zoomSpeed: 0.1,
          objectFit: 'vertical-cover',
          restrictPosition: true,
          mediaProps: {},
          style: {
            containerStyle: {
              height: '300px'
            }
          }
        }}
      >
        <Upload showUploadList={false}></Upload>
      </ImageCrop>
    </div>
  );
};

export default PartnersBoxModal;
