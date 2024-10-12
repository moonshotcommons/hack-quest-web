'use client';

import EmailModal from '@/components/email/emali-model';
import webApi from '@/service';
import React, { useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import HackLogo from '@/public/images/logo/hackquest_logo.png';

import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import { message, Spin } from 'antd';

interface UploadFile {
  accepted: Array<File>;
  attachments: Array<File>;
}

const MyEmailEditor = () => {
  const emailEditorRef = useRef<EditorRef>(null);
  const [emailHtml, setEmailHtml] = useState('');

  const [loading, setLoading] = useState(true);

  const exportEmail = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;

      setEmailHtml(html);
    });
  };

  const onReady: EmailEditorProps['onReady'] = (unlayer) => {
    setLoading(false);
    unlayer.registerCallback('image', async (file: UploadFile, done: any) => {
      const data = new FormData();
      data.append('file', file.attachments[0]);
      data.append('filepath', 'email-editor/images');
      data.append('isPublic', `${true}`);

      message.loading({
        content: 'The image is being uploaded',
        duration: 0,
        key: 'upload-image'
      });

      // const { filepath } = await webApi.commonApi.uploadImage(data);
      // done({ progress: 100, url: filepath });
      webApi.commonApi
        .uploadImage(data)
        .then((res) => {
          done({ progress: 100, url: res.filepath });
        })
        .catch((err) => {
          message.error(err.msg);
        })
        .finally(() => {
          message.destroy('upload-image');
        });
    });
  };

  const editor = useMemo(() => {
    return <EmailEditor ref={emailEditorRef} style={{ minHeight: '90vh' }} editorId="1" onReady={onReady} />;
  }, []);

  return (
    <div>
      <div className="container mx-auto h-full">
        <div className="flex items-center justify-between">
          <div className={`flex h-full cursor-pointer items-center`}>
            <Image src={HackLogo} width={133} alt="logo"></Image>
          </div>
          <div className="flex gap-4">
            <EmailModal
              btnText="Send"
              getEmail={() => {
                return emailHtml;
              }}
              onClick={exportEmail}
              className="m-0  py-4"
            />
            <EmailModal
              btnText="bulk mail"
              getEmail={() => {
                return emailHtml;
              }}
              onClick={exportEmail}
              className="m-0  py-4"
              isBatch={true}
            />
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex h-full items-center justify-center">
          <Spin size="large" />
        </div>
      )}
      {editor}
    </div>
  );
};

export default MyEmailEditor;
