import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import Modal from '@/components/Common/Modal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import Button from '@/components/Common/Button';
import { useEffect, useState } from 'react';
import { cn } from '@/helper/utils';
import webApi from '@/service';
import { message } from 'antd';

const emailSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1, { message: 'subject is required' })
});

interface EmailModalProps {
  btnText: string;
  getEmail: () => string;
  onClick?: () => void;
  className?: string;
  isBatch?: boolean;
}

const EmailModal: React.FC<EmailModalProps> = (props) => {
  const { getEmail, onClick, className, btnText, isBatch } = props;

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
      subject: ''
    }
  });

  const sendEmail = async (data: z.infer<typeof emailSchema>) => {
    message.loading({
      content: 'Send email...',
      duration: 0,
      key: 'send-email'
    });

    const res = await webApi.commonApi.sendEmail({
      ...data,
      content: getEmail(),
      isBatch: !!isBatch
    });

    console.log('res', res, getEmail());

    if (res.msg.includes('Ok')) {
      message.success('Email sent successfully');
    } else {
      message.error('Email sending failed');
    }

    setOpen(false);
    message.destroy('send-email');
    form.reset();
  };

  const SendToOne = () => {
    return (
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
    );
  };

  useEffect(() => {
    if (isBatch) {
      form.setValue('email', 'you@example.com');
    }
  }, [isBatch, form]);

  const SendToMore = () => {
    return (
      <div className="pb-8">
        <p className="pb-4">Are you sure you want to send it to all users?</p>
        <Form {...form}>
          <form>
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
      </div>
    );
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
        {btnText}
      </Button>
      <Modal open={open} onClose={() => {}}>
        <div className="w-[520px] rounded-lg bg-white p-8">
          {isBatch ? <SendToMore /> : <SendToOne />}
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
