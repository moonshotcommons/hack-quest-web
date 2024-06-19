import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useMemo } from 'react';
import { HacakthonFaqType, HackathonType } from '@/service/webApi/resourceStation/type';
import Title from '../../Title';
import Button from '@/components/Common/Button';
import { HackathonEditContext, HackathonEditModalType } from '../../../constants/type';
import { v4 } from 'uuid';
import { useFieldArray, useForm } from 'react-hook-form';
import { faqsFormSchema } from '../../../constants/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { IoIosAddCircle } from 'react-icons/io';
import Edit from './Edit';

interface FAQsModalProp {
  hackathon: HackathonType;
}

export type FaqsFormData = {
  items: HacakthonFaqType[];
};
const FAQsModal: React.FC<FAQsModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { setModalType } = useContext(HackathonEditContext);
  const handleRemoveSection = () => {};

  const form = useForm<FaqsFormData>({
    resolver: zodResolver(faqsFormSchema),
    defaultValues: {
      items: hackathon.faqs || []
    }
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items'
  });
  const submitRequest = (val: FaqsFormData) => {
    console.info(val);
  };
  const cantSubmit = useMemo(() => {
    const items = form?.getValues()?.items;
    return items?.some((v) => !v.question || !v.answer) || !items?.length;
  }, [form.watch()]);

  return (
    <div className="">
      <div className="px-[40px]">
        <Title title="FAQs" />
      </div>
      <div className="scroll-wrap-y flex flex-1 flex-col gap-[24px] px-[40px]">
        <Form {...form}>
          <form className="flex h-full w-full flex-col gap-6">
            {fields.map((v, i) => (
              <Edit key={i} form={form} index={i} remove={remove} />
            ))}
          </form>
        </Form>
        <div
          className="h-[81px] flex-shrink-0  cursor-pointer rounded-[80px] bg-neutral-off-white p-[5px]"
          onClick={() =>
            append({
              question: '',
              answer: '',
              id: v4()
            })
          }
        >
          <div className="flex-center h-full w-full   rounded-[80px] border border-dashed border-neutral-light-gray text-neutral-medium-gray">
            <IoIosAddCircle size={32} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-[40px]">
        <span className="underline-m cursor-pointer text-neutral-off-black" onClick={handleRemoveSection}>
          {t('hackathonDetail.removeSection')}
        </span>
        <div className="flex gap-[16px]">
          <Button
            ghost
            className="h-[48px] w-[165px] uppercase"
            onClick={() => setModalType(HackathonEditModalType.NULL)}
          >
            {t('cancel')}
          </Button>
          <Button
            type="primary"
            disabled={cantSubmit}
            onClick={() => form.handleSubmit(submitRequest)}
            className={`h-[48px] w-[165px] uppercase ${cantSubmit && 'bg-neutral-light-gray text-neutral-medium-gray'}`}
          >
            {t('handleButtonText.save')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQsModal;
