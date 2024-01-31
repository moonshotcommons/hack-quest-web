import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import Modal from '@/components/Common/Modal';
import { errorMessage } from '@/helper/ui';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import { Form, message } from 'antd';
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState
} from 'react';
import { MdCancel } from 'react-icons/md';
import { ProfileContext } from '../../../constants/type';

interface BasicInfoModalProps {}

export interface BasicInfoModalRef {
  onEdit: (params: Record<string, any>) => void;
}

interface FormKeyValues {
  location: string;
  experience: number;
  techStack: string;
  nickname: string;
  email: string;
}

const TechStackItem = ({
  item,
  onRemove
}: {
  item: string;
  onRemove: (value: string) => void;
}) => {
  const [clearVisible, setClearVisible] = useState(false);
  return (
    <div
      className="px-[14px] py-[3px] rounded-[10px] border border-neutral-rich-gray bg-neutral-off-white relative overflow-hidden text-[16px] text-neutral-black leading-[160%] tracking-[0.32px]"
      onMouseEnter={() => setClearVisible(true)}
      onMouseLeave={() => setClearVisible(false)}
    >
      {item}
      {clearVisible && (
        <span
          className={`absolute w-full h-full top-0 left-0 bg-white flex items-center justify-center bg-opacity-90 cursor-pointer`}
          onClick={() => {
            onRemove(item);
          }}
        >
          <MdCancel color="#3E3E3E" size={20} />
        </span>
      )}
    </div>
  );
};

const BasicInfoModal = forwardRef<BasicInfoModalRef, BasicInfoModalProps>(
  (props, ref) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm<FormKeyValues>();
    const { profile, refresh } = useContext(ProfileContext);
    const [techStack, setTechStack] = useState(profile.techStack || []);

    useImperativeHandle(ref, () => {
      return {
        onEdit(params) {
          setOpen(true);
        }
      };
    });

    useEffect(() => {
      form.setFieldsValue({
        location: profile.location,
        experience: profile.experience || 0,
        techStack: '',
        nickname: profile.user?.nickname,
        email: profile.user?.email
      });

      setTechStack(profile.techStack || []);
    }, [profile]);

    const { run: onSubmit, loading } = useRequest(
      async () => {
        const values = await form.validateFields();
        const res = await webApi.userApi.editUserProfile({
          experience: Number(values.experience),
          location: values.location,
          techStack,
          nickname: values.nickname
        });
        return res;
      },
      {
        manual: true,
        onSuccess() {
          refresh();
          message.success('Update basic info success!');
          form.resetFields();
          setTechStack([]);
          setOpen(false);
        },
        onError(err: any) {
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
        <div className="w-[800px] bg-neutral-white rounded-[10px] px-[30px] py-[30px]">
          <div className="font-next-poster-Bold text-[28px] text-neutral-black tracking-[1.68px]">
            Basic Information
          </div>
          <Form className="mt-[30px]" form={form}>
            <div className="flex gap-[30px]">
              <Form.Item
                name="nickname"
                rules={[
                  { max: 16 },
                  {
                    pattern: /\S+/,
                    message: 'Username cannot be empty or contain only spaces'
                  }
                ]}
                className="flex-1"
              >
                <div
                  className="
                  [&>div]:gap-y-[5px]
              [&>div>.label]:text-neutral-medium-gray
              [&>div>.label]:leading-[160%]
              [&>div>.label]:text-[21px]
              [&>div>.label]:font-next-book
              [&>div>.label]:tracking-[0.42px]
              "
                >
                  <Input
                    name="nickname"
                    defaultValue={form.getFieldValue('nickname')}
                    label="User Name"
                    type="text"
                    className="py-[7px] px-[30px] text-[21px] font-next-book tracking-[0.063px] leading-[160%] border-neutral-medium-gray caret-gray-500"
                  ></Input>
                </div>
              </Form.Item>
              <Form.Item name="email" className="flex-1">
                <div
                  className="
              [&>div]:gap-y-[5px]
              [&>div>.label]:text-neutral-medium-gray
              [&>div>.label]:leading-[160%]
              [&>div>.label]:text-[21px]
              [&>div>.label]:font-next-book
              [&>div>.label]:tracking-[0.42px]
              "
                >
                  <Input
                    name="email"
                    label="Email"
                    type="text"
                    disabled
                    defaultValue={form.getFieldValue('email')}
                    className="py-[7px] px-[30px] text-[21px] font-next-book tracking-[0.063px] leading-[160%] border-neutral-medium-gray caret-gray-500 border-none hover:border-none cursor-not-allowed bg-[#DADADA] text-neutral-medium-gray"
                    onChange={(e) => {
                      let value: any = (e.target as HTMLInputElement).value;
                      if (Number(value) > 99) value = 99;
                      form.setFieldValue('experience', value);
                    }}
                    onBlur={(e) => {
                      let value: any = (e.target as HTMLInputElement).value;
                      if (Number(value) > 99) value = 99;
                      e.target.value = value;
                      form.setFieldValue('experience', value);
                    }}
                  ></Input>
                </div>
              </Form.Item>
            </div>
            <div className="flex gap-[30px]">
              <Form.Item name="location" rules={[{ max: 240 }]}>
                <div
                  className="
                  [&>div]:gap-y-[5px]
              [&>div>.label]:text-neutral-medium-gray
              [&>div>.label]:leading-[160%]
              [&>div>.label]:text-[21px]
              [&>div>.label]:font-next-book
              [&>div>.label]:tracking-[0.42px]
              "
                >
                  <Input
                    name="location"
                    defaultValue={form.getFieldValue('location')}
                    label="Location"
                    type="text"
                    className="w-[497px] py-[7px] px-[30px] text-[21px] font-next-book tracking-[0.063px] leading-[160%] border-neutral-medium-gray caret-gray-500"
                  ></Input>
                </div>
              </Form.Item>
              <Form.Item name="experience">
                <div
                  className="
              [&>div]:gap-y-[5px]
              [&>div>.label]:text-neutral-medium-gray
              [&>div>.label]:leading-[160%]
              [&>div>.label]:text-[21px]
              [&>div>.label]:font-next-book
              [&>div>.label]:tracking-[0.42px]
              flex gap-x-[16px]
              "
                >
                  <Input
                    name="experience"
                    label="Experience"
                    type="number"
                    min={0}
                    max={99}
                    defaultValue={form.getFieldValue('experience')}
                    className="py-[7px] px-[30px] text-[21px] font-next-book tracking-[0.063px] leading-[160%] border-neutral-medium-gray caret-gray-500"
                    onChange={(e) => {
                      let value: any = (e.target as HTMLInputElement).value;
                      if (Number(value) > 99) value = 99;
                      form.setFieldValue('experience', value);
                    }}
                    onBlur={(e) => {
                      let value: any = (e.target as HTMLInputElement).value;
                      if (Number(value) > 99) value = 99;
                      e.target.value = value;
                      form.setFieldValue('experience', value);
                    }}
                  ></Input>
                  <span className="mt-[46px] text-[21px] leading-[160%] text-neutral-black font-next-book tracking-[0.063px]">
                    Years
                  </span>
                </div>
              </Form.Item>
            </div>
            <Form.Item name="techStack">
              <div className="flex flex-col">
                <div
                  className="
              [&>div]:gap-y-[5px]
              [&>div>.label]:text-neutral-medium-gray
              [&>div>.label]:leading-[160%]
              [&>div>.label]:text-[21px]
              [&>div>.label]:font-next-book
              [&>div>.label]:tracking-[0.42px]
              "
                >
                  <Input
                    name="techStack"
                    label="Tech Stack"
                    placeholder="Python / JavaScript / C# / ..."
                    type="text"
                    className="py-[7px] px-[30px] pr-[106px] text-[21px] font-next-book tracking-[0.063px] font-next-book leading-[160%] border-neutral-medium-gray caret-gray-500"
                  ></Input>
                  <div className="absolute right-2 top-11">
                    <Button
                      type="primary"
                      className="py-2 px-6"
                      onClick={() => {
                        const value = form.getFieldValue('techStack');
                        if (!value) return;
                        console.log(value);
                        let values: string[] = value.trim().split('/');
                        values = values.filter((item: string) => {
                          if (!item.trim()) {
                            message.error(`The input cannot be empty!`);
                            return false;
                          }
                          if (!techStack.includes(item)) return true;
                          else {
                            message.error(
                              `${item} with the same name already exists!`
                            );
                            return false;
                          }
                        });

                        setTechStack(techStack.concat([...new Set(values)]));
                        form.resetFields(['techStack']);
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <div className="flex gap-[10px] text-neutral-black mt-[20px] flex-wrap">
                  {techStack.map((item, index) => {
                    return (
                      <TechStackItem
                        key={index}
                        item={item}
                        onRemove={(value) => {
                          setTechStack(
                            techStack.filter((item) => item !== value)
                          );
                        }}
                      ></TechStackItem>
                    );
                  })}
                </div>
              </div>
            </Form.Item>
          </Form>
          <div className="flex gap-x-[15px] font-next-book text-[16px] leading-[125%] tracking-[0.32px] text-neutral-black justify-center mt-[100px]">
            <Button
              ghost
              className="border-neutral-black py-[12px] w-[265px] flex items-center justify-center"
              onClick={() => {
                setOpen(false);
                form.resetFields();
                setTechStack([]);
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
  }
);

BasicInfoModal.displayName = 'BasicInfoModal';

export default BasicInfoModal;
