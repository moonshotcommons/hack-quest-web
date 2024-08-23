import Modal from '@/components/Common/Modal';
import React, { useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { sourceFormSchema, sourceDefaultValues } from '../../../../../constants/data';
import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import Button from '@/components/Common/Button';
import { Trash2 } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

interface SourceModalProp {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
  handleDelete: () => void;
  hackathon: SimpleHackathonInfo;
}

const SourceModal: React.FC<SourceModalProp> = ({ open, onClose, handleSubmit, handleDelete, hackathon }) => {
  const form = useForm<z.infer<typeof sourceFormSchema>>({
    resolver: zodResolver(sourceFormSchema),
    defaultValues: {
      id: '111',
      ...sourceDefaultValues
    }
  });
  const isEdit = true;
  const timer = useRef<NodeJS.Timeout | null>(null);
  const isCanBlur = useRef(true);

  const [sketchDisable, setSketchDisable] = useState(false);
  const [color, setColor] = useState('#F9D81C');
  const onChangeColor = (color: string) => {
    setColor(color);
  };
  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;
    console.info(form.getValues());
  };
  return (
    <Modal open={open} onClose={() => {}} showCloseIcon={true} icon={<FiX size={26} onClick={onClose} />}>
      <div className="flex w-[888px] flex-col gap-[24px] rounded-[16px] bg-neutral-white p-[60px_40px_40px]">
        <div className={'text-h3 relative pl-[21px] leading-[34px] text-neutral-black'}>
          <span className=" ">{isEdit ? `Edit UTM Source` : `Add A UTM Source To Start`}</span>
          <span className="absolute left-0 top-0 h-full w-[5px] rounded-[100px] bg-yellow-dark"></span>
        </div>
        <Form {...form}>
          <form className="body-m flex flex-col gap-[24px] text-neutral-rich-gray">
            <div className="flex gap-[24px]">
              <div className="flex-shrink-0">
                <span>Legend Color*</span>
                <div
                  className="relative mt-[4px] h-[50px] w-[50px] cursor-pointer  rounded-[8px]"
                  onClick={() => {
                    setSketchDisable(true);
                  }}
                  style={{
                    backgroundColor: color
                  }}
                  tabIndex={1}
                  onBlur={() => {
                    setTimeout(() => {
                      if (!isCanBlur.current) return;
                      setSketchDisable(false);
                    }, 100);
                  }}
                >
                  <div
                    className={`absolute left-[52px] top-[-20px] ${sketchDisable ? 'block' : 'hidden'}`}
                    onClick={() => {
                      isCanBlur.current = false;
                      if (timer.current) clearTimeout(timer.current);
                      timer.current = setTimeout(() => {
                        isCanBlur.current = true;
                      }, 400);
                    }}
                  >
                    <HexColorPicker color={color} onChange={onChangeColor} />
                  </div>
                </div>
              </div>
              <FormField
                control={form.control}
                name={'name'}
                render={({ field }) => (
                  <FormItem className="flex-1 text-left">
                    <div className="flex w-full justify-between">
                      <FormLabel className="body-m  text-neutral-rich-gray">{'Source Name*'}</FormLabel>
                      <span className="caption-14pt text-neutral-rich-gray">
                        <span className={form.watch('name').length > 80 ? 'text-status-error' : ''}>
                          {form.watch('name').length}
                        </span>
                        /80
                      </span>
                    </div>
                    <FormControl>
                      <Input placeholder={'Enter Source name'} className="body-m h-[50px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <div className="flex w-full justify-between">
                <FormLabel className="body-m  text-neutral-rich-gray">{'Custom UTM URL*'}</FormLabel>
                <span className="caption-14pt text-neutral-rich-gray">
                  <span className={form.watch('url').length > 80 ? 'text-status-error' : ''}>
                    {form.watch('url').length}
                  </span>
                  /80
                </span>
              </div>
              <div className="flex  gap-[10px]">
                <span className="flex h-[50px] flex-shrink-0 items-center">{`www.hackquest.com/hackathon/${hackathon.alias}/`}</span>
                <FormField
                  control={form.control}
                  name={'url'}
                  render={({ field }) => (
                    <FormItem className="flex-1 text-left">
                      <FormControl>
                        <Input placeholder={'Enter UTM Url'} className="body-m h-[50px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
        <div className="relative mt-[20px] flex justify-center">
          <div className="flex gap-[16px]">
            <Button ghost className="h-[48px] w-[240px]" onClick={onClose}>
              Cancel
            </Button>
            <Button type="primary" className="h-[48px] w-[240px]" onClick={onSubmit}>
              Save
            </Button>
          </div>
          <div
            className="body-m absolute right-0 flex h-full cursor-pointer items-center gap-[4px] text-neutral-rich-gray"
            onClick={handleDelete}
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SourceModal;
