import { errorMessage } from '@/helper/ui';
import React, { useContext, useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';
import { HackathonEditContext } from '../../../../constants/type';
import Loading from '@/components/Common/Loading';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

interface EditTitleProp {
  title: string;
  changeTitle: (title: string) => void;
}

const EditTitle: React.FC<EditTitleProp> = ({ title: tle, changeTitle }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [title, setTitle] = useState(tle);
  const [isEdit, setIsEdit] = useState(false);
  const { loading } = useContext(HackathonEditContext);
  const handleEditTitle = () => {
    if (!title) {
      setTitle(tle);
    }
    setIsEdit(false);
    changeTitle(title);
  };
  useEffect(() => {
    setTitle(tle);
  }, [tle]);
  return (
    <div className={'text-h3 group relative w-full  pl-[21px] leading-[34px] text-neutral-black'}>
      <Loading loading={loading}>
        {isEdit ? (
          <input
            type="text"
            value={title}
            maxLength={30}
            className="text-h3 w-[80%] border-none bg-transparent outline-none"
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
                handleEditTitle();
              }
            }}
            onBlur={(e) => {
              if (!title) {
                errorMessage('Title is a required input.');
                return;
              }
              handleEditTitle();
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
