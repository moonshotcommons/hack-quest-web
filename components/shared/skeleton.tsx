import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/helper/utils';

type SkeletonElement = React.ElementRef<'span'>;
export interface SkeletonProps extends React.ComponentPropsWithoutRef<'span'> {
  loading?: boolean;
}

const Skeleton = React.forwardRef<SkeletonElement, SkeletonProps>((props, forwardedRef) => {
  const { className, loading, children, ...rest } = props;

  if (!loading) return children;

  const Tag = React.isValidElement(children) ? Slot : 'span';

  return (
    <Tag
      ref={forwardedRef}
      aria-hidden={true}
      tabIndex={-1}
      data-inline-skeleton={React.isValidElement(children) ? undefined : true}
      className={cn('animate-pulse bg-neutral-off-white text-[#0000]', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
});

Skeleton.displayName = 'Skeleton';

export { Skeleton };
