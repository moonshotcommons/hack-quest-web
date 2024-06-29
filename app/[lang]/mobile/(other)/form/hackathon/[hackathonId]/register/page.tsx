import { FC } from 'react';
import FormContent from './components/FormContent';
import webApi from '@/service';

interface HackathonSubmitPageProps {
  params: { hackathonId: string };
}

const HackathonSubmitPage: FC<HackathonSubmitPageProps> = async ({ params: { hackathonId } }) => {
  const hackathonInfo = await webApi.resourceStationApi.getSimpleHackathonInfo(hackathonId);

  return <FormContent simpleHackathonInfo={hackathonInfo} />;
};

export default HackathonSubmitPage;
