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
      <h4 className="text-h4 text-neutral-off-black">{title}</h4>
      <p className="body-xs mb-4 text-neutral-rich-gray">{description}</p>
      <Steps
        items={steps}
        current={current}
        connectNodeClassName="w-[64.8px] max-w-[64.8px]"
        itemClassName="min-w-[66px] whitespace-nowrap"
      />
    </div>
  );
};

export default FormHeader;
