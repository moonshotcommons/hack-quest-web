import { FC, ReactNode, memo } from 'react';
import { useDrag } from 'react-dnd';

interface DragAnswerProps {
  children: ReactNode;
  isDropped?: boolean;
  option: any;
  onClick: () => void;
}

const DragAnswer: FC<DragAnswerProps> = memo(function DragAnswer(props) {
  const { isDropped, children, option, onClick } = props;

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: option.id,
      item: option,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1
      })
    }),
    [option]
  );
  return (
    <div
      ref={drag}
      className="inline-flex gap-[28px] pl-[8px] h-[34px] py-[8px]  leading-[125%] bg-[#FFF4CE] cursor-move items-center border-[0.5px] border-neutral-medium-gray rounded-[3px] text-neutral-black font-next-book text-[14px] tracking-[0.28px]"
      style={{ opacity }}
      onClick={onClick}
    >
      <span>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1H13"
            stroke="#8C8C8C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M1 7H13"
            stroke="#8C8C8C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="pr-[28px]">{children}</span>
    </div>
  );
});

export default DragAnswer;
