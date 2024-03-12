import React, { useEffect, useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';
import HandleDot from './HandleDot';
import { UnitMenuType } from '../../constant/type';

interface UnitProp {
  unit: UnitMenuType;
  handleToggle: VoidFunction;
  handleEdit: (val: string) => void;
  handleDelete: VoidFunction;
}

const Unit: React.FC<UnitProp> = ({
  unit: info,
  handleToggle,
  handleEdit,
  handleDelete
}) => {
  const [unit, setUnit] = useState<UnitMenuType | null>(null);
  const handleInput = () => {
    const newUnit = {
      ...unit,
      isInput: true
    } as UnitMenuType;
    setUnit(newUnit);
  };
  useEffect(() => {
    setUnit(info);
  }, [info]);
  return (
    <div className="group relative w-[calc(100%+40px)]">
      <div
        className="flex w-[calc(100%-40px)] cursor-pointer  justify-between gap-[15px]"
        onClick={() => {
          if (unit?.isInput) return;
          handleToggle();
        }}
      >
        <div className="flex-1 flex-shrink-0">
          {unit?.isInput ? (
            <input
              className="body-m w-full border-b border-neutral-medium-gray bg-transparent text-neutral-black outline-none"
              value={unit?.title}
              placeholder="Add a unit"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                setUnit({
                  ...unit,
                  title: value
                });
              }}
              onKeyUp={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                if (e.code === 'Enter') {
                  handleEdit(value);
                }
              }}
              onBlur={(e) => {
                const target = e.target as HTMLInputElement;
                const value = target.value;
                handleEdit(value);
              }}
            />
          ) : (
            <div className="body-m max-w-full break-all">{unit?.title}</div>
          )}
        </div>
        <div
          className={`h-[26px] transition-all ${unit?.isToggle ? 'rotate-180' : 'rotate-0'}`}
        >
          <LuChevronDown size={24} />
        </div>
      </div>
      {!unit?.isInput && (
        <HandleDot handleEdit={handleInput} handleDelete={handleDelete} />
      )}
    </div>
  );
};

export default Unit;
