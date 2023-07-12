import { FC, ReactNode, useEffect, useState } from 'react';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { checked: propsChecked = false } = props;

  const [checked, setChecked] = useState(propsChecked);

  useEffect(() => {
    setChecked(propsChecked);
  }, [propsChecked]);

  return (
    <div
      onClick={() => {
        setChecked(!checked);
      }}
      className="cursor-pointer"
    >
      <input type="checkbox" className="hidden" checked={checked} />
      <span className="w-[1.5rem] h-[1.5rem] border border-solid rounded-full border-[#EDEDED] block">
        {checked ? (
          <span className="rounded-full w-full h-full bg-[#9EFA13] block scale-50"></span>
        ) : null}
      </span>
    </div>
  );
};

export default Checkbox;
