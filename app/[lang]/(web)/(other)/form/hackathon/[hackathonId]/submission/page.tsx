'use client';
import { FC, useState } from 'react';
import { HACKATHON_SUBMIT_STEPS } from './components/constants';
import FormHeader from './components/FormHeader';
import FormComponent from './components/FormComponent';
import { HackathonSubmitStateType } from './type';

interface HackathonSubmitPageProps {}

const HackathonSubmitPage: FC<HackathonSubmitPageProps> = (props) => {
  const [current, setCurrent] = useState(0);
  const [formState, setFormState] = useState<HackathonSubmitStateType>({
    info: {
      projectLogo: '',
      projectName: '',
      track: '',
      intro: '',
      detailedIntro: ''
    },
    contractInfo: {
      wechat: '',
      telegram: ''
    },
    bio: '',
    submissionType: {
      type: null,
      groupType: '',
      members: []
    }
  });

  const onNext = (state: Partial<HackathonSubmitStateType>) => {
    setFormState({ ...formState, ...state });
    setCurrent(current + 1);
  };

  const onBack = () => {
    setCurrent(current - 1);
  };

  const setCurrentStep = (step: number) => {
    setCurrent(step);
  };

  return (
    <div className="mx-auto my-4 flex w-full max-w-[806px] flex-col justify-center rounded-[16px] bg-neutral-white p-10">
      <div className="flex w-full flex-col justify-center gap-6 text-center">
        <FormHeader
          steps={HACKATHON_SUBMIT_STEPS}
          current={current}
          title="Linea Mini-hack -May"
          description="Hackathon Submission"
        />
        <FormComponent
          type={HACKATHON_SUBMIT_STEPS[current].type}
          onNext={onNext}
          onBack={onBack}
          setCurrentStep={setCurrentStep}
          formState={formState}
        />
      </div>
    </div>
  );
};

export default HackathonSubmitPage;
