import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { Form, message } from 'antd';
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
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

const PersonalLinkEditModal = forwardRef<
  PersonalLinkEditModalRef,
  PersonalLinkEditModalProps
>((props, ref) => {
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
        <div className="absolute -top-2 -right-2 cursor-pointer">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="22.2734"
              y1="22.2745"
              x2="7.42416"
              y2="7.42521"
              stroke="#0B0B0B"
            />
            <line
              x1="7.42574"
              y1="22.2744"
              x2="22.275"
              y2="7.42513"
              stroke="#0B0B0B"
            />
          </svg>
        </div>
      }
      markBg="black"
    >
      <div className="w-[800px] bg-[#F4F4F4] rounded-[10px] px-[30px] py-[30px]">
        <div className="font-next-poster-Bold text-[28px] text-black tracking-[1.68px]">
          Personal Links
        </div>
        <Form className="" form={form}>
          {Object.keys(personLinks).map((key, index) => {
            const media = getThirdPartyMedia(
              key as keyof typeof thirdPartyMedia
            );
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
                <div className="text-black relative flex items-center py-[20px] after:absolute after:h-[1px] after:scale-y-[0.5] after:w-full after:bg-black after:bottom-0">
                  <div className="flex gap-x-[15px] items-center h-full w-[25%]">
                    <span>{media.icon}</span>
                    <span className="text-[18px] text-[#0B0B0B] font-next-book leading-[160%] tracking-[0.36px]">
                      {media.name}
                    </span>
                  </div>
                  <input
                    defaultValue={profile?.personalLinks?.[key] || ''}
                    type="url"
                    placeholder="Please enter personal link"
                    className="flex-1 h-[30px] truncate text-[14px] font-next-book text-[#8C8C8C] leading-[160%] -tracking-[0.154px] outline-none bg-transparent"
                  />
                  <div className="w-[64px]"></div>
                  <div
                    className="w-[64px] flex justify-end"
                    onClick={() => {
                      console.log(`连接到${key}`);
                    }}
                  >
                    <Image src={ConnectIcon} alt="connect.svg"></Image>
                  </div>
                </div>
              </Form.Item>
            );
          })}
        </Form>
        <div className="flex gap-x-[15px] font-next-book text-[16px] leading-[125%] tracking-[0.32px] text-[#0B0B0B] justify-center mt-[30px]">
          <Button
            ghost
            className="border-[#0B0B0B] py-[12px] w-[265px] flex items-center justify-center"
            onClick={() => {
              setOpen(false);
              form.resetFields();
            }}
          >
            Cancel
          </Button>
          <Button
            className=" py-[12px] w-[265px] flex items-center justify-center"
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
