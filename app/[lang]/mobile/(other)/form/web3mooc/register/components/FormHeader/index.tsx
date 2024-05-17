import Steps, { StepItem } from '@/components/Common/Steps';
import { FC } from 'react';

interface FormHeaderProps {
  steps: StepItem[];
  current: number;
  title: string;
  description: string;
}

const FormHeader: FC<FormHeaderProps> = ({ steps, current, title, description }) => {
  return (
    <div className="">
      <h4 className="text-h3-mob text-neutral-off-black">{title}</h4>
      <p className="body-xs mb-4 text-neutral-rich-gray">{description}</p>
      <Steps items={steps} current={current} itemClassName="w-[68px] min-w-[68px] caption-10pt" />
    </div>
  );
};

export default FormHeader;
