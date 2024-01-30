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
import {
  ThirdPartyMediaType,
  getThirdPartyMedia,
  thirdPartyMedia
} from '@/helper/thirdPartyMedia';
import ConnectIcon from './connect.svg';
import Image from 'next/image';
import { useRedirect } from '@/hooks/useRedirect';

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
  const { redirectToUrl } = useRedirect();
  const [personLinks, setPersonLinks] = useState<Record<string, string>>({});
  const [confirmInfo, setConfirmInfo] = useState<{
    key: ThirdPartyMediaType;
    show: boolean;
  }>();

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
      telegram: '',
      discord: ''
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

  const { run: connectMedia, loading: connectLoading } = useRequest(
    async (key: ThirdPartyMediaType) => {
      switch (key) {
        case 'x':
        case 'github':
        case 'linkedIn':
        case 'telegram':
        case 'discord': {
          const res = await webApi.userApi.getConnectUrlByDiscord();
          window.open(
            res.url,
            '_blank',
            'width=500,height=500,toolbar=no,menubar=no,location=no,status=no'
          );
          return res;
        }
      }
    },
    {
      manual: true
    }
  );

  const { data: discordInfo, refresh: refreshDiscordInfo } = useRequest(() => {
    return webApi.userApi.getDiscordInfo();
  });

  const { runAsync: disconnect, loading: disconnectLoading } = useRequest(
    (key: ThirdPartyMediaType) => {
      return webApi.userApi.disconnect(key);
    },
    { manual: true }
  );

  const renderDiscordHandle = (key: ThirdPartyMediaType) => {
    if (discordInfo?.isConnect) {
      return (
        <div
          className="w-[64px] flex justify-end cursor-pointer"
          onClick={() => setConfirmInfo({ key, show: true })}
        >
          <Image src={ConnectIcon} alt="connect.svg"></Image>
        </div>
      );
    }

    return (
      <Button
        ghost
        onClick={() => {
          connectMedia(key);
        }}
        loading={connectLoading}
        disabled={connectLoading}
        className="font-next-book leading-[125%] px-4 py-2 border-neutral-black"
      >{`Connect with ${key}`}</Button>
    );
  };

  useEffect(() => {
    const refreshLinks = (e: StorageEvent) => {
      if (e.key === 'linkDiscord') {
        refresh();
      }
    };
    window.addEventListener('storage', refreshLinks);
    return () => {
      window.removeEventListener('storage', refreshLinks);
      window.localStorage.removeItem('linkDiscord');
    };
  }, []);

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
        setTimeout(() => setConfirmInfo(undefined), 500);
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
      <div className="w-[800px] bg-neutral-white  rounded-[10px] px-[30px] py-[30px]">
        <div className="font-next-poster-Bold text-[28px] text-black tracking-[1.68px] flex gap-4 items-center">
          {confirmInfo?.show && (
            <svg
              width="10"
              height="20"
              viewBox="0 0 10 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer"
              onClick={() => setConfirmInfo(undefined)}
            >
              <path
                d="M9.35419 17.6449C9.68783 18.0248 9.65092 18.603 9.27169 18.9374C8.89182 19.271 8.31355 19.2341 7.97919 18.8549L0.645853 10.6049C0.341844 10.2589 0.341844 9.74096 0.645853 9.39491L7.97919 1.14491C8.1906 0.88243 8.529 0.757134 8.86037 0.81864C9.19174 0.880146 9.46264 1.11853 9.56577 1.4394C9.66891 1.76026 9.58766 2.11184 9.35419 2.35491L2.56169 9.99991L9.35419 17.6449Z"
                fill="#231F20"
              />
            </svg>
          )}
          <span>Personal Links</span>
        </div>

        <div className="relative">
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
                      disabled={key === ThirdPartyMediaType.DISCORD}
                      placeholder="Please enter personal link"
                      className="flex-1 h-[30px] truncate text-[14px] font-next-book text-[#8C8C8C] leading-[160%] -tracking-[0.154px] outline-none bg-transparent"
                    />
                    <div className="w-[64px]"></div>
                    {key === ThirdPartyMediaType.DISCORD &&
                      renderDiscordHandle(key)}
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
          {confirmInfo?.show && (
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-neutral-white">
              <p className="mt-[7.875rem] text-center body-l font-Nunito text-neutral-black">
                Do you want to disconnect from {confirmInfo.key}?
              </p>
              <div className="flex justify-center items-center gap-[14px] mt-[45px]">
                <Button
                  className="w-[265px] py-4 button-text-m uppercase border-neutral-black"
                  ghost
                  onClick={() => setConfirmInfo(undefined)}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  loading={disconnectLoading}
                  disabled={disconnectLoading}
                  className="w-[265px] py-4 button-text-m uppercase"
                  onClick={async () => {
                    try {
                      await disconnect(confirmInfo.key);
                      refreshDiscordInfo();
                      refresh();
                      message.success('Disconnect successfully!');
                    } catch (e) {
                      errorMessage(e);
                    }
                    setConfirmInfo(undefined);
                  }}
                >
                  disconnect
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
});

PersonalLinkEditModal.displayName = 'PersonalLinkEditModal';

export default PersonalLinkEditModal;
