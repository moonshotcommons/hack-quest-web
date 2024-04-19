'use client';
import { FC, useState } from 'react';
import FormHeader from './components/FormHeader';
import { HACKATHON_SUBMIT_STEPS } from './components/constants';
import FormComponent from './components/FormComponent';

interface HackathonSubmitPageProps {}

const HackathonSubmitPage: FC<HackathonSubmitPageProps> = (props) => {
  const [current, setCurrent] = useState(0);

  const onNext = () => {
    setCurrent(current + 1);
  };

  const onBack = () => {
    setCurrent(current - 1);
  };

  return (
    <div className="mx-auto my-4 flex w-full max-w-[806px] flex-col justify-center rounded-[16px] bg-neutral-white p-10">
      <div className="flex w-full flex-col justify-center gap-6 text-center">
        <FormHeader steps={HACKATHON_SUBMIT_STEPS} current={current} />
        <FormComponent type={HACKATHON_SUBMIT_STEPS[current].type} onNext={onNext} onBack={onBack} />
      </div>
    </div>
  );
};

export default HackathonSubmitPage;
