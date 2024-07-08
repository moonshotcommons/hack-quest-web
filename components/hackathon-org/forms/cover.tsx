'use client';

import * as React from 'react';
import Image from 'next/image';
import { message, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { LoaderIcon } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { TrashIcon } from '@/components/ui/icons/trash';
import { PlusIcon } from '@/components/ui/icons/plus';
import { useToggle } from '@/hooks/utils/use-toggle';
import webApi from '@/service';
import { ActionButtons } from './action-buttons';
import { ConfirmModal } from '../modals/confirm-modal';
import { useHackathonOrgState } from '../constants/state';
import { Steps } from '../constants/steps';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type UploadRequestOption = Parameters<GetProp<UploadProps, 'customRequest'>>[0];

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

export function CoverForm({
  isEditMode = false,
  initialValues,
  onCancel,
  onSave
}: {
  isEditMode?: boolean;
  initialValues?: any;
  onCancel?: () => void;
  onSave?: () => void;
}) {
  const [open, toggleOpen] = useToggle(false);
  const [uploadLoading, toggleUploadLoading] = useToggle(false);
  const [removeLoading, toggleRemoveLoading] = useToggle(false);
  const [imageUrl, setImageUrl] = React.useState<string>('');

  const { updateStatus, onStepChange } = useHackathonOrgState();

  const queryClient = useQueryClient();

  async function uploadImage(options: UploadRequestOption) {
    const { file, onSuccess, onError } = options;
    toggleUploadLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      await webApi.hackathonV2Api.updateHackathonImage(formData, initialValues?.id);
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      message.success('Upload Successfully');
      onSuccess?.({});
    } catch (error: any) {
      console.log(error);
      onError?.(error);
    } finally {
      toggleUploadLoading(false);
    }
  }

  async function removeImage() {
    toggleRemoveLoading(true);
    const formData = new FormData();
    formData.append('image', '');
    try {
      await webApi.hackathonV2Api.updateHackathonImage(formData, initialValues?.id);
      queryClient.invalidateQueries({ queryKey: ['hackathon'] });
      setImageUrl('');
      message.success('Remove Successfully');
    } catch (error) {
      console.log(error);
    } finally {
      toggleRemoveLoading(false);
    }
  }

  function onSaveOrNext() {
    if (!imageUrl) {
      message.warning('Please upload cover image');
      return;
    }
    isEditMode ? onSave?.() : onStepChange(Steps.TIMELINE);
  }

  function onCancelOrBack() {
    isEditMode ? onCancel?.() : onStepChange(Steps.LINKS);
  }

  React.useEffect(() => {
    if (initialValues?.info?.image) {
      setImageUrl(initialValues?.info?.image || '');
    }
  }, [initialValues?.info?.image]);

  // React.useEffect(() => {
  //   if (!isEditMode) {
  //     if (imageUrl) {
  //       updateStatus(Steps.COVER, true);
  //     } else {
  //       updateStatus(Steps.COVER, false);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [imageUrl, isEditMode]);

  const imagePreview = (
    <div className="relative mb-10 mt-1 h-[409px] w-full overflow-hidden rounded-[10px]">
      <Image src={imageUrl} fill alt="background image" className="object-cover" />
      <button className="absolute right-3 top-3 text-neutral-white outline-none" onClick={toggleOpen}>
        <TrashIcon />
      </button>
    </div>
  );

  const uploadButton = (
    <div className="mb-10 mt-1 h-[409px] w-full rounded-[20px] bg-neutral-off-white p-[27px]">
      <Upload
        name="cover"
        beforeUpload={beforeUpload}
        showUploadList={false}
        className="[&>.ant-upload]:!h-full [&>.ant-upload]:!w-full"
        customRequest={uploadImage}
      >
        <div className="flex h-full w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-neutral-medium-gray">
          <button className="outline-none" type="button">
            {uploadLoading ? (
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
      <ActionButtons
        isValid={true}
        isEditMode={isEditMode}
        onCancelOrBack={onCancelOrBack}
        onSaveOrNext={onSaveOrNext}
      />
      <ConfirmModal open={open} isLoading={removeLoading} onConfirm={removeImage} onClose={() => toggleOpen(false)}>
        Do you want to remove this image?
      </ConfirmModal>
    </div>
  );
}
