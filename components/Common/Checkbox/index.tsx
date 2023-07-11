import { FC, ReactNode, useState } from 'react';

interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
}

const Checkbox: FC<CheckboxProps> = (props) => {
  const { checked: defaultChecked } = props;

  const [checked, setChecked] = useState(defaultChecked);

  return (
    <span>
      <input type="checkbox" className="hidden" checked={checked} />
      <span></span>
    </span>
  );
};

export default Checkbox;
