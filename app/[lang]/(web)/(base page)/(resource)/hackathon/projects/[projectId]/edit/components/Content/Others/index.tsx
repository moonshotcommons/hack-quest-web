'use client';

import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { FC, memo } from 'react';
import CustomFormField from '@/components/Web/Business/CustomFormField';
import IsPublicRadio from './IsPublicRadio';
import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import { FormSchema, formSchema } from '../constants';
import Title from '@/components/Common/Title';

const OthersForm: FC<{ form: UseFormReturn<FormSchema, any, undefined> }> = ({ form }) => {
  const { run: submitRequest, loading } = useRequest(
    async (values: z.infer<typeof formSchema>) => {
      const formData = new FormData();
      const { githubLink, isPublic } = values;
      formData.append('isOpenSource', isPublic ? 'true' : 'false');
      formData.append('githubLink', githubLink || '');

      // const res = await webApi.resourceStationApi.submitProject(formData, projectId);
      // await refreshProjectInfo();
      // return {
      //   res,
      //   status: newStatus,
      //   newOtherInfo: {
      //     isPublic,
      //     githubLink: githubLink || ''
      //   }
      // };
    },
    {
      manual: true,
      onSuccess({}) {},
      onError(err) {
        errorMessage(err);
      }
    }
  );

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // setContractInfo();
  //   if (
  //     form.getValues('isPublic') === true &&
  //     !/^https?:\/\/(www\.)?github\.com\/[^/]+\/.*$/.test((form.getValues('githubLink') || '').trim())
  //   ) {
  //     form.setError('githubLink', {
  //       message: 'Invalid GitHub URL'
  //     });
  //     return;
  //   }
  //   submitRequest(values);
  // }

  // useEffect(() => {
  //   const { githubLink, isPublic } = others!;
  //   githubLink && form.setValue('githubLink', githubLink);
  //   typeof isPublic === 'boolean' && form.setValue('isPublic', !!isPublic);
  //   if (githubLink && typeof isPublic === 'boolean') form.trigger();
  // }, [others]);

  return (
    <div className="flex flex-col gap-8">
      <Title>
        <span className="text-h3">Others</span>
      </Title>
      <CustomFormField
        name="githubLink"
        form={form}
        label="Please Provide The Github Of Your Project"
        placeholder="Paste Github link here"
      />
      <IsPublicRadio form={form} />
    </div>
  );
};

export default memo(OthersForm);
