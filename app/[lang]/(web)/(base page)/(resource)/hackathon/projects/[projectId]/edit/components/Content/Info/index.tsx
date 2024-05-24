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
  LOCATIONS,
  TRACKS
} from '@/app/[lang]/(web)/(other)/form/hackathon/[hackathonId]/submission/[projectId]/components/constants';
import Title from '@/components/Common/Title';

interface InfoProps {
  form: UseFormReturn<FormSchema, any, undefined>;
  setLogo: (file: UploadFile) => void;
  hackathon: HackathonType;
}

const Info: FC<InfoProps> = ({ form, setLogo, hackathon }) => {
  return (
    <div className="flex flex-col gap-8">
      <Title>
        <span className="text-h3">Info</span>
      </Title>
      <div className="flex justify-between gap-4">
        <LogoUpload form={form} onFileChange={setLogo} />
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
      <CustomSelectField
        form={form}
        label="Where are you located?"
        name="location"
        placeholder="Please select"
        items={LOCATIONS}
      />
      <ProjectPrizeTrackRadio tracks={hackathon.rewards.map((item) => item.name)} form={form} />
      <ProjectTrackRadio tracks={TRACKS} form={form} />

      {/* <div className="flex w-full justify-between gap-4">
            <div className="flex-1">
              <CustomSelectField
                form={form}
                label="Which Prize Track Do You Belong To"
                name="track"
                placeholder="Please select"
                items={TRACKS}
              />
            </div>
            <div className="flex-1">
              <CustomSelectField
                form={form}
                label="Which Hackathon Track Do You Belong To"
                name="prizeTrack"
                placeholder="Please select"
                items={tracks.map((track) => {
                  return {
                    label: track,
                    value: track
                  };
                })}
              />
            </div>
          </div> */}

      <IntroName form={form} />
      <DetailIntroName form={form} />
    </div>
  );
};

export default Info;
