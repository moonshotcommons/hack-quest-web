import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn, isUuid } from '@/helper/utils';
import { createEditor } from '@wangeditor/editor';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import TextEditor from '../../TextEditor';

interface FormTextareaProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues, any, undefined>;
  name: Path<TFieldValues>;
  isRichText?: boolean;
  label: string;
  placeholder: any;
  maxField?: number;
  maxCharacters?: number;
  className?: string;
}

export const FormTextarea = <TFieldValues extends FieldValues = FieldValues>({
  form,
  name,
  label,
  placeholder,
  maxField,
  maxCharacters,
  className,
  isRichText = false
}: FormTextareaProps<TFieldValues>) => {
  maxField = maxField ?? maxCharacters ?? 600;

  const renderPlaceholder = () => {
    if (!isUuid(name) || !placeholder) return null;

    if (typeof placeholder === 'string') {
      return <p className="body-s !-mt-[2px] !mb-2.5 text-left text-[14px] text-neutral-medium-gray">{placeholder}</p>;
    }

    return (
      <div
        className="body-s reset-editor-style whitespace-pre-line text-left text-[14px] text-neutral-medium-gray"
        dangerouslySetInnerHTML={{
          __html: createEditor({ content: placeholder?.content || [] }).getHtml()
        }}
      ></div>
    );
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full text-left">
          <div className="flex w-full justify-between">
            <FormLabel className="body-m text-[16px] font-normal leading-[160%] text-neutral-rich-gray">
              {label}
            </FormLabel>

            {!isRichText && (
              <span className="caption-14pt text-neutral-rich-gray">
                <span className={(form.watch(name)?.length || 0) > maxField! ? 'text-status-error' : ''}>
                  {form.watch(name)?.length || 0}
                </span>
                /{maxField}
              </span>
            )}
          </div>
          {renderPlaceholder()}
          <FormControl>
            <Textarea
              authHeight={false}
              placeholder={!isUuid(name) ? placeholder : ''}
              {...field}
              className={cn(
                'body-m h-[128px] border-neutral-light-gray px-6 py-3 text-[16px] font-normal leading-[160%] text-neutral-medium-gray',
                { hidden: isRichText },
                className
              )}
            />
          </FormControl>
          {isRichText && (
            <TextEditor
              simpleModel
              onCreated={(editor) => {
                form.setValue(name, editor.getHtml() as any);
              }}
              defaultHtml={form.getValues(name)}
              onChange={(editor) => {
                form.setValue(name, editor.getHtml() as any);
              }}
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormTextarea;
