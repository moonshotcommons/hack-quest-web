import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormSchema } from '../constants';
import Title from '@/components/Common/Title';
import FormRadio from '@/components/Common/FormRadio';
import FormRadioItem from '@/components/Common/FormRadio/FormRadioItem';

interface ProjectProps {}

const Project: FC<{ form: UseFormReturn<FormSchema, any, undefined>; isClose: boolean }> = ({ form, isClose }) => {
  return (
    <div className="flex flex-col gap-8">
      <Title>
        <span className="text-h3">Project</span>
      </Title>
      <FormRadio name="efrog" label="Did you incorporate efrog NFT into your project?" form={form}>
        <FormRadioItem label="Yes" value={true} />
        <FormRadioItem label="No" value={false} />
      </FormRadio>
      <FormRadio name="croak" label="Did you use $CROAK memecoin for utility in your project?" form={form}>
        <FormRadioItem label="Yes" value={true} />
        <FormRadioItem label="No" value={false} />
      </FormRadio>
      <FormRadio name="submitType" label="What are you submitting?" form={form}>
        <FormRadioItem label="A tutorial guide" value={`A tutorial guide`} />
        <FormRadioItem label="A dapp or frame" value={`A dapp or frame`} />
        <FormRadioItem label="Other" value={`Other`} />
      </FormRadio>
    </div>
  );
};

export default Project;
