'use client';

import * as React from 'react';
import Image from 'next/image';
import { message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { LoaderIcon } from 'lucide-react';
import { TrashIcon } from '@/components/ui/icons/trash';
import { PlusIcon } from '@/components/ui/icons/plus';
import { useToggle } from '@/hooks/utils/use-toggle';
import { ActionButtons } from './action-buttons';
import { ConfirmModal } from '../confirm-modal';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

function getBase64(img: FileType, callback: (url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

function beforeUpload(file: FileType) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export function Cover() {
  const [open, toggleOpen] = useToggle(false);
  const [loading, toggle] = useToggle(false);
  const [imageUrl, setImageUrl] = React.useState<string>(
    'https://images.unsplash.com/photo-1718159445800-ebfe98552d96?q=80&w=3542&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  );

  const onChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      toggle(true);
      return;
    }

    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        toggle(false);
        setImageUrl(url);
      });
    }
  };

  function removeImage() {
    setImageUrl('');
  }

  const imagePreview = (
    <div className="relative mt-1 h-[409px] w-full overflow-hidden rounded-[10px]">
      <Image src={imageUrl} fill alt="background image" className="object-cover" />
      <button className="absolute right-3 top-3 text-neutral-white outline-none" onClick={toggleOpen}>
        <TrashIcon />
      </button>
    </div>
  );

  const uploadButton = (
    <div className="mt-1 h-[409px] w-full rounded-[20px] bg-neutral-off-white p-[27px]">
      <Upload
        name="cover"
        onChange={onChange}
        beforeUpload={beforeUpload}
        showUploadList={false}
        className="[&>.ant-upload]:!h-full [&>.ant-upload]:!w-full"
        customRequest={async (option) => {
          const { onSuccess, onError } = option;
          // TODO: upload image
        }}
      >
        <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-neutral-medium-gray">
          <button className="outline-none" type="button">
            {loading ? (
              <LoaderIcon className="animate-spin text-neutral-medium-gray" />
            ) : (
              <span className="flex items-center gap-2 text-lg text-neutral-medium-gray">
                <PlusIcon />
                Upload an image
              </span>
            )}
          </button>
        </div>
      </Upload>
    </div>
  );

  return (
    <div className="flex flex-col">
      <h3 className="body-m text-neutral-rich-gray">Hackathon Cover Image*</h3>
      {imageUrl ? imagePreview : uploadButton}
      <ActionButtons className="mt-10" isValid={true} onBack={() => {}} />
      <ConfirmModal open={open} onConfirm={removeImage} onClose={() => toggleOpen(false)} />
    </div>
  );
}
