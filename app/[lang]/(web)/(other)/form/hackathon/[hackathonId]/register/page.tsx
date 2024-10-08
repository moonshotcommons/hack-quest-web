import { FC } from 'react';
import FormContent from './components/FormContent';
import webApi from '@/service';

interface HackathonSubmitPageProps {
  params: { hackathonId: string };
}

const HackathonSubmitPage: FC<HackathonSubmitPageProps> = async ({ params: { hackathonId } }) => {
  const hackathonInfo = await webApi.resourceStationApi.getSimpleHackathonInfo(hackathonId);

  return (
    <div className="mx-auto my-10 mb-20 flex w-full max-w-[806px] flex-col justify-center rounded-[16px] bg-neutral-white p-10">
      <FormContent simpleHackathonInfo={hackathonInfo} />
    </div>
  );
};

export default HackathonSubmitPage;
