import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useState, FocusEvent, useMemo, useRef } from 'react';
import { HackathonInfoParterKeys, HackathonType, MentorType } from '@/service/webApi/resourceStation/type';
import { IoIosAddCircle, IoIosCloseCircle } from 'react-icons/io';
import { v4 } from 'uuid';
import { errorMessage } from '@/helper/ui';

import BaseImage from '@/components/Common/BaseImage';
import { cloneDeep } from 'lodash-es';
import { HackathonEditContext } from '../../../../constants/type';
import EditTitle from '../EditTitle';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import Image from 'next/image';
import Loading from '@/public/images/other/loading.png';
import RemoveSectionModal, { RemoveSectionModalRef } from '../../RemoveSectionModal';
import CommonButton from '../CommonButton';

interface PartnersBoxModalProp {
  hackathon: HackathonType;
}

const PartnersBoxModal: React.FC<PartnersBoxModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const removeSectionRef = useRef<RemoveSectionModalRef>(null);
  const { modalType, setModalType, updateHackathon, loading } = useContext(HackathonEditContext);
  const info = useMemo(() => {
    return hackathon.info?.[modalType as HackathonInfoParterKeys] || {};
  }, [hackathon]);
  const [partners, setPartners] = useState<MentorType[]>(info.list || []);
  const handleAdd = () => {
    const p = {
      name: '',
      picture: '',
      title: '',
      id: v4()
    };
    setPartners([...partners, p]);
  };

  const handleChangeName = (e: FocusEvent<HTMLInputElement>, index: number) => {
    // if(timer.current) clearTimeout(timer.current);
    // timer.current = setTimeout(()=> {

    // },300)
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

  const cantSubmit = useMemo(() => {
    return partners.some((v) => !v.name || !v.picture) || !partners.length;
  }, [partners]);

  const { run: uoload, loading: upLoading } = useRequest(
    async (file, i) => {
      const fData = new FormData();
      fData.append('file', file);
      fData.append('filepath', `hackathons/${hackathon.id}`);
      fData.append('isPublic', `${true}`);
      const res = await webApi.commonApi.uploadImage(fData);
      return {
        res,
        file,
        i
      };
    },
    {
      manual: true,
      onSuccess({ res, file, i }) {
        const newPartners = cloneDeep(partners);
        newPartners[i].picture = res.filepath;
        setPartners(newPartners);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );

  const handleSave = () => {
    if (cantSubmit) return;
    updateHackathon({
      data: {
        [modalType]: {
          title: info.title || t(`hackathonDetail.${modalType}`),
          list: partners
        }
      }
    });
  };

  return (
    <div className="">
      <div className="px-[40px]">
        <EditTitle hackathon={hackathon} list={partners} />
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
                <div className="flex-center relative h-[46px] w-[46px] flex-shrink-0 overflow-hidden rounded-[50%] border border-dashed border-neutral-medium-gray text-neutral-medium-gray">
                  {upLoading ? (
                    <div>
                      <Image
                        src={Loading}
                        width={30}
                        height={30}
                        alt="loading"
                        className="animate-spin opacity-100"
                      ></Image>
                    </div>
                  ) : (
                    <>
                      <IoIosAddCircle size={26} />
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        className="absolute left-0 top-0 z-[1] h-full w-full cursor-pointer opacity-0"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          uoload(file, i);
                        }}
                      />
                    </>
                  )}
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
      <CommonButton hackathon={hackathon} handleSave={handleSave} cantSubmit={cantSubmit} />
      <RemoveSectionModal ref={removeSectionRef} type={modalType} />
    </div>
  );
};

export default PartnersBoxModal;
