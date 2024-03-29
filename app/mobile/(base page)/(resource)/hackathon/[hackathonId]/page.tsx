import { FC } from 'react';
import { Metadata } from 'next';
import HackathonIdPage from '../components/HackthonId';
import { getHackathonById } from '@/service/catch/resource/hackathon';

interface HackathonIdProps {
  params: {
    hackathonId: string;
  };
  searchParams: Record<string, string>;
}

export async function generateMetadata({
  params,
  searchParams
}: HackathonIdProps): Promise<Metadata> {
  let query = new URLSearchParams(searchParams).toString();
  query = query ? '?' + query : '';
  const hackathon = await getHackathonById(params.hackathonId);
  return {
    title: hackathon.name,
    description: hackathon.about,
    alternates: {
      canonical: `https://www.hackquest.io/hackathon/${params.hackathonId}${query}`
    }
  };
}

const HackathonId: FC<HackathonIdProps> = async function ({
  params
}: HackathonIdProps) {
  const hackathon = await getHackathonById(params.hackathonId);
  return (
    <>
      <HackathonIdPage hackathon={hackathon} />
    </>
  );
};

export default HackathonId;
