import { HackathonType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useState } from 'react';
import Title from '../../Title';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { errorMessage } from '@/helper/ui';
import message from 'antd/es/message';
import { FiTrash2 } from 'react-icons/fi';
import { IoIosAddCircle } from 'react-icons/io';
import Button from '@/components/Common/Button';
import { HackathonEditContext, HackathonEditModalType } from '../../../constants/type';
import webApi from '@/service';
import { useRequest } from 'ahooks';

interface CoverModalProp {
  hackathon: HackathonType;
}

const CoverModal: React.FC<CoverModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [image, setImage] = useState(hackathon.info?.image);
  const { setModalType } = useContext(HackathonEditContext);
  const [formData, setFormData] = useState<FormData>();
  const { run: handleSave, loading } = useRequest(
    async () => {
      // await webApi.hac
    },
    {
      manual: true,
      onSuccess() {},
      onError(err) {
        errorMessage(err);
      }
    }
  );
  return (
    <div>
      <div className="px-[40px]">
        <Title title="hackathonDetail.cover" />
      </div>
      <div className="scroll-wrap-y flex flex-1 flex-col gap-[4px] px-[40px]">
        <p className="body-m text-neutral-rich-gray">{t('hackathonDetail.hackathonImage')}*</p>
        <div className="relative w-full overflow-hidden rounded-[10px]">
          {!!image ? (
            <>
              <img src={image} alt={hackathon.name} className="w-full" />
              <FiTrash2
                size={32}
                className="absolute right-[12px] top-[12px] cursor-pointer text-neutral-white"
                onClick={() => setImage('')}
              />
            </>
          ) : (
            <>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const formData = new FormData();
                  formData.append('file', file);
                  formData.append('filepath', `hackathons/${hackathon.id}`);
                  formData.append('isPublic', `${true}`);
                  try {
                    const res = await webApi.commonApi.uploadImage(formData);
                    setImage(res.filepath);
                    message.success('Upload successfully');
                    setFormData(formData);
                  } catch (e: any) {
                    errorMessage(e);
                  }
                }}
              />
              <div className="h-[300px] flex-shrink-0 cursor-pointer rounded-[20px] bg-neutral-off-white p-[27px]">
                <div className="flex-center body-l h-full w-full items-center gap-[12px] rounded-[12px] border border-dashed border-neutral-light-gray text-neutral-medium-gray text-neutral-medium-gray">
                  <IoIosAddCircle size={32} />
                  <span>{t('hackathonDetail.uploadImage')}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center justify-end px-[40px]">
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
            disabled={!image}
            className={`h-[48px] w-[165px] uppercase ${!image && 'bg-neutral-light-gray text-neutral-medium-gray'}`}
            onClick={handleSave}
          >
            {t('save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoverModal;
