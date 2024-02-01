import { FC } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/helper/utils';

const tagsVariants = cva(
  'w-fit h-fit border border-neutral-rich-gray rounded-[20px] text-neutral-rich-gray',
  {
    variants: {
      size: {
        sm: 'px-[14px] py-[5px] body-xs',
        md: 'px-[16px] py-[6px] body-s',
        lg: 'px-[18px] py-[7px] body-m'
      }
    },
    defaultVariants: {
      size: 'sm'
    }
  }
);

interface TagsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tagsVariants> {}

const Tags: FC<TagsProps> = ({ className, size, ...props }) => {
  return (
    <div className={cn(tagsVariants({ size, className }))} {...props}></div>
  );
};

export default Tags;
