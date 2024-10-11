import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import Modal from '@/components/Common/Modal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import Button from '@/components/Common/Button';
import { useState } from 'react';
import { cn } from '@/helper/utils';
import webApi from '@/service';

const emailSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1, { message: 'subject is required' })
});

interface EmailModalProps {
  getEmail: () => string;
  onClick?: () => void;
  className?: string;
}

const EmailModal: React.FC<EmailModalProps> = ({ getEmail, onClick, className }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
      subject: ''
    }
  });

  const sendEmail = async (data: z.infer<typeof emailSchema>) => {
    console.log(data);
    console.log('email', getEmail());
    const res = await webApi.commonApi.sendEmail(data.email, data.subject, getEmail());
    console.log('send email res', res);
  };

  return (
    <div className={cn('mt-4', className)}>
      <Button
        type="primary"
        className="button-text-s rounded-full px-5 py-[.5rem] uppercase text-neutral-black"
        onClick={() => {
          setOpen(true);
          onClick && onClick();
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
