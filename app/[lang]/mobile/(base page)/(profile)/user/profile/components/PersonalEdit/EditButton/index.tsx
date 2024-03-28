import { cn } from '@/helper/utils';
import { FC, HTMLAttributes } from 'react';

interface EditButtonProps {
  className?: string;
  color?: string;
  opacity?: number;
}

const EditButton: FC<EditButtonProps & Omit<HTMLAttributes<HTMLDivElement>, 'className'>> = (props) => {
  const { className, color = '#231F20', opacity = 1, ...rest } = props;
  return (
    <div
      className={cn(
        'flex h-[45px] w-[45px] cursor-pointer items-center justify-center rounded-full bg-neutral-white opacity-100',
        className
      )}
      {...rest}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.34005 18.9L21.0701 7.17001C21.8727 6.42213 22.203 5.29579 21.9316 4.23286C21.6601 3.16992 20.8301 2.33992 19.7672 2.06847C18.7043 1.79701 17.5779 2.1274 16.8301 2.93001L5.07005 14.69C4.99484 14.7673 4.93088 14.8549 4.88005 14.95L2.10005 20.56C1.94803 20.8703 1.96693 21.237 2.15005 21.53C2.33317 21.823 2.65455 22.0007 3.00005 22C3.16505 21.9961 3.32651 21.9515 3.47005 21.87L9.08005 19.09C9.1752 19.0392 9.26273 18.9752 9.34005 18.9ZM21.0001 22C21.5523 22 22.0001 21.5523 22.0001 21C22.0001 20.4477 21.5523 20 21.0001 20H12.0001C11.4478 20 11.0001 20.4477 11.0001 21C11.0001 21.5523 11.4478 22 12.0001 22H21.0001ZM16.3201 9.09001L14.9101 7.68001L6.63005 16L5.24005 18.8L8.00005 17.37L16.3201 9.09001ZM18.9651 3.99876C19.2392 3.99876 19.5013 4.11128 19.6901 4.31001C19.8849 4.50289 19.9921 4.76732 19.9864 5.04145C19.9807 5.31558 19.8627 5.57536 19.6601 5.76001L17.7301 7.68001L16.3201 6.27001L18.2401 4.31001C18.4288 4.11128 18.6909 3.99876 18.9651 3.99876Z"
          fill={color}
        />
      </svg>
    </div>
  );
};

export default EditButton;
