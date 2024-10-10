import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import Modal from '@/components/Common/Modal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import Button from '@/components/Common/Button';
import { useState } from 'react';

const emailSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1, { message: 'subject is required' })
});

const EmailModal = ({ getEmail }: { getEmail: () => string }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
      subject: ''
    }
  });

  const sendEmail = (data: z.infer<typeof emailSchema>) => {
    console.log(data);
    console.log(getEmail());
  };

  return (
    <div className="mt-4">
      <Button
        type="primary"
        className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
        onClick={() => {
          setOpen(true);
        }}
      >
        Send
      </Button>
      <Modal open={open} onClose={() => {}}>
        <div className="w-[520px] rounded-lg bg-white p-8">
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Recipient</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" placeholder="you@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="py-3"></div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="off" placeholder="please input subject" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="mt-3 flex justify-end gap-8">
            <Button
              ghost
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              cancel
            </Button>
            <Button size="small" type="primary" onClick={form.handleSubmit(sendEmail)}>
              send
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EmailModal;
