'use client';

import { FC } from 'react';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import LogoUpload from './LogoUpload';
import IntroName from './IntroName';
import DetailIntroName from './DetailIntroName';
import { UploadFile } from 'antd';

import { HackathonType } from '@/service/webApi/resourceStation/type';
import CustomSelectField from '@/components/Web/Business/CustomSelectField';
import ProjectTrackRadio from './ProjectTrackRadio';
import ProjectPrizeTrackRadio from './ProjectPrizeTrackRadio';

import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '../constants';
import {
  HackathonPartner,
  LOCATIONS,
  TRACKS
} from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/submission/[projectId]/components/constants';
import Title from '@/components/Common/Title';
import Tagline from './Tagline';
import SolvedProblem from './SolvedProblem';
import Challenges from './Challenges';
import Technologies from './Technologies';

interface InfoProps {
  form: UseFormReturn<FormSchema, any, undefined>;
  setLogo: (file: UploadFile) => void;
  hackathon: HackathonType;
  isClose: boolean;
}

const Info: FC<InfoProps> = ({ form, setLogo, hackathon, isClose }) => {
  return (
    <div className="flex flex-col gap-8">
      <Title>
        <span className="text-h3">Info</span>
      </Title>
      <div className="flex justify-between gap-4">
        <LogoUpload form={form} onFileChange={setLogo} isClose={isClose} />
        <div className="flex-1">
          <CustomFormField
            name="projectName"
            form={form}
            label="Project Name"
            placeholder="Enter your project name"
            className="bg-neutral-off-white focus:bg-neutral-white"
          />
        </div>
      </div>
      {hackathon.id !== HackathonPartner.Hack4Bengal && (
        <CustomSelectField
          form={form}
          label="Where are you located?"
          name="location"
          placeholder="Please select"
          items={LOCATIONS}
        />
      )}
      <ProjectPrizeTrackRadio tracks={hackathon.rewards.map((item) => item.name)} form={form} isClose={isClose} />
      {hackathon.id !== HackathonPartner.Hack4Bengal && (
        <ProjectTrackRadio tracks={TRACKS} form={form} isClose={isClose} />
      )}
      <IntroName form={form} />
      <DetailIntroName form={form} />
      {hackathon.id === HackathonPartner.Hack4Bengal && (
        <>
          <Tagline form={form} />
          <SolvedProblem form={form} />
          <Challenges form={form} />
          <Technologies form={form} />
          <CustomFormField
            name="teamID"
            label="Team ID"
            placeholder="You unique team id provided by the Hack4Bengal team, e.g.: H4B000"
            form={form}
            className="bg-neutral-off-white focus:bg-neutral-white"
          />
          <CustomFormField
            name="roomNumber"
            label="Room Number"
            placeholder=""
            form={form}
            className="bg-neutral-off-white focus:bg-neutral-white"
          />
        </>
      )}
    </div>
  );
};

export default Info;
