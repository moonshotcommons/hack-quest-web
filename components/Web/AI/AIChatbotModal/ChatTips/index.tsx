import { HelperType } from '@/service/webApi/helper/type';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { FC } from 'react';

interface ChatTipsProps {
  updateTipsShow: (show: boolean) => void;
}

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

const ChatTips: FC<ChatTipsProps> = ({ updateTipsShow }) => {
  const updateHelperParamsByKey = useGlobalStore((state) => state.updateHelperParamsByKey);
  return (
    <div className="flex flex-col  items-end gap-3">
      {TIPS_TYPE.map((item) => {
        return (
          <div
            key={item.label}
            className="body-m cursor-pointer rounded-full border border-[#BC9BFF] px-4 py-2 text-neutral-black hover:bg-[#faf7ff]"
            onClick={() => {
              updateHelperParamsByKey('type', item.type);
              updateTipsShow(false);
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
