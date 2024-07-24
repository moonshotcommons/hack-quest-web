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
import webApi from '@/service';
import LoadingIcon from '@/components/Common/LoadingIcon';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import Image from 'next/image';

type GetProp<T, Key> = Key extends keyof T ? Exclude<T[Key], undefined> : never;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface PitchVideoProps {
  form: any;
  config: PresetComponentConfig;
}

export const PitchVideo: FC<PitchVideoProps> = ({ form, config }) => {
  const [videoType, setVideoType] = useState<'upload' | 'link'>('upload');
  const [loading, setLoading] = useState(false);
  const confirmRef = useRef<ConfirmModalRef>(null);
  const requiredTag = config.optional ? ' (Optional)' : '*';
  const onDelete = () => {
    confirmRef.current?.open({
      onConfirm: async () => {
        form.setValue('pitchVideo', '');
        form.trigger('pitchVideo');
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
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setLoading(false);
      // getBase64(info.file.originFileObj as FileType, (url) => {

      //   setImageUrl(url);
      // });
    }
  };

  const uploadButton = (
    <div className="flex h-[152px] w-full items-center justify-center rounded-[16px] bg-neutral-off-white">
      <div className="flex h-[calc(100%-16px)] w-[calc(100%-16px)] items-center justify-center rounded-[12px] border border-dashed border-neutral-medium-gray">
        {loading && <LoadingIcon />}
        {!loading && (
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
    </div>
  );

  const pitchVideo = form.getValues('pitchVideo');

  return (
    <div className="flex flex-col gap-2">
      <div className="body-m flex items-center gap-3 leading-[160%]">
        <VideoSwitch videoType={videoType} setVideoType={setVideoType} />
        <span>
          Please {videoType === 'upload' ? 'Upload' : 'Link'} Your Pitch Video, Max 4 mins {requiredTag}
        </span>
      </div>

      <FormInput
        name="pitchVideo"
        label=""
        placeholder="Paste a video URL"
        form={form}
        className={cn(videoType === 'link' ? 'inline-block' : 'hidden')}
      />
      <div className={cn(videoType === 'upload' ? 'block' : 'hidden')}>
        {pitchVideo && pitchVideo.includes('hackquest.io') && (
          <VideoReview url={form.getValues('pitchVideo')} onDelete={onDelete} />
        )}
        {(!pitchVideo || !pitchVideo.includes('hackquest.io')) && (
          <Upload
            name="avatar"
            listType="picture-card"
            className="group my-[1px] mt-1 !flex h-[152px] w-[270px] items-center justify-center [&>div>span]:!relative [&>div>span]:!flex [&>div>span]:!h-full [&>div>span]:!w-full [&>div]:!h-full [&>div]:!w-full  [&>div]:!rounded-[32px] [&>div]:!border-none [&>div]:!bg-neutral-off-white"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            customRequest={async (option) => {
              setLoading(true);
              const { onProgress, onSuccess, onError } = option;
              const file = option.file as RcFile;
              const formData = new FormData();
              formData.append('file', file);
              formData.append('filepath', `hackathons/projects/pitchVideo`);
              formData.append('isPublic', 'true');
              try {
                const res = await webApi.commonApi.uploadImage(formData);
                form.setValue('pitchVideo', res.filepath);
                form.trigger('pitchVideo');
                onSuccess?.({}, new XMLHttpRequest());
              } catch (err: any) {
                onError?.(err);
                message.error(err.message);
              }
              setLoading(false);
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

PitchVideo.displayName = 'PitchVideo';

export const PitchVideoConfig: PresetComponentConfig<PitchVideoProps> = {
  id: v4(),
  type: PitchVideo.displayName,
  optional: false,
  component: PitchVideo,
  property: {},
  displayRender(info) {
    return (
      <div className="flex flex-1 items-center justify-between">
        <span className="body-m flex items-center  text-neutral-off-black">Pitch Video</span>
        {info.pitchVideo && (
          <Image
            src={'/images/icons/video_icon.png'}
            alt="pitch Video"
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
      pitchVideo: config.optional ? validator.optional() : validator
    };
  }
};

export default PitchVideoConfig;
