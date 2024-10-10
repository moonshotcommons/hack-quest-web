'use client';

import useEmailStore from '@/store/zustand/emailStore';
import dynamic from 'next/dynamic';
import { useShallow } from 'zustand/react/shallow';
import EmailRender, { CustomSlateElement } from './email-render';
import EmailModal from './emali-model';
import CustomIframe from './custom-ifram';
import { useRef } from 'react';

const TextEditor = dynamic(() => import('@/components/Common/TextEditor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const Email = () => {
  const { setContentObj } = useEmailStore(
    useShallow((state) => ({
      setContentObj: state.setContentObj
    }))
  );

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const getEmail = () => {
    return iframeRef?.current?.contentWindow?.document.documentElement.outerHTML as string;
  };

  return (
    <div className="flex p-8">
      <div className="basis-1/2">
        <TextEditor
          simpleModel={false}
          defaultHtml=""
          onChange={(editor) => {
            // console.log(editor.children as SlateElement[])
            setContentObj(editor.children as CustomSlateElement[]);
          }}
        />

        <EmailModal getEmail={getEmail} />
      </div>
      <div className="basis-1/2">
        <CustomIframe ref={iframeRef} className="h-full w-full">
          <EmailRender />
        </CustomIframe>
      </div>
    </div>
  );
};

export default Email;
