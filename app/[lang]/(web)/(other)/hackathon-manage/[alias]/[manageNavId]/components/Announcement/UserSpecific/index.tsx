'use client';
import { FC, useRef, useState } from 'react';

import { cn } from '@/helper/utils';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';
import Button from '@/components/Common/Button';
import AnnouncementCreateModal, { useAnnouncementModal } from './AnnouncementCreateModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import webApi from '@/service';
import { message } from 'antd';
import { errorMessage } from '@/helper/ui';
import ConfirmModal, { ConfirmModalRef } from '@/components/Web/Business/ConfirmModal';
import { Announcement } from '@/service/webApi/hackathon/types';
import { HackathonModeEnum } from './constants';

interface UserSpecificProps {}

const UserSpecific: FC<UserSpecificProps> = (props) => {
  const hackathon = useHackathonManageStore((state) => state.hackathon);

  const { onCreate, onEdit } = useAnnouncementModal();
  const actionModal = useRef<ConfirmModalRef>(null);
  const [modalType, setModalType] = useState<'delete' | 'sendAfterDelete' | 'schedule' | 'sendNow' | 'closeAndSave'>();
  const queryClient = useQueryClient();

  const { data: announcements } = useQuery({
    queryKey: ['hackathon-announcements', hackathon.id],
    queryFn: () => {
      if (!hackathon.id) return null;
      return webApi.hackathonV2Api.getAnnouncements(hackathon.id);
    }
  });

  const { mutateAsync: deleteAnnouncementAsync, isPending } = useMutation({
    mutationFn: (id: string | number) => webApi.hackathonV2Api.deleteAnnouncementById(hackathon.id, id),
    onSuccess() {
      message.success('Delete success!');
      queryClient.invalidateQueries({ queryKey: ['hackathon-announcements'] });
    },
    onError(error, variables, context) {
      errorMessage(error);
    }
  });

  const deleteAnnouncementAction = (announcement: Announcement, callback?: Function) => {
    announcement.status === 'publish' ? setModalType('sendAfterDelete') : setModalType('delete');
    actionModal.current?.open({
      onConfirm: async () => {
        deleteAnnouncementAsync(announcement.id!)
          .then(() => {
            callback && callback();
          })
          .catch((err) => {
            console.error(err);
          });

        setTimeout(() => {
          setModalType(undefined);
        }, 300);
      }
    });
  };

  const modalAction = (
    type: 'schedule' | 'sendNow' | 'closeAndSave',
    callback: () => Promise<any>,
    cancelCallback?: VoidFunction
  ) => {
    setModalType(type);
    actionModal.current?.open({
      onConfirm: async () => {
        await callback();
        setTimeout(() => {
          setModalType(undefined);
        }, 300);
      },
      onCancel() {
        cancelCallback?.();
      }
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h5 className="text-h5 text-neutral-off-black">User-Specific Announcements</h5>
      <p className="body-m text-neutral-rich-gray">
        User-specific announcements allow for personalized communication, enabling you to tailor messages based on the
        needs or behaviors of selected users. With targeted announcements, you can select specific users, customize the
        message and schedule delivery.
      </p>
      <div className="flex w-full flex-wrap gap-4 [&>div]:w-[calc((100%-48px)/4)]">
        <div
          className="flex h-[15.3125rem] cursor-pointer items-center justify-center rounded-[10px] border border-dashed border-neutral-medium-gray"
          onClick={onCreate}
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.66406 16.5003C2.66406 9.13653 8.6336 3.16699 15.9974 3.16699C19.5336 3.16699 22.925 4.57175 25.4255 7.07224C27.926 9.57272 29.3307 12.9641 29.3307 16.5003C29.3307 23.8641 23.3612 29.8337 15.9974 29.8337C8.6336 29.8337 2.66406 23.8641 2.66406 16.5003ZM17.3304 17.8333H22.6637C23.4001 17.8333 23.9971 17.2364 23.9971 16.5C23.9971 15.7636 23.4001 15.1667 22.6637 15.1667H17.3304V9.83333C17.3304 9.09695 16.7334 8.5 15.9971 8.5C15.2607 8.5 14.6637 9.09695 14.6637 9.83333V15.1667H9.3304C8.59402 15.1667 7.99707 15.7636 7.99707 16.5C7.99707 17.2364 8.59402 17.8333 9.3304 17.8333H14.6637V23.1667C14.6637 23.903 15.2607 24.5 15.9971 24.5C16.7334 24.5 17.3304 23.903 17.3304 23.1667V17.8333Z"
                fill="#8C8C8C"
              />
            </svg>
            <p className="body-m text-neutral-medium-gray">Create an announcement</p>
          </div>
        </div>
        {announcements?.map((announcement) => {
          return (
            <div
              key={announcement.id!}
              className={cn(
                'flex h-[15.3125rem] flex-col gap-5 rounded-2xl border border-neutral-medium-gray bg-neutral-white p-5',
                {
                  'border-neutral-light-gray bg-neutral-off-white': announcement.status === 'publish'
                }
              )}
            >
              <p className="flex gap-2">
                <span
                  className={cn('inline-block h-[29px] w-[3px] rounded-full bg-yellow-dark', {
                    'bg-neutral-medium-gray': announcement.status === 'publish'
                  })}
                ></span>
                <span className="body-l-bold truncate text-neutral-off-black">
                  {announcement.title || 'Unnamed Announcement'}
                </span>
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="body-m capitalize text-neutral-medium-gray">message</span>
                  <div
                    className={cn(
                      'caption-12pt flex min-h-[1.5rem] min-w-[5rem] items-center justify-center rounded border border-neutral-medium-gray px-2 py-1',
                      {
                        'border-yellow-dark bg-yellow-extra-light':
                          !!announcement.message && announcement.status !== 'publish',
                        'border-neutral-light-gray bg-neutral-light-gray': announcement.status === 'publish'
                      }
                    )}
                  >
                    {!!announcement.message && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.335938 6.99967C0.335938 3.31778 3.32071 0.333008 7.0026 0.333008C8.77071 0.333008 10.4664 1.03539 11.7166 2.28563C12.9669 3.53587 13.6693 5.23156 13.6693 6.99967C13.6693 10.6816 10.6845 13.6663 7.0026 13.6663C3.32071 13.6663 0.335938 10.6816 0.335938 6.99967ZM6.14307 9.47281L10.1431 5.47281C10.4045 5.21139 10.4045 4.78755 10.1431 4.52614C9.88165 4.26472 9.45782 4.26472 9.1964 4.52614L5.66973 8.05947L4.80974 7.19281C4.64063 7.0237 4.39415 6.95766 4.16315 7.01955C3.93215 7.08145 3.75171 7.26188 3.68982 7.49289C3.62792 7.72389 3.69396 7.97037 3.86307 8.13947L5.1964 9.47281C5.32158 9.59901 5.49198 9.67 5.66973 9.67C5.84749 9.67 6.01789 9.59901 6.14307 9.47281Z"
                          fill={announcement.status !== 'publish' ? '#FAD81C' : '#8C8C8C'}
                        />
                      </svg>
                    )}
                    {!announcement.message && 'NOT SET'}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="body-m capitalize text-neutral-medium-gray">Receivers</span>
                  <div
                    className={cn(
                      'caption-12pt flex min-h-[1.5rem] min-w-[5rem] items-center justify-center rounded border border-neutral-medium-gray px-2 py-1',
                      {
                        'border-yellow-dark bg-yellow-extra-light':
                          !!announcement.receivers && announcement.status !== 'publish',
                        'border-neutral-light-gray bg-neutral-light-gray': announcement.status === 'publish'
                      }
                    )}
                  >
                    {!!announcement.receivers && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.335938 6.99967C0.335938 3.31778 3.32071 0.333008 7.0026 0.333008C8.77071 0.333008 10.4664 1.03539 11.7166 2.28563C12.9669 3.53587 13.6693 5.23156 13.6693 6.99967C13.6693 10.6816 10.6845 13.6663 7.0026 13.6663C3.32071 13.6663 0.335938 10.6816 0.335938 6.99967ZM6.14307 9.47281L10.1431 5.47281C10.4045 5.21139 10.4045 4.78755 10.1431 4.52614C9.88165 4.26472 9.45782 4.26472 9.1964 4.52614L5.66973 8.05947L4.80974 7.19281C4.64063 7.0237 4.39415 6.95766 4.16315 7.01955C3.93215 7.08145 3.75171 7.26188 3.68982 7.49289C3.62792 7.72389 3.69396 7.97037 3.86307 8.13947L5.1964 9.47281C5.32158 9.59901 5.49198 9.67 5.66973 9.67C5.84749 9.67 6.01789 9.59901 6.14307 9.47281Z"
                          fill={announcement.status !== 'publish' ? '#FAD81C' : '#8C8C8C'}
                        />
                      </svg>
                    )}
                    {!announcement.receivers && 'NOT SET'}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="body-m capitalize text-neutral-medium-gray">Status</span>
                  <div
                    className={cn(
                      'caption-12pt flex min-h-[1.5rem] min-w-[5rem] items-center justify-center rounded border border-neutral-medium-gray px-2 py-1',
                      {
                        'border-yellow-dark bg-yellow-extra-light':
                          !!announcement.plannedTime && announcement.status !== 'publish',
                        'border-neutral-light-gray bg-neutral-light-gray': announcement.status === 'publish'
                      }
                    )}
                  >
                    {/* {!!announcement.plannedTime && announcement.status === 'draft' && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0.335938 6.99967C0.335938 3.31778 3.32071 0.333008 7.0026 0.333008C8.77071 0.333008 10.4664 1.03539 11.7166 2.28563C12.9669 3.53587 13.6693 5.23156 13.6693 6.99967C13.6693 10.6816 10.6845 13.6663 7.0026 13.6663C3.32071 13.6663 0.335938 10.6816 0.335938 6.99967ZM6.14307 9.47281L10.1431 5.47281C10.4045 5.21139 10.4045 4.78755 10.1431 4.52614C9.88165 4.26472 9.45782 4.26472 9.1964 4.52614L5.66973 8.05947L4.80974 7.19281C4.64063 7.0237 4.39415 6.95766 4.16315 7.01955C3.93215 7.08145 3.75171 7.26188 3.68982 7.49289C3.62792 7.72389 3.69396 7.97037 3.86307 8.13947L5.1964 9.47281C5.32158 9.59901 5.49198 9.67 5.66973 9.67C5.84749 9.67 6.01789 9.59901 6.14307 9.47281Z"
                          fill={announcement.status !== 'publish' ? '#FAD81C' : '#8C8C8C'}
                        />
                      </svg>
                    )} */}
                    {(!announcement.plannedTime || announcement.status === 'draft') && 'NOT SET'}
                    {announcement.plannedTime && announcement.status === 'waiting' && 'SCHEDULED'}
                    {announcement.plannedTime && announcement.status === 'publish' && 'SENT'}
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-3">
                {announcement.status !== 'publish' && (
                  <Button
                    type="primary"
                    className="button-text-s h-[2.125rem] flex-1 text-neutral-black"
                    onClick={() => {
                      onEdit(announcement);
                    }}
                  >
                    EDIT
                  </Button>
                )}
                {announcement.status === 'publish' && (
                  <Button
                    ghost
                    className="button-text-s h-[2.125rem] flex-1 text-neutral-black"
                    onClick={() => {
                      onEdit(announcement);
                    }}
                  >
                    view details
                  </Button>
                )}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                  onClick={() => {
                    deleteAnnouncementAction(announcement);
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 2H5C3.34315 2 2 3.34315 2 5V7C2 7.55228 2.44772 8 3 8H4V19C4 20.6569 5.34315 22 7 22H17C18.6569 22 20 20.6569 20 19V8H21C21.5523 8 22 7.55228 22 7V5C22 3.34315 20.6569 2 19 2ZM18 19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V8H18V19ZM4 6H20V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V6ZM8 17V11C8 10.4477 8.44772 10 9 10C9.55228 10 10 10.4477 10 11V17C10 17.5523 9.55228 18 9 18C8.44772 18 8 17.5523 8 17ZM14 11V17C14 17.5523 14.4477 18 15 18C15.5523 18 16 17.5523 16 17V11C16 10.4477 15.5523 10 15 10C14.4477 10 14 10.4477 14 11Z"
                    fill="#8C8C8C"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      <AnnouncementCreateModal
        hackathonId={hackathon.id}
        onDelete={deleteAnnouncementAction}
        modalAction={modalAction}
        hackathonMode={hackathon.info?.mode as HackathonModeEnum}
      />
      <ConfirmModal ref={actionModal} className="sm:w-[50.5rem]" confirmText="yes">
        {['delete', 'sendAfterDelete'].includes(modalType!) && (
          <h3 className="text-h4 mt-5 text-center">Do you want to delete the announcement?</h3>
        )}
        {modalType === 'sendAfterDelete' && (
          <p className="body-m mt-10 text-center">
            All recipients have received the announcement. It will be removed only from your dashboard.
          </p>
        )}

        {modalType === 'schedule' && (
          <>
            <h3 className="text-h4 mt-5 text-center">Do you want to schedule this announcement?</h3>
            <p className="body-m mt-10 text-center">You can always edit this announcement before the scheduled time.</p>
          </>
        )}

        {modalType === 'sendNow' && (
          <>
            <h3 className="text-h4 mt-5 text-center">Do you want to send the announcement now?</h3>
            <p className="body-m mt-10 text-center">
              All receivers will be notified, and once it is issued, it cannot be revoked.
            </p>
          </>
        )}
        {modalType === 'closeAndSave' && (
          <>
            <h3 className="text-h4 mt-5 text-center">Do you want to close and save the announcement now?</h3>
          </>
        )}
      </ConfirmModal>
    </div>
  );
};

export default UserSpecific;
