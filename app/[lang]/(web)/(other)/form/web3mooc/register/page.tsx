import { FC } from 'react';
import FormContent from './components/FormContent';

interface HackathonSubmitPageProps {}

const HackathonSubmitPage: FC<HackathonSubmitPageProps> = () => {
  return (
    <div className="mx-auto my-4 flex w-full max-w-[806px] flex-col justify-center rounded-[16px] bg-neutral-white p-10">
      <FormContent />
    </div>
  );
};

export default HackathonSubmitPage;
