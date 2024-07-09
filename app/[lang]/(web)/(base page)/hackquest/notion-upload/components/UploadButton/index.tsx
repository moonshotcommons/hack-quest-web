'use client';
import Button from '@/components/Common/Button';
import { FC, ReactNode } from 'react';
import { useNotionUploadContext } from '../NotionUploadProvider';

interface UploadButtonProps {
  notionUrl: string;
  children?: ReactNode;
}

const UploadButton: FC<UploadButtonProps> = ({ notionUrl, children }) => {
  const { onSubmit } = useNotionUploadContext();
  return (
    <Button
      htmlType="submit"
      type="primary"
      className="whitespace-nowrap rounded-lg px-6 py-3"
      onClick={() => {
        onSubmit(notionUrl);
      }}
    >
      {children || '上传'}
    </Button>
  );
};

export default UploadButton;
