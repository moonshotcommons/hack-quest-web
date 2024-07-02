import { FC } from 'react';
import FormContent from './components/FormContent';
import webApi from '@/service';

interface HackathonSubmitPageProps {
  params: { hackathonId: string; projectId: string };
}

const HackathonSubmitPage: FC<HackathonSubmitPageProps> = async ({ params: { hackathonId, projectId } }) => {
  const hackathonInfo = await webApi.resourceStationApi.getSimpleHackathonInfo(hackathonId);

  const tracks = await webApi.resourceStationApi.getHackathonPrizeTracks(hackathonId);

  return (
    <div className="mx-auto my-4 flex w-full max-w-[806px] flex-col justify-center rounded-[16px] bg-neutral-white p-10">
      <FormContent simpleHackathonInfo={hackathonInfo} projectId={projectId} tracks={tracks} />
    </div>
  );
};

export default HackathonSubmitPage;
