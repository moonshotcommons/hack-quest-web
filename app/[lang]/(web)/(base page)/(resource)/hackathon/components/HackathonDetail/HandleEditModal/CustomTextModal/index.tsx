import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { customTextFormSchema } from '../../../../constants/data';
import { HackathonEditContext, HackathonEditModalType } from '../../../../constants/type';
import EditTitle from '../EditTitle';
import { cloneDeep } from 'lodash-es';
import { TEXT_EDITOR_TYPE, transformTextToEditorValue } from '@/components/Common/TextEditor';
import { Input } from '@/components/ui/input';
import CommonButton from '../CommonButton';
import { v4 } from 'uuid';

import dynamic from 'next/dynamic';
const TextEditor = dynamic(() => import('@/components/Common/TextEditor'), {
  ssr: false,
  loading: () => <p>Loading ...</p>
});

interface CustomTextModalProp {}

const CustomTextModal: React.FC<CustomTextModalProp> = () => {
  const { updateHackathon, editCustomInfo, modalEditType } = useContext(HackathonEditContext);
  const [title, setTitle] = useState('');
  const defaultValues: z.infer<typeof customTextFormSchema> = cloneDeep({
    text: editCustomInfo?.text || ''
  });
  const form = useForm<z.infer<typeof customTextFormSchema>>({
    resolver: zodResolver(customTextFormSchema),
    defaultValues: defaultValues
  });
  const formState = useFormState(form);
  const [text, setText] = useState<{ type: string; content: object }>();

  const cantSubmit = useMemo(() => {
    const text = form.getValues().text;
    return !text;
  }, [form.watch()]);

  const handleSave = () => {
    if (cantSubmit) return;
    updateHackathon({
      data: {
        id: modalEditType === 'add' ? v4() : (editCustomInfo?.id as string),
        title: title,
        type: HackathonEditModalType.CUSTOM_TEXT,
        text
      },
      status: 'customize'
    });
  };
  useEffect(() => {
    setTitle(modalEditType === 'add' ? 'Unnamed Section' : editCustomInfo?.title || 'Unnamed Section');
  }, [editCustomInfo, modalEditType]);
  return (
    <div>
      <div className="px-[40px]">
        <EditTitle title={title} changeTitle={setTitle} />
      </div>
      <div className="scroll-wrap-y flex flex-1 flex-col gap-[24px] px-[40px]">
        <Form {...form}>
          <form className="flex h-full w-full flex-col gap-6">
            <div className="flex  flex-col gap-4 text-left">
              <FormField
                control={form.control}
                name={'text'}
                render={({ field }) => (
                  <FormItem className="w-full text-left">
                    <div className="flex w-full justify-between">
                      <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
                        {'Please enter the text information below*'}
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Input {...field} className="hidden" />
                    </FormControl>
                    <TextEditor
                      simpleModel
                      onCreated={(editor) => {
                        const text = editor.getText().replace(/\n|\r/gm, '');
                        setText({ type: TEXT_EDITOR_TYPE, content: editor.children });
                        form.setValue('text', text);
                      }}
                      defaultContent={transformTextToEditorValue(editCustomInfo?.text)}
                      onChange={(editor) => {
                        const text = editor.getText().replace(/\n|\r/gm, '');
                        setText({ type: TEXT_EDITOR_TYPE, content: editor.children });
                        form.setValue('text', text);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
      <CommonButton title={title} handleSave={handleSave} cantSubmit={cantSubmit} />
    </div>
  );
};

export default CustomTextModal;
