import React, { useEffect, useState } from 'react';
import { CiEdit } from 'react-icons/ci';

interface WinnerNameProp {
  project: any;
  handleChangeName: (prizeName: string) => void;
  initEdit?: boolean;
  disabled?: boolean;
}

const WinnerName: React.FC<WinnerNameProp> = ({ project, handleChangeName, initEdit = false, disabled = false }) => {
  const [prizeName, setPrizeName] = useState(project.prizeName);
  const [isEdit, setIsEdit] = useState(initEdit);
  const changePrizeName = () => {
    if (!prizeName) {
      setPrizeName(project.prizeName);
    } else {
      handleChangeName(prizeName);
    }
    setIsEdit(false);
  };
  useEffect(() => {
    setPrizeName(project.prizeName);
  }, [project]);

  return (
    <div
      className={`body-s h-[32px] w-[240px] flex-shrink-0 rounded-[4px] border-[2px] text-neutral-off-black ${disabled ? 'bg-yellow-extra-light' : 'border-neutral-light-gray'}`}
    >
      {(!isEdit || disabled) && (
        <div
          className={` relative flex h-full w-full cursor-pointer items-center justify-center px-[26px]  ${!disabled && 'group hover:bg-neutral-off-white'}`}
          onClick={() => {
            if (disabled) return;
            setIsEdit(!isEdit);
          }}
        >
          {prizeName}
          <CiEdit size={18} className="absolute right-[8px]  hidden group-hover:block" />
        </div>
      )}
      {isEdit && !disabled && (
        <input
          type="text"
          className="flex h-full w-full border-none text-center outline-status-success"
          placeholder="e.g. First Prize, Best Teamwork..."
          value={prizeName}
          onChange={(e) => {
            const value = e.target.value;
            setPrizeName(value);
          }}
          onBlur={changePrizeName}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              changePrizeName();
            }
          }}
        />
      )}
    </div>
  );
};

export default WinnerName;
