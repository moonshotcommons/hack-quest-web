import React, { useState } from 'react';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import EditBox from '../EditBox';
import { IoAdd, IoRemoveOutline } from 'react-icons/io5';

interface FAQsProp {
  hackathon: HackathonType;
}

const FAQs: React.FC<FAQsProp> = ({ hackathon }) => {
  const [expandIndexs, setExpandIndexs] = useState<number[]>([]);
  const FAQData = [
    {
      problem: 'faq-question1',
      answer: 'faq-answer1'
    },
    {
      problem: 'faq-question2',
      answer: 'faq-answer2'
    },
    {
      problem: 'faq-question3',
      answer: 'faq-answer3'
    },
    {
      problem: 'faq-question4',
      answer: 'faq-answer4'
    }
  ];

  const handleExpand = (i: number) => {
    const exist = ~expandIndexs.indexOf(i);
    const newIndexs = exist ? expandIndexs.filter((v) => v !== i) : [...expandIndexs, i];
    setExpandIndexs(newIndexs);
  };
  return (
    <EditBox title={'FAQs'} className="rounded-[0] border-none bg-transparent p-0">
      <div className="body-s text-neutral-rich-gray">
        {FAQData.map((v, i) => (
          <div
            key={i}
            className={`border-t ${!i ? 'border-transparent pb-[20px] pt-[0]' : 'border-neutral-medium-gray py-[20px]'}`}
          >
            <div className="body-l-bold flex cursor-pointer items-center gap-[30px]" onClick={() => handleExpand(i)}>
              <p className="flex-1 ">{v.problem}</p>
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
    </EditBox>
  );
};

export default FAQs;
