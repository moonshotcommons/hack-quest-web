import Steps, { StepItem } from '@/components/Common/Steps';
import { FC } from 'react';

interface FormHeaderProps {
  steps: StepItem[];
  current: number;
}

const FormHeader: FC<FormHeaderProps> = ({ steps, current }) => {
  return (
    <div className="">
      <h4 className="text-h4 text-neutral-off-black">Linea Mini-hack -May</h4>
      <p className="body-xs mb-4 text-neutral-rich-gray">Hackathon Registration</p>
      <Steps items={steps} current={current} />
    </div>
  );
};

export default FormHeader;
