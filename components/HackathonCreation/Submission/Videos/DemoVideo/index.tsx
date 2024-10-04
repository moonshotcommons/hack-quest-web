import { PresetComponentConfig } from '@/components/HackathonCreation/type';
import { FC, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { z } from 'zod';
import VideoSwitch from '../VideoSwitch';
import { FormInput } from '@/components/Common/FormComponent';
import VideoReview from '../VideoReview';
import { Upload, UploadProps, message } from 'antd';
import { cn, getVideoDuration } from '@/helper/utils';
import { RcFile } from 'antd/es/upload';
import Image from 'next/image';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import Button from '@/components/Common/Button';
import { useResumableUpload } from '@/hooks/utils/useResumableUpload';

type GetProp<T, Key> = Key extends keyof T ? Exclude<T[Key], undefined> : never;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface DemoVideoProps {
  form: any;
  config: PresetComponentConfig;
}

export const DemoVideo: FC<DemoVideoProps> = ({ form, config }) => {
  const [videoType, setVideoType] = useState<'upload' | 'link'>('upload');
  const confirmRef = useRef<ConfirmModalRef>(null);
  const requiredTag = config.optional ? ' (Optional)' : '*';

  const onDelete = () => {
    confirmRef.current?.open({
      onConfirm: async () => {
        form.setValue('demoVideo', '');
        form.trigger('demoVideo');
      }
    });
  };

  const beforeUpload = async (file: FileType) => {
    const isMp4 = file.type === 'video/mp4';
    if (!isMp4) {
      message.error('You can only upload mp4 video!');
    }
    const isLt2M = file.size / 1024 / 1024 < 150;
    const maxDuration = 60 * 4;
    if (!isLt2M) {
      message.error('Patch video must smaller than 150MB!');
    }

    let isGt5M = false;

    try {
      const duration = await getVideoDuration(file);
      isGt5M = duration <= maxDuration;
      if (!isGt5M) {
        message.error('Patch video are often no longer than four minutes');
      }
    } catch (err: any) {
      message.error(err.message);
    }

    return isMp4 && isLt2M && isGt5M;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj as FileType, (url) => {
      //   setImageUrl(url);
      // });
    }
  };

  const { retry, upload, percent } = useResumableUpload({
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      message.error(error.message);
    }
  });

  const loading = retry.isPending || upload.isPending;
  const isError = (upload.isError && !retry.isPending && !retry.isSuccess) || retry.isError;

  const uploadButton = (
    <div className="relative flex h-[152px] w-full items-center justify-center overflow-hidden rounded-[16px] bg-neutral-off-white">
      <div className="flex h-[calc(100%-16px)] w-[calc(100%-16px)] items-center justify-center rounded-[12px] border border-dashed border-neutral-medium-gray">
        {loading && (
          <div className="body-l-bold flex h-full w-full items-center justify-center text-yellow-dark">
            {`${percent}%`}
            {/* <LoadingIcon /> */}
          </div>
        )}
        {!loading && isError && (
          <Button
            className="px-8 py-2"
            type="primary"
            htmlType="button"
            onClick={async (e) => {
              e.stopPropagation();
              const res = await retry.mutateAsync();
              form.setValue('demoVideo', res);
              form.trigger('demoVideo');
            }}
          >
            Retry
          </Button>
        )}
        {!loading && !isError && (
          <span className="flex h-fit w-fit items-center transition group-hover:scale-[1.02]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 12C2 6.47715 6.47715 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM13 13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13Z"
                fill="#8C8C8C"
              />
            </svg>

            <span className="body-m ml-[5px] text-neutral-medium-gray">Upload an video</span>
          </span>
        )}
      </div>
      {loading && (
        <div className="absolute bottom-0 left-0 h-3 w-full bg-neutral-300">
          <div className="absolute left-0 top-0 h-full bg-yellow-primary" style={{ width: `${percent}%` }} />
        </div>
      )}
    </div>
  );

  const demoVideo = form.getValues('demoVideo');

  return (
    <div className="flex flex-col gap-2">
      <div className="body-m flex items-center gap-3 leading-[160%]">
        <VideoSwitch videoType={videoType} setVideoType={setVideoType} />
        <span>
          Please {videoType === 'upload' ? 'Upload' : 'Link'} Your Video Demo Of Your Product {requiredTag}
        </span>
      </div>

      <FormInput
        name="demoVideo"
        label=""
        placeholder="Paste a video URL"
        className={cn(videoType === 'link' ? 'inline-block' : 'hidden')}
        form={form}
      />

      <div className={cn(videoType === 'upload' ? 'block' : 'hidden')}>
        {demoVideo && demoVideo.includes('hackquest.io') && <VideoReview url={demoVideo} onDelete={onDelete} />}
        {(!demoVideo || !demoVideo.includes('hackquest.io')) && (
          <Upload
            name="avatar"
            listType="picture-card"
            className="group my-[1px] mt-1 !flex h-[152px] w-[270px] items-center justify-center [&>div>span]:!relative [&>div>span]:!flex [&>div>span]:!h-full [&>div>span]:!w-full [&>div]:!h-full [&>div]:!w-full  [&>div]:!rounded-[32px] [&>div]:!border-none [&>div]:!bg-neutral-off-white"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            customRequest={async (option) => {
              const { onProgress, onSuccess, onError } = option;
              const file = option.file as RcFile;
              try {
                const res = await upload.mutateAsync({ file: file as File, path: `hackathons/projects/demoVideo` });
                form.setValue('demoVideo', res);
                form.trigger('demoVideo');
                onSuccess?.({}, new XMLHttpRequest());
              } catch (err: any) {
                onError?.(err);
                message.error(err.message);
              }
            }}
          >
            {uploadButton}
          </Upload>
        )}
      </div>
      <ConfirmModal confirmText="YES" ref={confirmRef}>
        <p className="text-h4 text-center text-neutral-black">Do you want to remove this video?</p>
      </ConfirmModal>
    </div>
  );
};

DemoVideo.displayName = 'DemoVideo';

export const DemoVideoConfig: PresetComponentConfig<DemoVideoProps> = {
  id: v4(),
  type: DemoVideo.displayName,
  optional: false,
  component: DemoVideo,
  property: {},
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Demo Video</span>
        {info.demoVideo && (
          <Image
            src={'/images/icons/video_icon.png'}
            alt="demo Video"
            width={48}
            height={48}
            className="rounded-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]"
          />
        )}
      </div>
    );
  },
  getValidator(config) {
    const validator = z.string().min(config.optional ? 0 : 1);

    return {
      demoVideo: config.optional ? validator.optional() : validator
    };
  }
};

export default DemoVideoConfig;
