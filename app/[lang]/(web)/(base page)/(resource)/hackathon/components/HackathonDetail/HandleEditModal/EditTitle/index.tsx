import { errorMessage } from '@/helper/ui';
import { HackathonInfoSPKeys, HackathonType, MentorType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { HackathonEditContext } from '../../../../constants/type';
import Loading from '@/components/Common/Loading';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface EditTitleProp {
  hackathon: HackathonType;
  list: MentorType[];
}

const EditTitle: React.FC<EditTitleProp> = ({ hackathon, list }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [title, setTitle] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const { modalType, updateHackathon, loading } = useContext(HackathonEditContext);
  const handleEditTile = () => {
    if (!title) {
      setTitle(t(`hackathonDetail.${modalType}`));
      setIsEdit(false);
      return;
    }
    updateHackathon({
      data: {
        [modalType]: {
          title,
          list
        }
      },
      closeModal: false
    });
  };
  useEffect(() => {
    setTitle(hackathon.info?.[modalType as HackathonInfoSPKeys]?.title || t(`hackathonDetail.${modalType}`));
    setIsEdit(false);
  }, [hackathon]);
  return (
    <div className={'text-h3 group relative  pl-[21px] leading-[34px] text-neutral-black'}>
      <Loading loading={loading}>
        {isEdit ? (
          <input
            type="text"
            value={title}
            maxLength={30}
            className="text-h3 w-[80vh] border-none bg-transparent outline-none"
            onChange={(e) => {
              const val = e.target.value;
              setTitle(val);
            }}
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                if (!title) {
                  errorMessage('Title is a required input.');
                  return;
                }
                handleEditTile();
              }
            }}
            onBlur={(e) => {
              if (!title) {
                errorMessage('Title is a required input.');
                return;
              }
              handleEditTile();
            }}
          />
        ) : (
          <div className="flex  items-center gap-[16px]">
            <span>{title}</span>
            <CiEdit size={32} className="hidden cursor-pointer group-hover:block" onClick={() => setIsEdit(true)} />
          </div>
        )}
      </Loading>

      <span className="absolute left-0 top-0 h-full w-[5px] rounded-[100px] bg-yellow-dark"></span>
    </div>
  );
};

export default EditTitle;
