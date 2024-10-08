import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import React, { useContext, useMemo, useState } from 'react';
import { HacakthonFaqType, HackathonType } from '@/service/webApi/resourceStation/type';
import Title from '../../Title';
import { HackathonEditContext } from '../../../../constants/type';
import { v4 } from 'uuid';
import { useFieldArray, useForm } from 'react-hook-form';
import { faqsFormArraySchema, FormValueType } from '../../../../constants/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { IoIosAddCircle } from 'react-icons/io';
import Edit from './Edit';
import CommonButton from '../CommonButton';
import { cloneDeep } from 'lodash-es';

interface FAQsModalProp {
  hackathon: HackathonType;
}

export type FaqsFormData = {
  items: HacakthonFaqType[];
};
const FAQsModal: React.FC<FAQsModalProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const { updateHackathon } = useContext(HackathonEditContext);

  const propFaqs = cloneDeep(hackathon.info?.sections?.faqs?.list) || [];

  const [faqs, setFaqs] = useState(propFaqs || []);

  const form = useForm<FormValueType>({
    resolver: zodResolver(faqsFormArraySchema),
    defaultValues: {
      items: propFaqs.map((v) => {
        return {
          ...v,
          answer: ''
        };
      })
    },
    criteriaMode: 'all'
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items'
  });

  const cantSubmit = useMemo(() => {
    const items = form?.getValues()?.items || [];
    return items?.some((v) => !v.question || !v.answer) || !items?.length;
  }, [form.watch()]);

  const handleSave = async () => {
    const isValid = await form.trigger();
    if (cantSubmit || !isValid) return;
    const list = form.getValues()?.items || [];
    updateHackathon({
      data: {
        faqs: {
          list: list.map((item, index) => {
            return {
              ...item,
              answer: faqs[index].answer
            };
          })
        }
      }
    });
  };

  // useEffect(() => {
  //   form.reset({
  //     items: hackathon.info?.sections?.faqs?.list || []
  //   });
  // }, [hackathon]);

  return (
    <div className="">
      <div className="px-[40px]">
        <Title title="FAQs" />
      </div>
      <div className="scroll-wrap-y flex flex-1 flex-col gap-[24px] px-[40px]">
        <Form {...form}>
          <form className="flex h-full w-full flex-col gap-6">
            {fields.map((v, i) => (
              <Edit
                key={v.id}
                // fields={fields}
                answer={faqs[i]?.answer || ''}
                setFaqs={(answer, index) => {
                  if (faqs[index]) {
                    (faqs[index] as any).answer = answer;
                  } else {
                    faqs[index] = {
                      question: '',
                      answer: answer as any,
                      id: v4()
                    };
                  }
                  setFaqs(structuredClone(faqs));
                }}
                form={form}
                index={i}
                remove={remove}
              />
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

      <CommonButton handleSave={handleSave} cantSubmit={cantSubmit} />
    </div>
  );
};

export default FAQsModal;
