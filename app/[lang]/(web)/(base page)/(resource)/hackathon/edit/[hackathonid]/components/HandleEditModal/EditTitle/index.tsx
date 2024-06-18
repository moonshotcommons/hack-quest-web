import React, { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';

interface EditTitleProp {
  title: string;
  handleEditTile: (title: string) => void;
}

const EditTitle: React.FC<EditTitleProp> = ({ title: t, handleEditTile }) => {
  const [title, setTitle] = useState(t);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    setTitle(t);
    setIsEdit(false);
  }, [t]);
  return (
    <div className={'text-h3 group relative flex  items-center gap-[16px] pl-[21px] leading-[34px] text-neutral-black'}>
      {isEdit ? (
        <input
          type="text"
          value={title}
          maxLength={30}
          className="text-h3 border-none bg-transparent outline-none"
          onChange={(e) => {
            const val = e.target.value;
            setTitle(val);
          }}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              handleEditTile(title);
            }
          }}
          onBlur={(e) => {
            handleEditTile(title);
          }}
        />
      ) : (
        <>
          <span>{title}</span>
          <CiEdit size={32} className="hidden cursor-pointer group-hover:block" onClick={() => setIsEdit(true)} />
        </>
      )}

      <span className="absolute left-0 top-0 h-full w-[5px] rounded-[100px] bg-yellow-dark"></span>
    </div>
  );
};

export default EditTitle;
