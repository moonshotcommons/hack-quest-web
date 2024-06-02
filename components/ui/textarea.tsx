import * as React from 'react';

import { cn } from '@/helper/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  authHeight?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { className, onChange: propOnChange, authHeight = true, ...rest } = props;
  let textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useImperativeHandle(ref, () => {
    return textareaRef.current!;
  });

  const resize = (init = false) => {
    if (textareaRef.current) {
      if (!init) {
        textareaRef.current.style.height = 'auto';
      }

      textareaRef.current.style.height = textareaRef.current.scrollHeight + 2 + 'px';
    }
  };

  React.useEffect(() => {
    if (authHeight) {
      resize(true);
    }
  }, [authHeight]);

  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-[0.5rem] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-off-white focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        authHeight ? '' : '',
        className
      )}
      onChange={(e) => {
        if (propOnChange) {
          propOnChange(e);
        }
        authHeight && resize();
      }}
      ref={textareaRef}
      {...rest}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
