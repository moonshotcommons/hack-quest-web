'use client';

// import EmailModal from '@/components/email/emali-model';
// import webApi from '@/service';
// import React, { useMemo, useRef, useState } from 'react';
// import Image from 'next/image';
// import HackLogo from '@/public/images/logo/hackquest_logo.png';

// import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
// import { message, Modal } from 'antd';
// import Button from '@/components/Common/Button';
// import Loading from '@/components/Common/Loading';
// import EmailDraftDrawer from './email-draft-drawer';
// import { EmailDraftVo } from '@/service/webApi/email/type';
// import useEmailStore from '@/store/zustand/emailStore';
// import { useShallow } from 'zustand/react/shallow';
// import SaveDraftModal from './save-draft-modal';

interface UploadFile {
  accepted: Array<File>;
  attachments: Array<File>;
}

const MyEmailEditor = () => {
  // const emailEditorRef = useRef<EditorRef>(null);
  // const [emailHtml, setEmailHtml] = useState('');
  // const [loading, setLoading] = useState(true);
  // const [open, setOpen] = useState(false);

  // const { setLoadingDesign } = useEmailStore(
  //   useShallow((state) => ({
  //     setLoadingDesign: state.setLoadingDesign
  //   }))
  // );

  // const exportEmail = () => {
  //   const unlayer = emailEditorRef.current?.editor;

  //   unlayer?.exportHtml((data) => {
  //     const { html } = data;
  //     setEmailHtml(html);
  //   });
  // };

  // const saveEmailDraft = (name: string) => {
  //   const unlayer = emailEditorRef.current?.editor;
  //   message.loading({
  //     content: 'saving...',
  //     duration: 0,
  //     key: 'save-draft'
  //   });

  //   unlayer?.exportHtml((data) => {
  //     const { design, html } = data;
  //     if (!design || !html) {
  //       message.error('draft is null');
  //       return;
  //     }
  //     webApi.emailApi
  //       .createEmailDraft({
  //         name: name,
  //         draftJson: design as unknown as string,
  //         draftHtml: html
  //       })
  //       .then((res: EmailDraftVo) => {
  //         if (res.id) message.success('save successfully');
  //       })
  //       .catch((err) => {
  //         message.error(err);
  //       })
  //       .finally(() => {
  //         message.destroy('save-draft');
  //         setOpen(false);
  //       });
  //   });
  // };

  // const onReady: EmailEditorProps['onReady'] = (unlayer) => {
  //   setLoading(false);
  //   unlayer.registerCallback('image', async (file: UploadFile, done: any) => {
  //     const data = new FormData();
  //     data.append('file', file.attachments[0]);
  //     data.append('filepath', 'email-editor/images');
  //     data.append('isPublic', `${true}`);

  //     message.loading({
  //       content: 'The image is being uploaded',
  //       duration: 0,
  //       key: 'upload-image'
  //     });

  //     // const { filepath } = await webApi.commonApi.uploadImage(data);
  //     // done({ progress: 100, url: filepath });
  //     webApi.commonApi
  //       .uploadImage(data)
  //       .then((res) => {
  //         done({ progress: 100, url: res.filepath });
  //       })
  //       .catch((err) => {
  //         message.error(err.msg);
  //       })
  //       .finally(() => {
  //         message.destroy('upload-image');
  //       });
  //   });

  //   setLoadingDesign(loadingDesign);
  // };

  // const editor = useMemo(() => {
  //   return <EmailEditor ref={emailEditorRef} style={{ minHeight: '90vh' }} editorId="1" onReady={onReady} />;
  // }, []);

  // const loadingDesign = (design: any) => {
  //   const unlayer = emailEditorRef.current?.editor;
  //   unlayer?.loadDesign(design);
  // };

  // const clear = () => {
  //   Modal.warning({
  //     title: 'Waring',
  //     content: 'Are you sure you want to clear the current design?',
  //     footer: () => (
  //       <div className="flex justify-end gap-5 pt-5">
  //         <Button
  //           type="secondary"
  //           className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
  //           onClick={() => {
  //             Modal.destroyAll();
  //           }}
  //         >
  //           cancel
  //         </Button>
  //         <Button
  //           type="primary"
  //           className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
  //           onClick={() => {
  //             // 默认配置 清除布局
  //             loadingDesign({
  //               body: {
  //                 id: 'SbYqKcMPth',
  //                 rows: [
  //                   {
  //                     id: 'rS92rE_muN',
  //                     cells: [1],
  //                     values: {
  //                       _meta: { htmlID: 'u_row_1', htmlClassNames: 'u_row' },
  //                       anchor: '',
  //                       columns: false,
  //                       padding: '0px',
  //                       hideable: true,
  //                       deletable: true,
  //                       draggable: true,
  //                       selectable: true,
  //                       _styleGuide: null,
  //                       hideDesktop: false,
  //                       duplicatable: true,
  //                       backgroundColor: '',
  //                       backgroundImage: {
  //                         url: '',
  //                         size: 'custom',
  //                         repeat: 'no-repeat',
  //                         position: 'center',
  //                         fullWidth: true,
  //                         customPosition: ['50%', '50%']
  //                       },
  //                       displayCondition: null,
  //                       columnsBackgroundColor: ''
  //                     },
  //                     columns: [
  //                       {
  //                         id: 'KFqGcAwoIl',
  //                         values: {
  //                           _meta: { htmlID: 'u_column_1', htmlClassNames: 'u_column' },
  //                           border: {},
  //                           padding: '0px',
  //                           borderRadius: '0px',
  //                           backgroundColor: ''
  //                         },
  //                         contents: []
  //                       }
  //                     ]
  //                   }
  //                 ],
  //                 values: {
  //                   _meta: { htmlID: 'u_body', htmlClassNames: 'u_body' },
  //                   language: {},
  //                   linkStyle: {
  //                     body: true,
  //                     linkColor: '#0000ee',
  //                     linkUnderline: true,
  //                     linkHoverColor: '#0000ee',
  //                     linkHoverUnderline: true
  //                   },
  //                   textColor: '#000000',
  //                   fontFamily: { label: 'Arial', value: 'arial,helvetica,sans-serif' },
  //                   popupWidth: '600px',
  //                   _styleGuide: null,
  //                   popupHeight: 'auto',
  //                   borderRadius: '10px',
  //                   contentAlign: 'center',
  //                   contentWidth: '500px',
  //                   popupPosition: 'center',
  //                   preheaderText: '',
  //                   backgroundColor: '#F7F8F9',
  //                   backgroundImage: {
  //                     url: '',
  //                     size: 'custom',
  //                     repeat: 'no-repeat',
  //                     position: 'center',
  //                     fullWidth: true
  //                   },
  //                   contentVerticalAlign: 'center',
  //                   popupBackgroundColor: '#FFFFFF',
  //                   popupBackgroundImage: {
  //                     url: '',
  //                     size: 'cover',
  //                     repeat: 'no-repeat',
  //                     position: 'center',
  //                     fullWidth: true
  //                   },
  //                   popupCloseButton_action: {
  //                     name: 'close_popup',
  //                     attrs: { onClick: "document.querySelector('.u-popup-container').style.display = 'none';" }
  //                   },
  //                   popupCloseButton_margin: '0px',
  //                   popupCloseButton_position: 'top-right',
  //                   popupCloseButton_iconColor: '#000000',
  //                   popupOverlay_backgroundColor: 'rgba(0, 0, 0, 0.1)',
  //                   popupCloseButton_borderRadius: '0px',
  //                   popupCloseButton_backgroundColor: '#DDDDDD'
  //                 },
  //                 footers: [],
  //                 headers: []
  //               },
  //               counters: { u_row: 1, u_column: 1 },
  //               schemaVersion: 17
  //             });
  //             Modal.destroyAll();
  //           }}
  //         >
  //           confirm
  //         </Button>
  //       </div>
  //     )
  //   });
  // };

  return (
    <div>
      {/* <div className="container mx-auto h-full">
        <div className="flex items-center justify-between">
          <div className="flex h-full items-center gap-x-20">
            <div className="cursor-pointer ">
              <Image src={HackLogo} width={133} alt="logo"></Image>
            </div>
            <EmailDraftDrawer />
          </div>
          <div className="flex gap-4">
            <div className="mt-4 flex gap-4">
              <SaveDraftModal open={open} setOpen={setOpen} onSave={saveEmailDraft} />
              <Button
                type="primary"
                className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
                onClick={clear}
              >
                Clear Design
              </Button>
            </div>
            <EmailModal
              btnText="Send Test"
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
          <Loading loading={loading} />
        </div>
      )}
      {editor} */}
    </div>
  );
};

export default MyEmailEditor;
