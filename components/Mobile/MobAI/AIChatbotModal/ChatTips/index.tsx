import { HelperType } from '@/service/webApi/helper/type';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { FC } from 'react';

interface ChatTipsProps {}

const TIPS_TYPE = [
  {
    type: HelperType.SummarizeContent,
    label: 'Summarize the section'
  },
  {
    type: HelperType.ExpandContent,
    label: 'Expand Knowledge'
  },

  {
    type: HelperType.RelatedContent,
    label: 'Related Concept'
  }
];

const ChatTips: FC<ChatTipsProps> = ({}) => {
  const updateHelperParamsByKey = useGlobalStore((state) => state.updateHelperParamsByKey);
  return (
    <div className="flex w-fit flex-col gap-3">
      {TIPS_TYPE.map((item) => {
        return (
          <div
            key={item.label}
            className="body-m w-fit cursor-pointer rounded-full bg-[#EBE1FF] px-4 py-2 text-neutral-black hover:bg-[#BC9BFF]"
            onClick={() => {
              updateHelperParamsByKey('type', item.type);
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

export default ChatTips;
