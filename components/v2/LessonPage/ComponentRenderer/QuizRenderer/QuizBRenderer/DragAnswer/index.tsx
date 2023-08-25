import { FC, ReactNode, memo } from 'react';
import { useDrag } from 'react-dnd';
import { MdOutlineDragHandle } from 'react-icons/md';

interface DragAnswerProps {
  children: ReactNode;
  isDropped?: boolean;
  option: any;
}

const DragAnswer: FC<DragAnswerProps> = memo(function DragAnswer(props) {
  const { isDropped, children, option } = props;

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
      className="inline-flex gap-[28px] pl-[8px] h-[34px] py-[8px]  leading-[125%] bg-[#FFF4CE] cursor-move items-center border-[0.5px] border-[#8C8C8C] rounded-[3px] text-[#000] font-next-book text-[14px] tracking-[0.28px]"
      style={{ opacity }}
    >
      <span>
        <MdOutlineDragHandle size={28} color="#8C8C8C"></MdOutlineDragHandle>
      </span>
      <span className="pr-[28px]">{children}</span>
    </div>
  );
});

export default DragAnswer;
