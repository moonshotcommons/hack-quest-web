'use client';
import Button from '@/components/Common/Button';
import { FC, memo, useState } from 'react';
import { FormComponentProps } from '..';
import { cn } from '@/helper/utils';
import { HackathonSubmitStateType } from '../../../type';
import { Upload, message, type UploadProps } from 'antd';
import LoadingIcon from '@/components/Common/LoadingIcon';
import Image from 'next/image';
type GetProp<T, Key> = Key extends keyof T ? Exclude<T[Key], undefined> : never;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const InfoForm: FC<
  Omit<FormComponentProps, 'type' | 'formState' | 'setCurrentStep' | 'tracks'> & {
    pickVideo: HackathonSubmitStateType['pickVideo'];
  }
> = ({ onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    // <button style={{ border: 0, background: 'none' }} type="button">
    //   {loading ? (
    //     <LoadingIcon />
    //   ) : (

    //   )}
    // </button>
    <div className="flex h-[410px] w-full items-center justify-center rounded-[32px] bg-neutral-off-white">
      <div className="flex h-[calc(100%-54px)] w-[calc(100%-54px)] items-center justify-center rounded-[24px] border border-dashed border-neutral-medium-gray">
        {loading && <LoadingIcon />}
        {!loading && (
          <span className="flex h-fit w-fit items-center transition group-hover:scale-[1.02]">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.66797 16.0013C2.66797 8.63751 8.63751 2.66797 16.0013 2.66797C19.5375 2.66797 22.9289 4.07273 25.4294 6.57321C27.9299 9.0737 29.3346 12.4651 29.3346 16.0013C29.3346 23.3651 23.3651 29.3346 16.0013 29.3346C8.63751 29.3346 2.66797 23.3651 2.66797 16.0013ZM17.3343 17.3343H22.6676C23.404 17.3343 24.001 16.7374 24.001 16.001C24.001 15.2646 23.404 14.6676 22.6676 14.6676H17.3343V9.33431C17.3343 8.59793 16.7374 8.00098 16.001 8.00098C15.2646 8.00098 14.6676 8.59793 14.6676 9.33431V14.6676H9.33431C8.59793 14.6676 8.00098 15.2646 8.00098 16.001C8.00098 16.7374 8.59793 17.3343 9.33431 17.3343H14.6676V22.6676C14.6676 23.404 15.2646 24.001 16.001 24.001C16.7374 24.001 17.3343 23.404 17.3343 22.6676V17.3343Z"
                fill="#8C8C8C"
              />
            </svg>
            <span className="body-l ml-[5px] text-neutral-medium-gray">Upload an video</span>
          </span>
        )}
      </div>
    </div>
  );

  function onSubmit() {
    // setContractInfo();
    onNext({});
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="body-m text-left text-neutral-rich-gray">
        Please Upload Your Video Demo Of Your Product (Optional)
      </p>
      <Upload
        name="avatar"
        listType="picture-card"
        className="group my-[1px] mt-1 !flex h-[410px] w-full items-center justify-center [&>div>span]:!relative [&>div>span]:!flex [&>div>span]:!h-full [&>div>span]:!w-full [&>div]:!h-full [&>div]:!w-full  [&>div]:!rounded-[32px] [&>div]:!border-none [&>div]:!bg-neutral-off-white"
        showUploadList={false}
        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        previewFile={(file) => {
          console.log('Your upload file:', file);
          // Your process logic. Here we just mock to the same file
          return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
            method: 'POST',
            body: file
          })
            .then((res) => res.json())
            .then(({ thumbnail }) => thumbnail);
        }}
      >
        {imageUrl ? <Image src={imageUrl} alt="avatar" fill className="object-contain" /> : uploadButton}
      </Upload>

      <div className="flex justify-end gap-4">
        <Button ghost className="button-text-m w-[165px] px-0 py-4 uppercase" onClick={onBack}>
          Back
        </Button>

        <Button
          type="primary"
          htmlType="submit"
          className={cn('button-text-m w-[165px] px-0 py-4 uppercase', false ? 'bg-neutral-light-gray' : '')}
          onClick={onSubmit}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default memo(InfoForm);
