import Button from '@/components/v2/Common/Button';
import Input from '@/components/v2/Common/Input';
import Modal from '@/components/v2/Common/Modal';
import { Form } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';

interface BasicInfoModalProps {}

export interface BasicInfoModalRef {
  onEdit: (params: Record<string, any>) => void;
}

const BasicInfoModal = forwardRef<BasicInfoModalRef, BasicInfoModalProps>(
  (props, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        onEdit(params) {
          setOpen(true);
        }
      };
    });

    return (
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        showCloseIcon
        icon={
          <div className="absolute right-[30px] top-[30px] cursor-pointer">
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
            Basic Information
          </div>
          <Form className="mt-[30px]">
            <div className="flex gap-[30px]">
              <Form.Item>
                <div
                  className="
                  [&>div]:gap-y-[5px]
              [&>div>.label]:text-[#8C8C8C]
              [&>div>.label]:leading-[160%]
              [&>div>.label]:text-[21px]
              [&>div>.label]:font-next-book
              [&>div>.label]:tracking-[0.42px]
              "
                >
                  <Input
                    name="location"
                    label="Location"
                    type="text"
                    className="w-[497px] py-[7px] px-[30px] text-[21px] font-next-book tracking-[0.063px] leading-[160%] border-[#8C8C8C] caret-gray-500"
                  ></Input>
                </div>
              </Form.Item>
              <Form.Item>
                <div
                  className="
              [&>div]:gap-y-[5px]
              [&>div>.label]:text-[#8C8C8C]
              [&>div>.label]:leading-[160%]
              [&>div>.label]:text-[21px]
              [&>div>.label]:font-next-book
              [&>div>.label]:tracking-[0.42px]
              flex gap-x-[16px]
              "
                >
                  <Input
                    name="location"
                    label="Experience"
                    type="text"
                    className="py-[7px] px-[30px] text-[21px] font-next-book tracking-[0.063px] leading-[160%] border-[#8C8C8C] caret-gray-500"
                  ></Input>
                  <span className="mt-[46px] text-[21px] leading-[160%] text-black font-next-book tracking-[0.063px]">
                    Years
                  </span>
                </div>
              </Form.Item>
            </div>
            <Form.Item>
              <div
                className="
              [&>div]:gap-y-[5px]
              [&>div>.label]:text-[#8C8C8C]
              [&>div>.label]:leading-[160%]
              [&>div>.label]:text-[21px]
              [&>div>.label]:font-next-book
              [&>div>.label]:tracking-[0.42px]
              "
              >
                <Input
                  name="location"
                  label="Tech Stack"
                  placeholder="Python / JavaScript / C# / ..."
                  type="text"
                  className="py-[7px] px-[30px] text-[21px] font-next-book tracking-[0.063px] leading-[160%] border-[#8C8C8C] caret-gray-500"
                ></Input>
              </div>
            </Form.Item>
          </Form>
          <div className="flex gap-x-[15px] font-next-book text-[16px] leading-[125%] tracking-[0.32px] text-[#0B0B0B] justify-center mt-[100px]">
            <Button
              ghost
              className="border-[#0B0B0B] py-[12px] w-[265px] flex items-center justify-center"
            >
              Cancel
            </Button>
            <Button
              className=" py-[12px] w-[265px] flex items-center justify-center"
              type="primary"
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
