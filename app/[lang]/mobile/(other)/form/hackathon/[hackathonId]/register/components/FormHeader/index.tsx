import { StepItem } from '@/components/Common/Steps';
import { Step, StepLabel, Stepper } from '@/components/ui/stepper';
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
      {/* <Steps items={steps} current={current} itemClassName="min-w-[57px] caption-10pt w-fit" connectNodeClassName="" /> */}
      <Stepper activeStep={current}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default FormHeader;
