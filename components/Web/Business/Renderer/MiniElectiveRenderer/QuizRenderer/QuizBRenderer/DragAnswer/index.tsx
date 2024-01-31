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
      className="body-s inline-flex h-[34px] cursor-move items-center  gap-[28px] rounded-[3px] border-[0.5px] border-neutral-medium-gray bg-[#FFF4CE] py-[8px] pl-[8px] text-neutral-black"
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
