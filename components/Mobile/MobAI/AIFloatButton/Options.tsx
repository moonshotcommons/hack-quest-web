import { FC } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/helper/utils';
import { useGlobalStore } from '@/store/zustand/globalStore';
import { useUpdateHelperParams } from '@/hooks/utils/useUpdateHelperParams';
import { HelperType } from '@/service/webApi/helper/type';
interface OptionsProps {
  changeOpen: (open: boolean) => void;
  pageType: 'learn' | 'other';
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

const Options: FC<OptionsProps> = ({ changeOpen, pageType }) => {
  const { updateHelperType } = useUpdateHelperParams();
  const pageId = useGlobalStore((state) => state.helperParams.pageId);
  const updateHelperParamsByKey = useGlobalStore((state) => state.updateHelperParamsByKey);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 100, y: 60 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'w-[14.1875rem] scale-0 rounded-[16px] bg-neutral-white p-[10px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]'
      )}
    >
      {pageType === 'learn' && (
        <div className="flex w-fit flex-col gap-3">
          {TIPS_TYPE.map((item) => {
            return (
              <div
                key={item.label}
                className="body-m w-fit cursor-pointer rounded-full bg-[#EBE1FF] px-4 py-2 text-neutral-black hover:bg-[#BC9BFF]"
                onClick={() => {
                  changeOpen(false);
                  updateHelperParamsByKey('type', item.type);
                }}
              >
                {item.label}
              </div>
            );
          })}
        </div>
      )}
      {pageType !== 'learn' && (
        <div
          className="flex gap-2 whitespace-nowrap rounded-[8px] px-2 py-3 hover:bg-neutral-off-white"
          onClick={() => {
            changeOpen(false);
            updateHelperType(HelperType.Chat);
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 2H19C20.6569 2 22 3.34315 22 5V15C22 16.6569 20.6569 18 19 18H18V21C17.998 21.4037 17.7534 21.7666 17.38 21.92C17.2613 21.976 17.1312 22.0034 17 22C16.7342 22.0015 16.4787 21.8972 16.29 21.71L12.59 18H5C3.34315 18 2 16.6569 2 15V5C2 3.34315 3.34315 2 5 2ZM19 16C19.5523 16 20 15.5523 20 15V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V15C4 15.5523 4.44772 16 5 16H13C13.2658 15.9985 13.5213 16.1028 13.71 16.29L16 18.59V17C16 16.4477 16.4477 16 17 16H19Z"
              fill="#0B0B0B"
            />
          </svg>
          <span>Ask AI</span>
        </div>
      )}
    </motion.div>
  );
};

export default Options;
