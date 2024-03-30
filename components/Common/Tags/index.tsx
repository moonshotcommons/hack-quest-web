import { FC } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/helper/utils';

const tagsVariants = cva('w-fit h-fit border border-neutral-rich-gray rounded-[20px] text-neutral-rich-gray', {
  variants: {
    size: {
      sm: 'px-[12px] py-[4px] caption-12pt',
      md: 'px-[14px] py-[6px] caption-14pt',
      lg: 'px-[16px] py-[6px] caption-16pt'
    },
    direction: {
      left: '',
      right: 'flex-row-reverse'
    }
  },
  defaultVariants: {
    size: 'sm'
  }
});

interface TagsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tagsVariants> {}

const Tags: FC<TagsProps> = ({ className, size, ...props }) => {
  return <div className={cn(tagsVariants({ size, className }))} {...props}></div>;
};

export default Tags;
