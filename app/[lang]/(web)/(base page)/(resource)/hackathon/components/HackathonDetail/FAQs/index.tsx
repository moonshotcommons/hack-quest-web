import React, { useContext, useEffect, useRef, useState } from 'react';
import { HacakthonFaqType, HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { IoAdd, IoRemoveOutline } from 'react-icons/io5';
import { HackathonEditModalType } from '../../../constants/type';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import RemoveSectionModal, { RemoveSectionModalRef } from '../RemoveSectionModal';
import { cloneDeep } from 'lodash-es';

interface FAQsProp {
  hackathon: HackathonType;
}

type FaqType = HacakthonFaqType & {
  isExpand: boolean;
};

const FAQs: React.FC<FAQsProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [expandIndexs, setExpandIndexs] = useState<number[]>([]);
  const removeSectionRef = useRef<RemoveSectionModalRef>(null);
  const [isExpandAll, setIsExpandAll] = useState(false);
  const [faqs, setFaqs] = useState<FaqType[]>([]);
  const handleExpand = (i: number) => {
    const newList = cloneDeep(faqs);
    newList[i].isExpand = !newList[i].isExpand;
    setFaqs(newList);
    setIsExpandAll(newList.some((v) => v.isExpand));
  };
  const handleExpandAll = () => {
    const isAll = !isExpandAll;
    const newList = faqs.map((v) => ({
      ...v,
      isExpand: isAll
    }));
    setIsExpandAll(isAll);
    setFaqs(newList);
  };
  useEffect(() => {
    const newList =
      hackathon.info?.sections?.faqs?.list?.map((v) => ({
        ...v,
        isExpand: false
      })) || [];
    setFaqs(newList);
  }, [hackathon]);
  if (!hackathon.info?.sections?.faqs?.list?.length) return;
  return (
    <EditBox
      title={'FAQs'}
      className="rounded-[0] border-none bg-transparent p-0"
      type={HackathonEditModalType.FAQS}
      handleDelete={() => removeSectionRef.current?.open()}
      isExpandAll={isExpandAll}
      handleExpandAll={handleExpandAll}
    >
      <div className="body-s text-neutral-rich-gray">
        {faqs?.map((v, i) => (
          <div
            key={i}
            className={`border-t ${!i ? 'border-transparent pb-[20px] pt-[0]' : 'border-neutral-medium-gray py-[20px]'}`}
          >
            <div className="body-l-bold flex cursor-pointer items-center gap-[30px]" onClick={() => handleExpand(i)}>
              <p className="flex-1 ">{v.question}</p>
              <div className="flex-shrink-0">{v.isExpand ? <IoRemoveOutline size={28} /> : <IoAdd size={28} />}</div>
            </div>
            <div className={`whitespace-pre-line pt-[20px] ${v.isExpand ? 'block' : 'hidden'}`}>{v.answer}</div>
          </div>
        ))}
      </div>
      <RemoveSectionModal ref={removeSectionRef} type="faqs" />
    </EditBox>
  );
};

export default FAQs;
