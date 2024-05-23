import { cn } from '@/helper/utils';
import { FC, ReactNode } from 'react';

export interface StepItem {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  disable?: boolean;
  finishIcon?: ReactNode;
  status?: 'finish' | 'progress' | 'wait';
}

export interface StepsProps {
  items: StepItem[];
  /** 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态 */
  current: number;
  /** 起始序号，从 0 开始记数 */
  initial?: number;
  /** 指定标签放置位置，默认水平放图标下面，可选 horizontal 放图标下方 */
  labelPlacement?: 'horizontal' | 'vertical';
  /** 当前 process 步骤显示的进度条进度 */
  percent?: number;
  status?: '';
  connectNodeClassName?: string;
  itemClassName?: string;
  // progressDot: boolean | (iconDot, {index, status, title, description}) => ReactNode;
}

const Steps: FC<StepsProps> = (props) => {
  const { items, current, connectNodeClassName, itemClassName } = props;

  const getStatus = (index: number, status: 'finish' | 'wait' | 'progress' | undefined) => {
    if (status) return status;
    if (index < current) return 'finish';
    if (index === current) return 'progress';
    if (index > current) return 'wait';
  };

  return (
    <div className="max-w-screen flex w-full">
      {items.map((item, index) => {
        const status = getStatus(index, item.status)!;
        return (
          <div key={index} className={cn('flex min-h-[40px]', index === items.length - 1 ? 'w-fit' : 'w-full')}>
            <div
              className={cn(
                'caption-12pt flex min-h-10 min-w-[90px] flex-col items-center justify-between',
                itemClassName
              )}
            >
              <div>
                {status === 'wait' && (
                  <div className="h-4 w-4 rounded-full border border-neutral-light-gray bg-neutral-off-white"></div>
                )}
                {status === 'finish' && <div className="h-4 w-4 rounded-full  bg-yellow-primary"></div>}
                {status === 'progress' && (
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="-mt-1"
                  >
                    <path
                      d="M20.9971 13.1995C20.9971 17.6176 17.4165 21.1108 12.9995 21.0017C8.58259 20.8926 5.00195 17.2226 5.00195 12.8045C5.00195 8.3863 8.58259 4.89311 12.9995 5.00219C17.4165 5.11127 20.9971 8.78131 20.9971 13.1995Z"
                      fill="#FAD81C"
                      stroke="#FFFAE0"
                      strokeWidth="0.8"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M13 24.8047C6.37258 24.8047 1 19.4321 1 12.8047C1 6.17727 6.37258 0.804688 13 0.804688C19.6274 0.804688 25 6.17727 25 12.8047C25 19.4321 19.6274 24.8047 13 24.8047Z"
                      stroke="#3E3E3E"
                      strokeWidth="0.8"
                      strokeMiterlimit="10"
                      strokeDasharray="3 3"
                    />
                  </svg>
                )}
              </div>
              <span>{item.title}</span>
            </div>
            {index >= current && index < items.length - 1 && (
              <div
                className={cn('my-[7px] h-[3px] flex-1 rounded-[16px] bg-neutral-off-white', connectNodeClassName)}
              />
            )}
            {index < current && (
              <div className={cn('my-[7px] h-[3px] flex-1 rounded-[16px] bg-yellow-primary', connectNodeClassName)} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
