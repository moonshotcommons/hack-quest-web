import React, { useContext, useRef, useState } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { IoAdd, IoRemoveOutline } from 'react-icons/io5';
import { HackathonEditContext, HackathonEditModalType } from '../../constants/type';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import RemoveSectionModal, { RemoveSectionModalRef } from '../RemoveSectionModal';

interface FAQsProp {
  hackathon: HackathonType;
}

const FAQs: React.FC<FAQsProp> = ({ hackathon }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [expandIndexs, setExpandIndexs] = useState<number[]>([]);
  const removeSectionRef = useRef<RemoveSectionModalRef>(null);
  const handleExpand = (i: number) => {
    const exist = ~expandIndexs.indexOf(i);
    const newIndexs = exist ? expandIndexs.filter((v) => v !== i) : [...expandIndexs, i];
    setExpandIndexs(newIndexs);
  };
  if (!hackathon.info?.faqs?.list?.length) return;
  return (
    <EditBox
      title={'FAQs'}
      className="rounded-[0] border-none bg-transparent p-0"
      type={HackathonEditModalType.FAQS}
      handleDelete={() => removeSectionRef.current?.open()}
    >
      <div className="body-s text-neutral-rich-gray">
        {hackathon.info?.faqs?.list.map((v, i) => (
          <div
            key={i}
            className={`border-t ${!i ? 'border-transparent pb-[20px] pt-[0]' : 'border-neutral-medium-gray py-[20px]'}`}
          >
            <div className="body-l-bold flex cursor-pointer items-center gap-[30px]" onClick={() => handleExpand(i)}>
              <p className="flex-1 ">{v.question}</p>
              <div className="flex-shrink-0">
                {~expandIndexs.indexOf(i) ? <IoRemoveOutline size={28} /> : <IoAdd size={28} />}
              </div>
            </div>
            <div className={`whitespace-pre-line pt-[20px] ${~expandIndexs.indexOf(i) ? 'block' : 'hidden'}`}>
              {v.answer}
            </div>
          </div>
        ))}
      </div>
      <RemoveSectionModal ref={removeSectionRef} type="faqs" />
    </EditBox>
  );
};

export default FAQs;
