// 'use client';

// import useEmailStore from '@/store/zustand/emailStore';
// import dynamic from 'next/dynamic';
// import { useShallow } from 'zustand/react/shallow';
// import EmailRender, { CustomSlateElement } from './email-render';

// import CustomIframe from './custom-ifram';
// import { useRef } from 'react';
// import EmailModal from '@/components/email/emali-model';

// const TextEditor = dynamic(() => import('@/components/Common/TextEditor'), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>
// });

// const Email = () => {
//   const { setContentObj } = useEmailStore(
//     useShallow((state) => ({
//       setContentObj: state.setContentObj
//     }))
//   );

//   const iframeRef = useRef<HTMLIFrameElement | null>(null);

//   const getEmail = () => {
//     return iframeRef?.current?.contentWindow?.document.documentElement.outerHTML as string;
//   };

//   return (
//     <div className="flex p-8">
//       <div className="max-w-[750px] basis-1/2 pt-2">
//         <TextEditor
//           simpleModel={false}
//           defaultHtml=""
//           onChange={(editor) => {
//             // console.log(editor.children as SlateElement[])
//             setContentObj(editor.children as CustomSlateElement[]);
//           }}
//         />

//         <div className="flex gap-4">
//           <EmailModal btnText="Send Test" getEmail={getEmail} className="m-0  py-4" />
//           <EmailModal btnText="bulk mail" getEmail={getEmail} className="m-0  py-4" isBatch={true} />
//         </div>
//       </div>
//       <div className="basis-1/2">
//         <CustomIframe ref={iframeRef} className="h-full w-full">
//           <EmailRender />
//         </CustomIframe>
//       </div>
//     </div>
//   );
// };

// export default Email;
