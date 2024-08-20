import Modal from '@/components/Common/Modal';
import React from 'react';
import { FiX } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { sourceFormSchema, sourceDefaultValues } from '../../../../../constants/data';
import { cloneDeep } from 'lodash-es';
import { SimpleHackathonInfo } from '@/service/webApi/resourceStation/type';
import Button from '@/components/Common/Button';
import { Trash2 } from 'lucide-react';

interface SourceModalProp {
  open: boolean;
  onClose: () => void;
  handleSubmit: () => void;
  handleDelete: () => void;
  hackathon: SimpleHackathonInfo;
}

const SourceModal: React.FC<SourceModalProp> = ({ open, onClose, handleSubmit, handleDelete, hackathon }) => {
  const defaultValues: z.infer<typeof sourceFormSchema> = cloneDeep({
    id: '',
    ...sourceDefaultValues
  });

  const form = useForm<z.infer<typeof sourceFormSchema>>({
    resolver: zodResolver(sourceFormSchema),
    defaultValues: defaultValues
  });
  const isEdit = true;
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
                  className="mt-[4px] h-[50px] w-[50px] rounded-[8px]"
                  style={{
                    backgroundColor: '#E0E0E0'
                  }}
                ></div>
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
              <div className="flex items-center gap-[10px]">
                <span className="flex-shrink-0">{`www.hackquest.com/hackathon/${hackathon.alias}/`}</span>
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
            <Button type="primary" className="h-[48px] w-[240px]">
              Save
            </Button>
          </div>
          <div
            className="body-m absolute right-0 flex h-full cursor-pointer items-center gap-[4px] text-neutral-rich-gray"
            onClick={handleDelete}
          >
            <Trash2 size={16} />
            <span>Detelte</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SourceModal;
