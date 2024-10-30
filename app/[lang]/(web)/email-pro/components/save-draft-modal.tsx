import Button from '@/components/Common/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

interface SaveDraftModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSave: (name: string) => void;
}

const emailDraftSchema = z.object({
  name: z.string().min(1, { message: 'name is required' })
});

const SaveDraftModal = (props: SaveDraftModalProps) => {
  const { open, setOpen, onSave } = props;

  const form = useForm<z.infer<typeof emailDraftSchema>>({
    resolver: zodResolver(emailDraftSchema),
    defaultValues: {
      name: ''
    }
  });

  const SaveForm = () => {
    return (
      <div className="pb-8">
        <p className="pb-4">Are you sure you want to save the draft?</p>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="off" placeholder="please input name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    );
  };

  const saveEmailDraft = (data: z.infer<typeof emailDraftSchema>) => {
    onSave(data.name);
    form.reset();
  };

  return (
    <>
      <Button
        type="primary"
        className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
        onClick={() => {
          setOpen(true);
        }}
      >
        Save Draft
      </Button>
      <Modal
        title="Save Draft"
        open={open}
        footer={
          <div className="flex justify-end gap-5 pt-5">
            <Button
              type="secondary"
              className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
              onClick={form.handleSubmit(saveEmailDraft)}
            >
              Save
            </Button>
          </div>
        }
        onOk={() => {}}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <SaveForm />
      </Modal>
    </>
  );
};

export default SaveDraftModal;
