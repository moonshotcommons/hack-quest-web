import { FC, ReactNode, useRef, useState } from 'react';
import { useMotionValue } from 'framer-motion';
import { useClickAway } from 'ahooks';
import Options from './Options';
import ChatModal from './ChatModal';

export enum HelperType {
  Chat = 'Chat',
  SummarizeContent = 'SummarizeContent',
  ExpandContent = 'ExpandContent',
  RelatedContent = 'RelatedContent',
  ExplainExample = 'ExplainExample',
  ExplainQuiz = 'ExplainQuiz'
}

interface HelperButtonProps {
  children: ReactNode;
}

const HelperButton: FC<HelperButtonProps> = ({ children }) => {
  const constraintsRef = useRef(null);
  const y = useMotionValue(0);
  const [pos, setPos] = useState([0, 0]);

  const [open, setOpen] = useState(false);

  // const { run: handleMouseEnter } = useDebounceFn(
  //   () => {
  //     handleMouseLeave.cancel();
  //     setOpen(true);
  //   },
  //   { wait: 100 }
  // );

  // const { run: handleMouseLeave } = useDebounceFn(
  //   () => {
  //     handleMouseEnter.cancel();
  //     setOpen(false);
  //   },
  //   { wait: 100 }
  // );

  const ref = useRef<HTMLDivElement>(null);

  useClickAway(() => {
    setOpen(false);
  }, ref);

  return (
    <div className="relative h-full w-full">
      {children}
      <div
        ref={ref}
        className="absolute bottom-[120px] right-0 z-[9999] h-12 w-12 cursor-pointer bg-[url('/images/icons/helper_bg_icon.svg')]"
        draggable
        onDragStart={(e) => {
          console.log(e.movementX, e.movementY);
          setOpen(false);
        }}
        onDrag={(e) => {
          console.log(e.pageY, e.movementY);
        }}
        onDragEnd={() => {}}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        onClick={() => {
          setOpen(true);
        }}
      >
        {/* <div className="absolute bottom-[120px] right-0 z-[9999] h-12 w-12 bg-[url('/images/icons/helper_bg_icon.svg')]"></div> */}
        <span></span>
        {open && (
          <Options
            changeOpen={(open) => {
              setOpen(open);
            }}
          />
        )}
        <ChatModal />
      </div>
    </div>
  );
};

export default HelperButton;
