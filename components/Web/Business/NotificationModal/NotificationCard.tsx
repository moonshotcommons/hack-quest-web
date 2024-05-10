// import Image from 'next/image';
// import React, { useContext } from 'react';
// import HackLogo from '@/public/images/user/hack_logo.png';
// import dayjs from 'dayjs';
// import { FiTrash2 } from 'react-icons/fi';
// import { IoIosArrowForward } from 'react-icons/io';
// import { LangContext } from '@/components/Provider/Lang';
// import { useTranslation } from '@/i18n/client';
// import { TransNs } from '@/i18n/config';
// import { BiSpreadsheet } from 'react-icons/bi';
// import { NotificationType } from '@/service/webApi/user/type';
// import webApi from '@/service';
// import { useHandleNotification } from '@/hooks/notification/useHandleNotification';

// interface NotificationCardProp {
//   message: NotificationType;
//   border: boolean;
//   updateList: VoidFunction;
//   openInfoModal: VoidFunction;
// }

// const NotificationCard: React.FC<NotificationCardProp> = ({ message, border, updateList, openInfoModal }) => {
//   const { lang } = useContext(LangContext);
//   const { t } = useTranslation(lang, TransNs.BASIC);
//   const type = 'message';
//   const hoverRender = () => {
//     switch (type) {
//       // case 'message':
//       //   return (
//       //     <div className='flex gap-[8px] '>
//       //     <div className="flex-center h-[28px] w-[28px] rounded-[50%] bg-yellow-primary">
//       //         <IoIosArrowForward />
//       //       </div>
//       //       <span>{t('learnMore')}</span>
//       //     </div>

//       //   );
//       case 'message':
//         return (
//           <div className="flex cursor-pointer gap-[8px]" onClick={handleClick}>
//             <div className="flex-center h-[28px] w-[28px] rounded-[50%] bg-yellow-primary">
//               <BiSpreadsheet />
//             </div>
//             <span>{t('notificationModal.readFullMessage')}</span>
//           </div>
//         );
//     }
//   };
//   const handleClick = async () => {
//     await webApi.userApi.notificationReadById(message.id);
//     updateList();
//     openInfoModal();
//   };
//   const handleDelete = async () => {
//     await webApi.userApi.notificationDeteleById(message.id);
//     updateList();
//   };
//   return (
//     <div
//       className={`group border-b border-t  py-[10px]  ${border ? 'border-neutral-light-gray' : 'border-b-transparent'} ${message.isRead && 'opacity-[0.5]'}`}
//     >
//       <div className="relative py-[6px] group-hover:px-[20px]">
//         <div className="flex gap-[16px] ">
//           <div className="relative h-[36px] w-[36px] flex-shrink-0 overflow-hidden rounded-[50%]">
//             <Image src={message.avatar || HackLogo} alt={'hack-logo'} fill className="object-cover" />
//           </div>
//           <div className="flex-1 ">
//             <p className="body-m text-neutral-black">{message.content}</p>
//             <div className="caption-12pt mt-[4px] flex items-center justify-between text-neutral-rich-gray">
//               <div className="flex gap-[16px]">
//                 <span>{dayjs(message.createdAt).format('MMM D,YY')}</span>
//                 <span>Update</span>
//               </div>
//               <div className="relative z-[3] cursor-pointer" onClick={handleDelete}>
//                 <FiTrash2 size={16} />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="body-m absolute left-0 top-0 flex h-0 w-full items-center  justify-center overflow-hidden rounded-[8px] bg-yellow-extra-light text-neutral-black opacity-[0.95] transition-all  group-hover:h-full">
//           {hoverRender()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotificationCard;
