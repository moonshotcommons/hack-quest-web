'use client';

import * as React from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/shared/skeleton';
import { CropImageModal } from './crop-image-modal';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { message } from 'antd';
import { FileInput } from '../common/file-input';
import { useToggle } from '@/hooks/utils/use-toggle';
import { useProfile } from '../modules/profile-provider';

export function Background() {
  const { isLoading, profile, invalidate } = useProfile();
  const [open, toggle] = useToggle(false);
  const [imageUrl, setImageUrl] = React.useState('');

  const { isPending, mutate } = useMutation({
    mutationFn: (data: FormData) => webApi.userApi.uploadBackgroundImage(data),
    onSuccess: async () => {
      await invalidate();
      toggle(false);
      message.success('Upload background successfully');
    }
  });

  function onFileChange(url: string) {
    setImageUrl(url);
    setTimeout(() => {
      toggle(true);
    }, 500);
  }

  function onClose() {
    toggle(false);
    setImageUrl('');
  }

  function onConfirm(blob: Blob) {
    const formData = new FormData();
    formData.append('file', blob, 'background.png');
    mutate(formData);
  }

  return (
    <React.Fragment>
      <div className="relative h-20 w-full shrink-0 overflow-hidden sm:h-[150px] sm:rounded-t-2xl">
        <Skeleton loading={isLoading} className="rounded-t-2xl">
          <Image
            src={profile?.backgroundImage || '/images/user/default-bg.png'}
            alt="background image"
            fill
            className="object-cover sm:rounded-t-2xl"
          />
          <FileInput
            className="absolute bottom-6 right-8 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:text-neutral-black"
            onFileChange={onFileChange}
          />
        </Skeleton>
      </div>
      <CropImageModal
        imageUrl={imageUrl}
        open={open}
        cropShape="rect"
        loading={isPending}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </React.Fragment>
  );
}
