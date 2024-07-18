'use client';

import * as React from 'react';
import { FileIcon, UploadIcon } from 'lucide-react';
import { RemoveFile } from '../modals/remove-file-modal';
import { useMutation } from '@tanstack/react-query';
import webApi from '@/service';
import { Spinner } from '@/components/ui/spinner';
import { message } from 'antd';
import { useProfile } from './profile-provider';

export function Resume() {
  const { profile, invalidate } = useProfile();
  const [uploadingFile, setUploadingFile] = React.useState<any>({});
  const [files, setFiles] = React.useState<any[]>(profile?.resumes || []);

  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) => webApi.userApi.uploadResume(formData)
  });

  const removeMutation = useMutation({
    mutationFn: (resumeId: string) => webApi.userApi.removeResume(resumeId),
    onSuccess: () => {
      invalidate();
      message.success('Remove success');
    }
  });

  React.useEffect(() => {
    setFiles(profile?.resumes || []);
  }, [profile]);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingFile((prev: any) => ({ ...prev, [file.name]: true }));
      setFiles((prev: any) => [...prev, file]);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', file.name);

      uploadMutation
        .mutateAsync(formData)
        .then(() => {
          invalidate();
          message.success('Upload success');
        })
        .catch(() => {
          message.error('Upload failed');
          setTimeout(() => {
            setFiles((prev: any) => prev.filter((f: any) => f.name !== file.name));
          }, 2000);
        })
        .finally(() => {
          setUploadingFile((prev: any) => ({ ...prev, [file.name]: false }));
        });
    }
  }

  return (
    <div className="mt-2 flex flex-col gap-5 bg-neutral-white px-5 py-4 sm:mt-12 sm:gap-8 sm:p-0">
      <h2 className="font-next-book-bold text-lg font-bold text-neutral-off-black sm:text-[22px]">Resume</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {files.map((file, index) => (
          <div
            key={index}
            className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-neutral-light-gray p-4 transition-colors duration-300 hover:bg-neutral-off-white"
            onClick={() => {
              window.open(file?.file, '_blank');
            }}
          >
            <div className="flex items-center gap-2">
              <FileIcon size={20} />
              <span className="text-sm">{file.name}</span>
            </div>
            {uploadMutation.isPending && uploadingFile[file.name] ? (
              <Spinner size={20} />
            ) : (
              <RemoveFile
                loading={removeMutation.isPending}
                name={file.name}
                onConfirm={() => removeMutation.mutate(file.id)}
              />
            )}
          </div>
        ))}
        <div className="group relative flex w-full items-center justify-center gap-2.5 rounded-xl border border-dashed border-neutral-medium-gray p-4 transition-colors duration-300 hover:border-neutral-black">
          <label className="absolute inset-0 h-full w-full cursor-pointer opacity-0 group-hover:opacity-100">
            <input type="file" accept="application/*" className="hidden" onChange={onChange} />
          </label>
          <button className="inline-flex items-center justify-center gap-2 outline-none">
            <UploadIcon size={20} className="text-neutral-rich-gray" />
            <span className="body-s text-neutral-rich-gray">Upload file</span>
          </button>
        </div>
      </div>
    </div>
  );
}
