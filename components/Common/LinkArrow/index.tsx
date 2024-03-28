import { FC } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/helper/utils';

const LinkArrowVariants = cva('flex cursor-pointer items-center', {
  variants: {
    size: {
      sm: 'gap-[7px] body-s',
      md: 'gap-[7px] body-m',
      lg: 'gap-[6px] body-l'
    },
    direction: {
      left: '',
      right: 'flex-row-reverse'
    }
  },
  defaultVariants: {
    size: 'sm',
    direction: 'left'
  }
});

interface LinkArrowProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof LinkArrowVariants> {}

const LinkArrow: FC<LinkArrowProps> = ({ className, size, direction, children, ...props }) => {
  return (
    <div className={cn(LinkArrowVariants({ size, direction, className }))} {...props}>
      {size !== 'sm' && (
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={direction === 'right' ? 'rotate-180' : ''}
        >
          <path
            d="M13 4.5C13.2761 4.5 13.5 4.27614 13.5 4C13.5 3.72386 13.2761 3.5 13 3.5L13 4.5ZM0.646446 3.64645C0.451184 3.84171 0.451184 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.97631 4.7308 0.659728 4.53553 0.464465C4.34027 0.269203 4.02369 0.269203 3.82843 0.464465L0.646446 3.64645ZM13 3.5L1 3.5L1 4.5L13 4.5L13 3.5Z"
            fill="#0B0B0B"
          />
        </svg>
      )}

      {size === 'sm' && (
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={direction === 'right' ? 'rotate-180' : ''}
        >
          <path
            d="M11 4.5C11.2761 4.5 11.5 4.27614 11.5 4C11.5 3.72386 11.2761 3.5 11 3.5V4.5ZM0.646446 3.64645C0.451184 3.84171 0.451184 4.15829 0.646446 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646446 3.64645ZM11 3.5L1 3.5V4.5L11 4.5V3.5Z"
            fill="#0B0B0B"
          />
        </svg>
      )}
      <span className="capitalize text-neutral-black">{children}</span>
    </div>
  );
};

export default LinkArrow;
