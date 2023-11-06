import { FC, ReactNode } from 'react';

interface MilestoneProgressProps {
  /** 总里程碑的值 */
  total: number;
  /** 单个里程碑的值 */
  single: number;
  /** 当前值 */
  current: number;
  start: ReactNode;
}

const MilestoneProgress: FC<MilestoneProgressProps> = (props) => {
  const { total = 0, single = 0, current = 0 } = props;

  return (
    <div>
      <div className="flex gap-[8px] h-[15px] w-full">
        {/* {new Array(Math.ceil(total / single)).fill('').map((item, index) => {
          return (
            <div key={index} className="flex-1">
              <div className=" bg-[#CCE9E7] h-[15px] rounded-[1px] relative"></div>
            </div>
          );
        })} */}
      </div>
    </div>
  );
};

export default MilestoneProgress;
