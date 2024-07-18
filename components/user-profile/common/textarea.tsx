import * as React from 'react';
import GraphemeSplitter from 'grapheme-splitter';
import { cn } from '@/helper/utils';

type TextareaElement = React.ElementRef<'textarea'>;
export interface TextareaProps extends React.ComponentPropsWithoutRef<'textarea'> {}

const Textarea = React.forwardRef<TextareaElement, TextareaProps>((props, forwardedRef) => {
  const { className, value = '', maxLength, onChange, ...textareaProps } = props;

  const splitter = React.useMemo(() => new GraphemeSplitter(), []);

  const countGraphemes = React.useCallback(
    (value: string) => {
      return splitter.countGraphemes(value);
    },
    [splitter]
  );

  function onChangeHandler(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = event.target?.value;
    if (maxLength) {
      if (countGraphemes(value) > maxLength) return;
    }
    onChange?.(event);
  }

  return (
    <div className="relative">
      <textarea
        ref={forwardedRef}
        className={cn(
          'min-h-[80px] w-full rounded-[8px] p-3 text-sm text-neutral-off-black outline-none ring-1 ring-inset ring-neutral-light-gray transition-all duration-300 placeholder:text-neutral-medium-gray focus:shadow-field-valid focus:ring-neutral-medium-gray aria-[invalid=true]:ring-status-error-dark aria-[invalid=true]:focus:shadow-field-invalid sm:text-base',
          className
        )}
        value={value}
        onChange={onChangeHandler}
        {...textareaProps}
      />
      {maxLength && (
        <span className="absolute bottom-3 right-3 z-10 text-xs text-neutral-medium-gray">
          {countGraphemes(value as string)} / {maxLength}
        </span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
