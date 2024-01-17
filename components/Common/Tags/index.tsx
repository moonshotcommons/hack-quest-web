import { FC } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/helper/utils';

const tagsVariants = cva(
  'w-fit h-fit border border-[#3E3E3E] rounded-[20px] text-[#3E3E3E]',
  {
    variants: {
      size: {
        sm: 'px-[14px] py-[5px] text-[12px]',
        md: 'px-[16px] py-[6px] text-[14px]',
        lg: 'px-[18px] py-[7px] text-[16px]'
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
