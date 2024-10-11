import Modal from '@/components/Common/Modal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Announcement,
  AnnouncementAction,
  AnnouncementCreateDto,
  ReceiverType
} from '@/service/webApi/hackathon/types';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { create } from 'zustand';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTimezone } from '@/components/hackathon-org/actions';
import { Input } from '@/components/ui/input';
import { cn } from '@/helper/utils';
import { Textarea } from '@/components/ui/textarea';
import { Timezone } from '@/components/hackathon-org/common/timezone';
import { DatePicker } from '@/components/hackathon-org/common/date-picker';
import dayjs from '@/components/Common/Dayjs';
import { FormInput } from '@/components/Common/FormComponent';
import { HackathonModeEnum, receiversHybird, receiversOnline } from './constants';
import webApi from '@/service';
import Button from '@/components/Common/Button';

import dynamic from 'next/dynamic';
import { errorMessage } from '@/helper/ui';
import { Checkbox } from '@/components/ui/checkbox';
const TextEditor = dynamic(() => import('@/components/Common/TextEditor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

interface AnnouncementCreateModalProps {
  hackathonId: string;
  onDelete: (data: Announcement, callback?: Function) => void;
  modalAction: (
    type: 'schedule' | 'sendNow' | 'closeAndSave',
    callback: () => Promise<any>,
    cancelCallback?: VoidFunction
  ) => void;
  hackathonMode: HackathonModeEnum;
}

interface State {
  announcement: Announcement;
  open: boolean;
  mode: 'Edit' | 'Create';
  onCreate: () => void;
  onEdit: (announcement: Announcement) => void;
  setOpen: (open: boolean) => void;
  setAnnouncement: (announcement: Announcement) => void;
  setMode: (mode: 'Edit' | 'Create') => void;
}

const defaultState = (): Announcement => ({
  id: null,
  title: '',
  message: '',
  timezone: '',
  plannedTime: '',
  rightNow: false,
  receivers: '',
  status: 'draft',
  hackathonId: '',
  actualTime: '',
  createdAt: '',
  updatedAt: ''
});

export const useAnnouncementModal = create<State>((set) => ({
  announcement: defaultState(),
  open: false,
  mode: 'Create',
  onCreate: () => set({ open: true, mode: 'Create' }),
  onEdit: (announcement) =>
    set({
      open: true,
      announcement,
      mode: 'Edit'
    }),
  setOpen: (open) => set({ open }),
  setAnnouncement: (announcement) => set({ announcement }),
  setMode: (mode) => set({ mode })
}));

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),

  message: z.string().min(1, {
    message: 'Message is required'
  }),
  timezone: z.string().min(1, {
    message: 'Timezone is required'
  }),
  receivers: z.string().min(1, { message: 'Receivers is required' }),
  plannedTime: z.string().min(1, {
    message: 'Send time is required'
  })
});

const AnnouncementCreateModal: FC<AnnouncementCreateModalProps> = (props) => {
  const { hackathonId, onDelete, modalAction, hackathonMode } = props;
  const { announcement, setAnnouncement, setOpen, open, mode } = useAnnouncementModal();

  const { data: timezone } = useQuery({
    staleTime: Infinity,
    queryKey: ['timezone'],
    queryFn: () => getTimezone(),
    select: (data) => data?.timezone
  });

  const disable = announcement.status === 'publish';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    disabled: disable,
    defaultValues: {
      title: announcement.title,
      message: '',
      receivers: announcement.receivers,
      plannedTime: announcement.plannedTime && dayjs(announcement.plannedTime).tz(dayjs.tz.guess()).format(),
      timezone: announcement.timezone || timezone
    }
  });

  const [message, setMessage] = useState<string>('');
  const [selectReceivers, setSelectReceivers] = useState<ReceiverType[]>([]);

  const queryClient = useQueryClient();

  const {
    data: receiversCount,
    isPending: countFetchLoading,
    isError: countFetchError
  } = useQuery({
    queryKey: ['receivers-count'],
    queryFn: () => webApi.hackathonV2Api.getReceiversCount(hackathonId)
  });

  const [sendNow, setSendNow] = useState(false);

  const [action, setAction] = useState('');

  const {
    mutateAsync: createAnnouncementAsync,
    mutate: createAnnouncement,
    isPending: createLoading
  } = useMutation({
    mutationFn: (data: AnnouncementCreateDto) => webApi.hackathonV2Api.createAnnouncement(hackathonId, data),
    onError(error, variables, context) {
      errorMessage(error);
      setAction('');
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ['hackathon-announcements'] });
      setOpen(false);
      setAction('');
      setAnnouncement(defaultState());
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>, action: AnnouncementAction, cancel?: VoidFunction) => {
    setAction(action);
    const state = {
      id: announcement.id,
      title: values.title,
      message,
      rightNow: sendNow,
      plannedTime: new Date(values.plannedTime).toJSON(),
      timezone: values.timezone || timezone,
      receivers: values.receivers,
      action
    };
    if (action === AnnouncementAction.Save) {
      modalAction('closeAndSave', async () => createAnnouncementAsync(state), cancel);
    } else {
      modalAction(sendNow ? 'sendNow' : 'schedule', async () => createAnnouncementAsync(state));
    }
  };

  useEffect(() => {
    const state = {
      title: announcement.title,
      message: announcement.message,
      receivers: announcement.receivers,
      plannedTime:
        announcement.plannedTime && dayjs(announcement.plannedTime).tz(dayjs.tz.guess()).format('YYYY-MM-DD HH:mm'),
      timezone: announcement.timezone || timezone
    };

    if (mode === 'Create') {
      form.reset({
        title: '',
        message: '',
        receivers: '',
        plannedTime: '',
        timezone: ''
      });
    } else {
      form.reset({ ...state, message: '' });
    }

    setAction('');
    setSendNow(announcement.rightNow);

    setTimeout(() => {
      const defaultSelect = (form.getValues('receivers') || '').split(',') as ReceiverType[];
      setSelectReceivers(defaultSelect);
    }, 300);
  }, [announcement, form, mode, timezone]);

  return (
    open && (
      <Modal
        open={open}
        onClose={() => {
          // setOpen(false);
        }}
        showCloseIcon
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              if (disable) {
                setOpen(false);
                setAnnouncement(defaultState());
                return;
              }
              onSubmit(form.getValues(), AnnouncementAction.Save, () => {
                setOpen(false);
                setAction('');
              });
            }}
          >
            <path
              d="M21.708 20.2902C21.8973 20.478 22.0038 20.7336 22.0038 21.0002C22.0038 21.2668 21.8973 21.5224 21.708 21.7102C21.5202 21.8995 21.2646 22.006 20.998 22.006C20.7313 22.006 20.4758 21.8995 20.288 21.7102L11.998 13.4102L3.70799 21.7102C3.52022 21.8995 3.26462 22.006 2.99799 22.006C2.73135 22.006 2.47575 21.8995 2.28799 21.7102C2.09867 21.5224 1.99219 21.2668 1.99219 21.0002C1.99219 20.7336 2.09867 20.478 2.28799 20.2902L10.588 12.0002L2.28799 3.71021C2.03433 3.45655 1.93526 3.08683 2.02811 2.74033C2.12095 2.39383 2.3916 2.12318 2.73811 2.03033C3.08461 1.93748 3.45433 2.03655 3.70799 2.29021L11.998 10.5902L20.288 2.29021C20.6801 1.89809 21.3159 1.89809 21.708 2.29021C22.1001 2.68233 22.1001 3.31809 21.708 3.71021L13.408 12.0002L21.708 20.2902Z"
              fill="#231F20"
            />
          </svg>
        }
      >
        <div className="flex max-h-[calc(100vh-80px)] w-[55.5rem] flex-col gap-6 overflow-hidden rounded-2xl bg-neutral-white p-10 pt-[3.75rem]">
          <Form {...form}>
            <form className="flex h-full flex-col gap-6 overflow-hidden">
              {Title()}
              <div className="flex flex-1 flex-col gap-6 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                {Message()}
                <hr className="bg-neutral-light-gray" />
                {SendTime()}
                {TimeZone()}
                <hr className="bg-neutral-light-gray" />
                {Receivers()}
              </div>
              <div className="mt-5 flex h-fit justify-center gap-5 pb-3">
                <Button
                  ghost
                  className="button-text-m w-[15rem] px-0 py-4 uppercase"
                  loading={action === AnnouncementAction.Save && createLoading}
                  disabled={disable}
                  onClick={(e) => {
                    e.preventDefault();
                    onSubmit(form.getValues(), AnnouncementAction.Save);
                  }}
                >
                  save & close
                </Button>
                <Button
                  type="primary"
                  className="button-text-m w-[15rem] px-0 py-4 uppercase"
                  loading={action === AnnouncementAction.Send && createLoading}
                  disabled={!form.formState.isValid || disable}
                  onClick={async (e) => {
                    e.preventDefault();
                    await form.trigger();
                    if (!form.formState.isValid) return;
                    onSubmit(form.getValues(), AnnouncementAction.Send);
                  }}
                >
                  {sendNow ? 'send now' : 'send at scheduled time'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    )
  );

  function Receivers() {
    let receivers: Partial<Record<ReceiverType, string>> = receiversHybird;
    if (hackathonMode === HackathonModeEnum.HYBRID) {
      receivers = receiversHybird;
    } else {
      receivers = receiversOnline;
    }

    return (
      <div className="flex w-full flex-col gap-3">
        <div className="">
          <p className="body-m text-left leading-[160%] text-neutral-rich-gray">Receivers*</p>
        </div>
        <div
          className={cn('flex w-full flex-wrap gap-2', {
            'rounded-[8px] border-neutral-light-gray bg-neutral-off-white p-3': disable
          })}
        >
          {!disable &&
            (Object.keys(receivers) as ReceiverType[]).map((key, index) => {
              return (
                <div
                  key={key}
                  onClick={() => {
                    if (disable) return;
                    let newSelect = [...selectReceivers!];
                    if (selectReceivers.includes(key)) {
                      newSelect = selectReceivers.filter((t) => t !== key);
                      form.setValue('receivers', newSelect.join(','));
                    } else {
                      newSelect = selectReceivers.concat(key);
                      form.setValue('receivers', newSelect.join(','));
                    }
                    setSelectReceivers(newSelect);

                    newSelect.length && form.trigger('receivers');
                  }}
                  className={cn(
                    `body-xs flex w-fit cursor-pointer  items-center justify-center gap-3 rounded-full border bg-neutral-white px-4 py-1.5 text-neutral-off-black`,
                    selectReceivers.includes(key)
                      ? 'border-yellow-extra-light bg-yellow-extra-light'
                      : 'border-neutral-light-gray'
                  )}
                >
                  <span>
                    <span>{receivers[key]}</span>
                    <span>{`(${countFetchError ? 'unknown' : receiversCount?.[key] || 0})`}</span>
                  </span>

                  {!selectReceivers.includes(key) && (
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.6693 8.49967C14.6693 8.86786 14.3708 9.16634 14.0026 9.16634H8.66927V14.4997C8.66927 14.8679 8.37079 15.1663 8.0026 15.1663C7.63441 15.1663 7.33594 14.8679 7.33594 14.4997V9.16634H2.0026C1.63441 9.16634 1.33594 8.86786 1.33594 8.49967C1.33594 8.13148 1.63441 7.83301 2.0026 7.83301H7.33594V2.49967C7.33594 2.13148 7.63441 1.83301 8.0026 1.83301C8.37079 1.83301 8.66927 2.13148 8.66927 2.49967V7.83301H14.0026C14.3708 7.83301 14.6693 8.13148 14.6693 8.49967Z"
                        fill="#131313"
                      />
                    </svg>
                  )}
                  {selectReceivers.includes(key) && (
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M14.472 14.0271C14.5982 14.1523 14.6692 14.3227 14.6692 14.5005C14.6692 14.6782 14.5982 14.8486 14.472 14.9738C14.3468 15.1 14.1764 15.171 13.9987 15.171C13.8209 15.171 13.6505 15.1 13.5253 14.9738L7.99866 9.44046L2.47199 14.9738C2.34681 15.1 2.17642 15.171 1.99866 15.171C1.8209 15.171 1.6505 15.1 1.52532 14.9738C1.39912 14.8486 1.32812 14.6782 1.32812 14.5005C1.32812 14.3227 1.39912 14.1523 1.52532 14.0271L7.05866 8.50046L1.52532 2.9738C1.35622 2.80469 1.29017 2.55822 1.35207 2.32721C1.41397 2.09621 1.5944 1.91578 1.82541 1.85388C2.05641 1.79198 2.30288 1.85803 2.47199 2.02713L7.99866 7.56046L13.5253 2.02713C13.7867 1.76572 14.2106 1.76572 14.472 2.02713C14.7334 2.28855 14.7334 2.71238 14.472 2.9738L8.93866 8.50046L14.472 14.0271Z"
                        fill="#FF624C"
                      />
                    </svg>
                  )}
                </div>
              );
            })}

          {disable &&
            (Object.keys(receivers) as ReceiverType[]).map((key, index) => {
              if (!selectReceivers.includes(key)) return null;
              return (
                <div
                  key={key}
                  className={cn(`body-s rounded-[.25rem] bg-neutral-light-gray px-2 py-1 text-neutral-rich-gray`)}
                >
                  <span>
                    <span>{receivers[key]}</span>
                    <span>{`(${countFetchError ? 'unknown' : receiversCount?.[key] || 0})`}</span>
                  </span>
                </div>
              );
            })}
        </div>

        <FormInput name={'receivers'} label="" placeholder="" form={form} className="hidden" />
      </div>
    );
  }

  function SendTime() {
    return (
      <>
        <FormField
          control={form.control}
          name="plannedTime"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <div className="flex items-center justify-between">
                <FormLabel>
                  <span className="body-m text-neutral-rich-gray">Send Time*</span>
                </FormLabel>
                <div className="flex items-center space-x-1">
                  <Checkbox
                    id={`send-now-optional`}
                    className="h-3.5 w-3.5 rounded-[2px] p-[1.5px]"
                    checked={sendNow}
                    onClick={(e) => e.stopPropagation()}
                    onCheckedChange={(v) => {
                      setSendNow(v as boolean);
                      if (!v) {
                        form.setValue('plannedTime', '');
                      } else {
                        form.setValue('plannedTime', dayjs().format('YYYY-MM-DDTHH:mm'));
                      }
                      form.trigger('plannedTime');
                    }}
                  />
                  <label
                    htmlFor={`send-now-optional`}
                    onClick={(e) => e.stopPropagation()}
                    className="select-none text-xs font-light text-neutral-medium-gray peer-data-[state=checked]:text-neutral-black"
                  >
                    Send the announcement right now
                  </label>
                </div>
              </div>
              <FormControl>
                <DatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </>
    );
  }

  function TimeZone() {
    return (
      <FormField
        control={form.control}
        name="timezone"
        disabled={disable}
        render={({ field }) => (
          <FormItem className="w-full space-y-1">
            <div className="flex items-center justify-between">
              <FormLabel>
                <span className="body-m text-neutral-rich-gray">Timezone*</span>
              </FormLabel>
            </div>
            <FormControl>
              <Timezone value={field.value} onValueChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  function Message() {
    return (
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem className="w-full space-y-1">
            <div className="flex items-center justify-between">
              <FormLabel>
                <span className="body-m text-neutral-rich-gray">Message sent to receivers*</span>
              </FormLabel>
              {/* <span className="caption-14pt text-neutral-rich-gray">
                  <span className={cn({ 'text-status-error': form.watch('description')?.length > 360 })}>
                    {form.watch('description')?.length}
                  </span>
                  /360
                </span> */}
            </div>
            <FormControl>
              <Textarea
                {...field}
                authHeight={false}
                autoComplete="off"
                placeholder="Write a brief description for your hackathon"
                className="hidden h-[76px] border-neutral-light-gray p-3 text-base text-neutral-black transition-colors placeholder:text-neutral-medium-gray focus:border-neutral-medium-gray focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark"
              />
            </FormControl>
            <TextEditor
              readOnly={disable}
              onCreated={(editor) => {
                const text = editor.getText().replace(/\n|\r/gm, '');
                text && setMessage(editor.getHtml());
                form.setValue('message', text);
                setTimeout(() => {
                  Object.values(form.getValues()).every((item) => !!item) && form.trigger();
                }, 300);
              }}
              // defaultContent={transformTextToEditorValue(initialValues?.info?.description)}
              // defaultContent={transformTextToEditorValue(announcement.message)}
              defaultHtml={mode === 'Create' ? 'Dear [%=username%],' : announcement.message}
              onChange={(editor) => {
                const text = editor.getText().replace(/\n|\r/gm, '');
                form.setValue('message', text);
                text && setMessage(editor.getHtml());
              }}
            />

            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  function Title() {
    return (
      <div className="flex h-fit w-full items-center justify-between gap-20">
        <div className="flex w-[calc(100%-200px)] gap-4">
          <span className="inline-block h-[2.125rem] w-[.3125rem] rounded-full bg-yellow-dark"></span>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="off"
                    placeholder="Unnamed Announcement"
                    className={cn(
                      'text-h3 h-[34px] w-full border-none border-neutral-light-gray p-3 font-next-book-bold text-[28px] font-bold text-neutral-black transition-colors placeholder:text-neutral-medium-gray focus:text-neutral-off-black focus-visible:ring-0 aria-[invalid=true]:border-status-error-dark',
                      {
                        'text-neutral-light-gray': !form.getValues('title')
                      }
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {announcement.id && (
          <div
            className="flex w-fit items-center gap-2"
            onClick={() =>
              onDelete(announcement, () => {
                setOpen(false);
                form.reset();
              })
            }
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.6693 1.33301H3.33594C2.23137 1.33301 1.33594 2.22844 1.33594 3.33301V4.66634C1.33594 5.03453 1.63441 5.33301 2.0026 5.33301H2.66927V12.6663C2.66927 13.7709 3.5647 14.6663 4.66927 14.6663H11.3359C12.4405 14.6663 13.3359 13.7709 13.3359 12.6663V5.33301H14.0026C14.3708 5.33301 14.6693 5.03453 14.6693 4.66634V3.33301C14.6693 2.22844 13.7738 1.33301 12.6693 1.33301ZM12.0029 12.6663C12.0029 13.0345 11.7045 13.333 11.3363 13.333H4.6696C4.30141 13.333 4.00293 13.0345 4.00293 12.6663V5.33301H12.0029V12.6663ZM2.66895 3.99935H13.3356V3.33268C13.3356 2.96449 13.0371 2.66602 12.6689 2.66602H3.33561C2.96742 2.66602 2.66895 2.96449 2.66895 3.33268V3.99935ZM5.33594 11.3327V7.33268C5.33594 6.96449 5.63441 6.66602 6.0026 6.66602C6.37079 6.66602 6.66927 6.96449 6.66927 7.33268V11.3327C6.66927 11.7009 6.37079 11.9993 6.0026 11.9993C5.63441 11.9993 5.33594 11.7009 5.33594 11.3327ZM9.33594 7.33268V11.3327C9.33594 11.7009 9.63441 11.9993 10.0026 11.9993C10.3708 11.9993 10.6693 11.7009 10.6693 11.3327V7.33268C10.6693 6.96449 10.3708 6.66602 10.0026 6.66602C9.63441 6.66602 9.33594 6.96449 9.33594 7.33268Z"
                fill="#8C8C8C"
              />
            </svg>

            <span className="body-m whitespace-nowrap text-neutral-medium-gray">Delete announcement</span>
          </div>
        )}
      </div>
    );
  }
};

export default AnnouncementCreateModal;
