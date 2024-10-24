import { FC, useState } from 'react';
import { Upload, message, type UploadProps } from 'antd';
import LoadingIcon from '@/components/Common/LoadingIcon';
import { UseFormReturn } from 'react-hook-form';
import Image from 'next/image';
import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { v4 } from 'uuid';
import { z } from 'zod';
import { RcFile } from 'antd/es/upload';
import webApi from '@/service';
import { FormInput } from '@/components/Common/FormComponent';
import { FaFilePdf } from 'react-icons/fa6';
import { IMAGE_SUFFIX } from '@/constants';

type GetProp<T, Key> = Key extends keyof T ? Exclude<T[Key], undefined> : never;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

interface ResumeUploadProps {
  form: UseFormReturn<any, any, undefined>;
  config: PresetComponentConfig;
}

const renderContent = (link: string, width = 118, height = 152) => {
  const ext = (link || '').split('.').pop()?.toLowerCase() || '';
  if (ext === 'pdf') {
    return <FaFilePdf size={40} />;
  }
  if (IMAGE_SUFFIX.includes(ext)) {
    return <Image src={link} alt="resume" width={width} height={width} className="object-contain" />;
  }
  return <span className="text-neutral-medium-gray">{`Display not supported`}</span>;
};

const ResumeUpload: FC<ResumeUploadProps> = ({ form, config }) => {
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        form.trigger('resume');
      });
    }
  };

  const beforeUpload = (file: FileType) => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isLt2M;
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="flex flex-col items-center">
          <span>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.18165 5.94846C3.16789 6.12475 3.22474 6.29928 3.33967 6.43365C3.4546 6.56804 3.6182 6.65126 3.79449 6.66501C3.97077 6.67877 4.1453 6.62192 4.27967 6.50699L7.83301 3.45365V11.3337C7.83301 11.7018 8.13148 12.0003 8.49967 12.0003C8.86786 12.0003 9.16634 11.7018 9.16634 11.3337V3.45365L12.7463 6.50699C13.0262 6.74631 13.447 6.71348 13.6863 6.43365C13.9257 6.15383 13.8928 5.73298 13.613 5.49365L8.94634 1.49365C8.91311 1.46977 8.87734 1.44965 8.83967 1.43365L8.75967 1.38032C8.60128 1.31724 8.42474 1.31724 8.26634 1.38032L8.18634 1.43365C8.14868 1.44965 8.1129 1.46977 8.07967 1.49365L3.41301 5.49365C3.27862 5.60858 3.1954 5.77218 3.18165 5.94846ZM13.833 12.0007C13.833 11.6325 14.1315 11.334 14.4997 11.334C14.8679 11.334 15.1663 11.6325 15.1663 12.0007V13.334C15.1059 14.1202 14.4269 14.7132 13.6397 14.6673H3.35967C2.57244 14.7132 1.89345 14.1202 1.83301 13.334V12.0007C1.83301 11.6325 2.13148 11.334 2.49967 11.334C2.86786 11.334 3.16634 11.6325 3.16634 12.0007V13.2873C3.22561 13.3195 3.29226 13.3356 3.35967 13.334H13.6397C13.7071 13.3356 13.7737 13.3195 13.833 13.2873V12.0007Z"
                fill="#8C8C8C"
              />
            </svg>
          </span>
          <span className="body-xs text-neutral-medium-gray">Upload a file</span>
        </div>
      )}
    </button>
  );

  const requiredTag = config.optional ? ' (Optional)' : '*';

  const ext = (form.getValues('resume') || '').split('.').pop();

  return (
    <div className="text-left">
      <span className="body-m leading-[160%]">{'Resume' + requiredTag} </span>
      <div className="mt-2 w-fit rounded-[1rem] bg-neutral-off-white p-2">
        <Upload
          name="avatar"
          listType="picture-card"
          className="group my-[1px] mt-1 [&>div]:flex [&>div]:!h-[152px] [&>div]:!w-[118px] [&>div]:items-center [&>div]:justify-center [&>div]:!rounded-[12px] [&>div]:border [&>div]:border-dashed [&>div]:!border-neutral-medium-gray [&>div]:!bg-neutral-off-white [&>div]:hover:!border-yellow-primary"
          showUploadList={false}
          customRequest={async (option) => {
            setLoading(true);
            const { onProgress, onSuccess, onError } = option;
            const file = option.file as RcFile;
            const formData = new FormData();
            formData.append('file', file);
            formData.append('filepath', 'hackathons/members/resume');
            formData.append('isPublic', 'true');
            try {
              const res = await webApi.commonApi.uploadImage(formData);
              form.setValue('resume', res.filepath);
              form.trigger('resume');
              onSuccess?.({}, new XMLHttpRequest());
            } catch (err: any) {
              onError?.(err);
            }
            setLoading(false);
          }}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {form.getValues('resume') ? renderContent(form.getValues('resume'), 118, 152) : uploadButton}
        </Upload>
      </div>
      <FormInput name="resume" label="" placeholder="" form={form} className="hidden" />
    </div>
  );
};
ResumeUpload.displayName = 'ResumeUpload';

export const ResumeUploadConfig: PresetComponentConfig<ResumeUploadProps> = {
  id: v4(),
  type: ResumeUpload.displayName,
  component: ResumeUpload,
  optional: false,
  property: {},
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Resume</span>
        <div className="relative h-16 w-12 overflow-hidden rounded-[4px] border border-neutral-light-gray shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]">
          {info.resume ? renderContent(info.resume, 48, 64) : ''}
        </div>
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().url();
    return {
      resume: config.optional ? validator.optional() : validator
    };
  }
};

export default ResumeUploadConfig;
