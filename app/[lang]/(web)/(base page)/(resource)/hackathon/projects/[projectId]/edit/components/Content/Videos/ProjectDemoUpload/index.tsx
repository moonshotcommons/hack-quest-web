'use client';
import { FC, memo, useRef, useState } from 'react';

import { Upload, message, type UploadProps } from 'antd';
import LoadingIcon from '@/components/Common/LoadingIcon';
import { RcFile } from 'antd/es/upload';

import { useRequest } from 'ahooks';
import { errorMessage } from '@/helper/ui';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import VideoReview from '../VideoReview';
import { useRouter } from 'next/navigation';
import webApi from '@/service';
type GetProp<T, Key> = Key extends keyof T ? Exclude<T[Key], undefined> : never;
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const ProjectDemoUpload: FC<{ demoVideo?: string; projectId: string; isClose: boolean }> = ({
  demoVideo,
  projectId,
  isClose
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const confirmRef = useRef<ConfirmModalRef>(null);
  const router = useRouter();

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

  const beforeUpload = async (file: FileType) => {
    debugger;
    const isMp4 = file.type === 'video/mp4';
    if (!isMp4) {
      message.error('You can only upload mp4 video!');
    }
    const isLt2M = file.size / 1024 / 1024 < 150;
    // const maxDuration = 60 * 5;
    if (!isLt2M) {
      message.error('Demo video must smaller than 150MB!');
    }

    // let isGt5M = false;

    // try {
    //   const duration = await getVideoDuration(file);
    //   isGt5M = duration <= maxDuration;
    //   if (!isGt5M) {
    //     message.error('Patch video are often no longer than five minutes');
    //   }
    // } catch (err: any) {
    //   message.error(err.message);
    // }

    return isMp4 && isLt2M;
  };

  const { runAsync: deleteRequest } = useRequest(
    async () => {
      setLoading(true);
      const formData = new FormData();
      formData.append('demo', '');
      await webApi.resourceStationApi.submitProject(formData, projectId);
      router.refresh();
    },
    {
      manual: true,
      onSuccess() {
        message.success('Deleted demo video successfully');
      },
      onError(err) {
        errorMessage(err);
      },
      onFinally() {
        setLoading(false);
      }
    }
  );

  const onDelete = () => {
    if (isClose) return;
    confirmRef.current?.open({
      onConfirm: deleteRequest
    });
  };

  const uploadButton = (
    <div className="flex h-[410px] w-full items-center justify-center rounded-[32px] bg-neutral-off-white">
      <div className="flex h-full w-full items-center justify-center rounded-[24px] border border-dashed border-neutral-medium-gray">
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

  return (
    <div className="flex flex-col gap-6">
      {demoVideo && <VideoReview url={demoVideo} onDelete={onDelete} isClose={isClose} />}
      {!demoVideo && (
        <Upload
          name="avatar"
          listType="picture-card"
          className="group my-[1px] mt-1 !flex h-[410px] w-full items-center justify-center [&>div>span]:!relative [&>div>span]:!flex [&>div>span]:!h-full [&>div>span]:!w-full [&>div]:!h-full [&>div]:!w-full  [&>div]:!rounded-[32px] [&>div]:!border-none [&>div]:!bg-neutral-off-white"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          disabled={isClose}
          customRequest={async (option) => {
            if (isClose) return;
            setLoading(true);
            const { onProgress, onSuccess, onError } = option;
            const file = option.file as RcFile;
            const formData = new FormData();
            formData.append('demo', file);
            try {
              await webApi.resourceStationApi.submitProject(formData, projectId);
              router.refresh();
              onSuccess?.({}, new XMLHttpRequest());
            } catch (err: any) {
              onError?.(err);
            }
            setLoading(false);
          }}
        >
          {uploadButton}
        </Upload>
      )}

      <ConfirmModal confirmText="YES" ref={confirmRef}>
        <p className="text-h4 text-center text-neutral-black">Do you want to remove this video?</p>
      </ConfirmModal>
    </div>
  );
};

export default memo(ProjectDemoUpload);
