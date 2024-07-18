import * as React from 'react';
import { cn } from '@/helper/utils';
import { CirclePlusIcon } from 'lucide-react';

const AttestButton = React.forwardRef<React.ElementRef<'button'>, React.ComponentPropsWithoutRef<'button'>>(
  ({ className, ...props }, forwardedRef) => (
    <button
      ref={forwardedRef}
      className={cn(
        'inline-flex items-center justify-center gap-1 rounded-full bg-yellow-extra-light px-2 py-0.5 text-xs font-bold text-neutral-rich-gray',
        className
      )}
      {...props}
    >
      <CirclePlusIcon size={16} />
      <span>Attest</span>
    </button>
  )
);

AttestButton.displayName = 'AttestButton';

export { AttestButton };
