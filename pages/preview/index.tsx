import PreviewWorkspace from '@/components/v2/PreviewLessonPage/PreviewWorkspace';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface IProps {}

const PreviewPage: NextPage<IProps> = (props) => {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string>();

  return (
    <>
      <div className="w-full h-[calc(100vh-80px)] flex flex-col gap-4 font-next-book-Thin text-text-default-color">
        <PreviewWorkspace></PreviewWorkspace>
      </div>
    </>
  );
};

export default PreviewPage;
