'use client';

import * as React from 'react';
import { DocumentIcon } from '@/components/Common/Icon/Document';
import { useDocumentation } from '@/store/zustand/documentationStore';
import { cn } from '@/helper/utils';

export function ViewButton({
  id = null,
  placement = 'bottom-right',
  showText = true,
  iconClassName,
  textClassName,
  buttonClassName
}: {
  id?: string | null;
  placement?: 'center' | 'bottom-right';
  showText?: boolean;
  iconClassName?: string;
  textClassName?: string;
  buttonClassName?: string;
}) {
  const { onOpen } = useDocumentation();
  return (
    <button
      type="button"
      aria-label="View Documentation"
      className={cn('flex items-center gap-2 text-neutral-black outline-none', buttonClassName)}
      onClick={() => onOpen({ placement, id })}
    >
      <DocumentIcon className={iconClassName} />
      {showText && <span className={cn('underline-s', textClassName)}>View Documentation</span>}
    </button>
  );
}
