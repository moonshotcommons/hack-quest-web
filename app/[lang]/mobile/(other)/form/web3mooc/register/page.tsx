'use client';
import { FC } from 'react';
import FormContent from './components/FormContent';
import useGetHeight from '@/hooks/dom/useGetHeight';

interface HackathonSubmitPageProps {}

const HackathonSubmitPage: FC<HackathonSubmitPageProps> = () => {
  const { pageHeight } = useGetHeight();
  return (
    <div
      className="max-w-screen mx-auto flex w-full flex-col bg-white px-5 pb-10 pt-5"
      style={{
        height: pageHeight
      }}
    >
      <FormContent />
    </div>
  );
};

export default HackathonSubmitPage;
