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
import { HackathonEditContext, HackathonEditModalType } from '../../../../constants/type';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import Loading from '@/components/Common/Loading';

interface CoverModalProp {
  hackathon: HackathonType;
}

const CoverModal: React.FC<CoverModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [image, setImage] = useState(hackathon.info?.image);
  const { setModalType, refreshHackathon } = useContext(HackathonEditContext);
  const [formData, setFormData] = useState<FormData>();
  const { run: uoload, loading: upLoading } = useRequest(
    async (file) => {
      const fData = new FormData();
      fData.append('file', file);
      fData.append('filepath', `hackathons/${hackathon.id}`);
      fData.append('isPublic', `${true}`);
      const res = await webApi.commonApi.uploadImage(fData);
      return {
        res,
        file
      };
    },
    {
      manual: true,
      onSuccess({ res, file }) {
        setImage(res.filepath);
        const nfData = new FormData();
        nfData.append('image', file);
        setFormData(nfData);
      },
      onError(err) {
        errorMessage(err);
      }
    }
  );
  const { run: handleSave, loading } = useRequest(
    async () => {
      await webApi.hackathonV2Api.updateHackathonImage(formData as FormData, hackathon.id);
      return;
    },
    {
      manual: true,
      onSuccess() {
        message.success('Updated successfully');
        refreshHackathon();
        setModalType(HackathonEditModalType.NULL);
      },
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
        <div className="relative w-full ">
          {!!image ? (
            <>
              <img src={image} alt={hackathon.name} className="w-full rounded-[10px]" />
              <div className="absolute right-[12px]  top-[12px] cursor-pointer rounded-[8px] bg-neutral-light-gray  p-[12px]">
                <FiTrash2 size={32} className="text-neutral-white" onClick={() => setImage('')} />
              </div>
            </>
          ) : (
            <>
              <Loading loading={upLoading}>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    uoload(file);
                  }}
                />
                <div className="h-[300px] flex-shrink-0 cursor-pointer rounded-[20px] bg-neutral-off-white p-[27px]">
                  <div className="flex-center body-l h-full w-full items-center gap-[12px] rounded-[12px] border border-dashed border-neutral-light-gray text-neutral-medium-gray text-neutral-medium-gray">
                    <IoIosAddCircle size={32} />
                    <span>{t('hackathonDetail.uploadImage')}</span>
                  </div>
                </div>
              </Loading>
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
            disabled={!formData}
            loading={loading}
            className={`h-[48px] w-[165px] uppercase ${!formData && 'bg-neutral-light-gray text-neutral-medium-gray'}`}
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
