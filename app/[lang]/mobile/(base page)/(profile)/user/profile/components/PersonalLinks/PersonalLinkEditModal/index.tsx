import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { Form, message } from 'antd';
import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import { ProfileContext } from '../../../constants/type';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { errorMessage } from '@/helper/ui';
import { getThirdPartyMedia, thirdPartyMedia } from '@/helper/thirdPartyMedia';
import ConnectIcon from './connect.svg';
import Image from 'next/image';

interface PersonalLinkEditModalProps {}

export interface PersonalLinkEditModalRef {
  onEdit: (params: Record<string, any>) => void;
}

interface FormKeyValues {
  x: string;
  github: string;
  linkedIn: string;
  telegram: string;
}

const PersonalLinkEditModal = forwardRef<PersonalLinkEditModalRef, PersonalLinkEditModalProps>((props, ref) => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<FormKeyValues>();
  const { profile, refresh } = useContext(ProfileContext);

  const [personLinks, setPersonLinks] = useState<Record<string, string>>({});

  useImperativeHandle(ref, () => {
    return {
      onEdit(params) {
        setOpen(true);
      }
    };
  });

  useEffect(() => {
    let newValues: Record<string, string> = {
      x: '',
      github: '',
      linkedIn: '',
      telegram: ''
    };
    Object.keys(profile?.personalLinks || {}).forEach((key: string) => {
      newValues[key] = profile?.personalLinks[key];
    });
    setPersonLinks(newValues);
    form.setFieldsValue(newValues);
  }, [profile.personalLinks]);

  const { run: onSubmit, loading } = useRequest(
    async () => {
      const values = await form.validateFields();
      const res = await webApi.userApi.updatePersonalLinks(values);
      return res;
    },
    {
      manual: true,
      onSuccess() {
        refresh();
        message.success('Update personal links success!');
        form.resetFields();
        setOpen(false);
      },
      onError(err: any) {
        // console.log(err);
        if (err.errorFields?.length) {
          err.errorFields.forEach((item: any) => {
            console.log(item?.errors?.[0]);
            item?.errors?.length && message.error(item?.errors?.[0]);
          });
        } else {
          errorMessage(err);
        }
      }
    }
  );

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      showCloseIcon
      icon={
        <div className="absolute -right-2 -top-2 cursor-pointer">
          <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="22.2734" y1="22.2745" x2="7.42416" y2="7.42521" stroke="#0B0B0B" />
            <line x1="7.42574" y1="22.2744" x2="22.275" y2="7.42513" stroke="#0B0B0B" />
          </svg>
        </div>
      }
      markBg="black"
    >
      <div className="w-[800px] rounded-[10px] bg-neutral-off-white px-[30px] py-[30px]">
        <div className="text-h3 text-[28px] text-neutral-black">Personal Links</div>
        <Form className="" form={form}>
          {Object.keys(personLinks).map((key, index) => {
            const media = getThirdPartyMedia(key as keyof typeof thirdPartyMedia);
            if (!media) return null;
            return (
              <Form.Item
                key={index}
                style={{ marginBottom: '0px' }}
                name={key}
                rules={[
                  {
                    type: 'url'
                  }
                ]}
              >
                <div className="relative flex items-center py-[20px] text-neutral-black after:absolute after:bottom-0 after:h-[1px] after:w-full after:scale-y-[0.5] after:bg-neutral-black">
                  <div className="flex h-full w-[25%] items-center gap-x-[15px]">
                    <span>{media.icon}</span>
                    <span className="body-l text-neutral-black">{media.name}</span>
                  </div>
                  <input
                    defaultValue={profile?.personalLinks?.[key] || ''}
                    type="url"
                    placeholder="Please enter personal link"
                    className="body-s h-[30px] flex-1  truncate bg-transparent text-neutral-medium-gray outline-none"
                  />
                  <div className="w-[64px]"></div>
                  <div
                    className="flex w-[64px] justify-end"
                    // onClick={() => {
                    //   console.log(`连接到${key}`);
                    // }}
                  >
                    <Image src={ConnectIcon} alt="connect.svg"></Image>
                  </div>
                </div>
              </Form.Item>
            );
          })}
        </Form>
        <div className="body-m mt-[30px] flex justify-center gap-x-[15px] text-neutral-black">
          <Button
            ghost
            className="flex w-[265px] items-center justify-center border-neutral-black py-[12px]"
            onClick={() => {
              setOpen(false);
              form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button
            className=" flex w-[265px] items-center justify-center py-[12px]"
            type="primary"
            loading={loading}
            disabled={loading}
            onClick={() => {
              onSubmit();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
});

PersonalLinkEditModal.displayName = 'PersonalLinkEditModal';

export default PersonalLinkEditModal;
