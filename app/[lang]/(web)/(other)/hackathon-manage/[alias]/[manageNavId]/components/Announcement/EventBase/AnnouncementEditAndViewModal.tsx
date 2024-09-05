import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { useMutation, useQuery } from '@tanstack/react-query';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { AnnouncementEvent, TimelineStatus, Type2Title } from './constants';
import { TitleEnum, UpdateAnnouncementTemplateDto } from '@/service/webApi/hackathon/types';
import { errorMessage } from '@/helper/ui';
import { useHackathonManageStore } from '@/store/zustand/hackathonManageStore';

interface AnnouncementEditProps {
  title: AnnouncementEvent;
  queryParams: string;
  itemTimelineStatus: TimelineStatus;
  disable: boolean;
  isEdit: boolean;
}

interface AnnouncementEditItemProps {
  subTitle: TitleEnum;
  itemTimelineStatus: TimelineStatus;
  receiversCount: number;
  children: React.ReactElement;
}

const TextEditor = dynamic(() => import('@/components/Common/TextEditor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

const AnnouncementEditAndViewModal: React.FC<AnnouncementEditProps> = (props) => {
  const { title, queryParams, itemTimelineStatus, disable, isEdit } = props;
  const hackathon = useHackathonManageStore((state) => state.hackathon);

  const [open, setOpen] = useState(false);
  const templateRef = useRef<Map<number, string>>(new Map());
  const { data: templates } = useQuery({
    queryKey: ['announcement-template', hackathon.id, queryParams],
    queryFn: () => webApi.hackathonV2Api.getAnnouncementTemplate(hackathon.id, queryParams)
  });

  const {
    mutateAsync: updateAnnouncementTemplateAsync,
    mutate: updateAnnouncementTemplate,
    isPending: updateTemplateLoading
  } = useMutation({
    mutationFn: (data: Array<UpdateAnnouncementTemplateDto>) => webApi.hackathonV2Api.updateAnnouncementTemplate(data),
    onError(error, variables, context) {
      errorMessage(error);
    },
    onSuccess(data, variables, context) {
      setOpen(false);
    }
  });

  const onSave = () => {
    const templateObj = Object.fromEntries(templateRef.current);
    const updateTemplateArr: Array<UpdateAnnouncementTemplateDto> = Object.keys(templateObj).map((key) => {
      return {
        id: Number(key),
        content: templateObj[key]
      };
    });

    updateAnnouncementTemplateAsync(updateTemplateArr);
  };

  const onClose = () => {
    setOpen(false);
  };

  function Title(title: string) {
    return (
      <div className="flex items-center gap-2">
        <span className="inline-block h-[2.125rem] w-[.3125rem] rounded-full bg-yellow-dark"></span>
        <span className="headline-h3 text-neutral-black">{title}</span>
      </div>
    );
  }

  function computedBtn(isEdit: boolean, onSave: () => void, onClose: () => void) {
    const CloseBtn = () => {
      return (
        <Button
          ghost
          className="button-text-m mr-5 w-[15rem] px-0 py-4 uppercase"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          close
        </Button>
      );
    };

    const SaveAndCloseBtn = () => {
      return (
        <>
          <Button
            ghost
            className="button-text-m mr-5 w-[15rem] px-0 py-4 uppercase"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            close
          </Button>
          <Button
            ghost
            className="button-text-m w-[15rem] border-none bg-yellow-primary px-0 py-4 uppercase"
            onClick={(e) => {
              e.preventDefault();
              onSave();
            }}
          >
            save
          </Button>
        </>
      );
    };

    // switch (phase) {
    //   case PhaseEnum.REGISTRATION_SUBMISSION:
    //     return {
    //       [AnnouncementEvent.Registration]: (
    //         <>
    //           <SaveAndCloseBtn />
    //         </>
    //       ),
    //       [AnnouncementEvent.Submission]: (
    //         <>
    //           <SaveAndCloseBtn />
    //         </>
    //       ),
    //       [AnnouncementEvent.Voting]: (
    //         <>
    //           <CloseBtn />
    //         </>
    //       ),
    //       [AnnouncementEvent.Reward]: (
    //         <>
    //           <SaveAndCloseBtn />
    //         </>
    //       )
    //     };
    //   case PhaseEnum.VOTING:
    //     return {
    //       [AnnouncementEvent.Registration]: (
    //         <>
    //           <CloseBtn />
    //         </>
    //       ),
    //       [AnnouncementEvent.Submission]: (
    //         <>
    //           <CloseBtn />
    //         </>
    //       ),
    //       [AnnouncementEvent.Voting]: (
    //         <>
    //           <SaveAndCloseBtn />
    //         </>
    //       ),
    //       [AnnouncementEvent.Reward]: (
    //         <>
    //           <SaveAndCloseBtn />
    //         </>
    //       )
    //     };
    //   case PhaseEnum.BEFORE_WINNER:
    //     return {
    //       [AnnouncementEvent.Registration]: (
    //         <>
    //           <CloseBtn />
    //         </>
    //       ),
    //       [AnnouncementEvent.Submission]: (
    //         <>
    //           <CloseBtn />
    //         </>
    //       ),
    //       [AnnouncementEvent.Voting]: (
    //         <>
    //           <CloseBtn />
    //         </>
    //       ),
    //       [AnnouncementEvent.Reward]: (
    //         <>
    //           <SaveAndCloseBtn />
    //         </>
    //       )
    //     };
    //   case PhaseEnum.AFTER_WINNER:
    //     return {
    //       [AnnouncementEvent.Registration]: (
    //         <>
    //           <CloseBtn />
    //         </>
    //       ),
    //       [AnnouncementEvent.Submission]: (
    //         <>
    //           <CloseBtn />
    //         </>
    //       ),
    //       [AnnouncementEvent.Voting]: (
    //         <>
    //           <CloseBtn />
    //         </>
    //       ),
    //       [AnnouncementEvent.Reward]: (
    //         <>
    //           <CloseBtn />
    //         </>
    //       )
    //     };
    // }

    if (isEdit) {
      return <SaveAndCloseBtn />;
    }

    return <CloseBtn />;
  }

  return (
    <>
      <Button
        className={cn('button-text-s h-[2.125rem] ', {
          'bg-yellow-primary': isEdit,
          'border border-neutral-light-gray bg-neutral-off-white': !isEdit
        })}
        block
        onClick={() => {
          setOpen(true);
        }}
      >
        {isEdit ? 'edit' : 'view details'}
      </Button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        showCloseIcon
        icon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {}}
          >
            <path
              d="M21.708 20.2902C21.8973 20.478 22.0038 20.7336 22.0038 21.0002C22.0038 21.2668 21.8973 21.5224 21.708 21.7102C21.5202 21.8995 21.2646 22.006 20.998 22.006C20.7313 22.006 20.4758 21.8995 20.288 21.7102L11.998 13.4102L3.70799 21.7102C3.52022 21.8995 3.26462 22.006 2.99799 22.006C2.73135 22.006 2.47575 21.8995 2.28799 21.7102C2.09867 21.5224 1.99219 21.2668 1.99219 21.0002C1.99219 20.7336 2.09867 20.478 2.28799 20.2902L10.588 12.0002L2.28799 3.71021C2.03433 3.45655 1.93526 3.08683 2.02811 2.74033C2.12095 2.39383 2.3916 2.12318 2.73811 2.03033C3.08461 1.93748 3.45433 2.03655 3.70799 2.29021L11.998 10.5902L20.288 2.29021C20.6801 1.89809 21.3159 1.89809 21.708 2.29021C22.1001 2.68233 22.1001 3.31809 21.708 3.71021L13.408 12.0002L21.708 20.2902Z"
              fill="#231F20"
            />
          </svg>
        }
      >
        <div className="flex max-h-[calc(100vh-80px)] w-[55.5rem] flex-col gap-6 overflow-hidden  rounded-2xl bg-neutral-white p-10 pt-[3.75rem]">
          <div>{Title(title)}</div>
          <div className="overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            {templates?.map((template, index) => (
              <div key={template.id}>
                <AnnouncementEditItem
                  subTitle={template.templateType}
                  itemTimelineStatus={itemTimelineStatus}
                  receiversCount={template.receiversCount}
                >
                  <TextEditor
                    onCreated={(editor) => {
                      templateRef.current.set(template.id, editor.getHtml());
                    }}
                    onChange={(editor) => {
                      templateRef.current.set(template.id, editor.getHtml());
                    }}
                    defaultHtml={template.content}
                    readOnly={disable}
                  />
                </AnnouncementEditItem>
                {templates.length !== index && <hr className="my-6 gap-6 bg-neutral-light-gray" />}
              </div>
            ))}
          </div>
          {/* 对应不同阶段不同类型的Btn */}
          <div className="flex justify-center pt-6">{computedBtn(isEdit, onSave, onClose)}</div>
        </div>
      </Modal>
    </>
  );
};

const AnnouncementEditItem = (props: AnnouncementEditItemProps) => {
  const { subTitle, itemTimelineStatus, receiversCount, children } = props;
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex">
          <p className="body-l-bold mr-[8px] text-neutral-off-black">{Type2Title.get(subTitle)}</p>
          <span
            className={cn(
              'caption-12pt flex w-20 items-center justify-center rounded border py-1 text-neutral-rich-gray',
              {
                'border-yellow-dark bg-yellow-extra-light': itemTimelineStatus === TimelineStatus.ACTIVE,
                'border-neutral-medium-gray bg-neutral-white': itemTimelineStatus === TimelineStatus.UPCOMING,
                'border-neutral-light-gray bg-neutral-light-gray': itemTimelineStatus === TimelineStatus.END
              }
            )}
          >
            {itemTimelineStatus}
          </span>
        </div>

        <div className="flex items-center">
          <p className="body-s mr-[4px] text-neutral-rich-gray">Receivers</p>
          <span
            className={cn(
              'caption-12pt flex w-20 items-center justify-center rounded border-0 bg-neutral-off-white py-1 text-neutral-rich-gray'
            )}
          >
            {receiversCount}
          </span>
        </div>
      </div>
      <div className="mb-[4px] mt-[8px] flex justify-between">
        <p className="body-s text-neutral-rich-gray">
          Message sent to applicants when their applications are approved*
        </p>
        {/* <p className="caption-12pt text-neutral-rich-gray">340/360</p> */}
      </div>
      {children}
    </div>
  );
};

export default AnnouncementEditAndViewModal;
