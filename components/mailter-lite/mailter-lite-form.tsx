'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Button from '../Common/Button';
import { useState } from 'react';
import { message } from 'antd';

type Inputs = {
  email: string;
};

const emailSchema = z.object({
  email: z.string().email('请输入有效的电子邮件地址').min(1, { message: '不能为空' })
});

const MailterLiteForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({
    resolver: zodResolver(emailSchema)
  });

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const gdpr = 'Newsletter and Events';
    console.log(data);
    const response = await fetch(
      `https://assets.mailerlite.com/jsonp/1056158/forms/132693837240862303/subscribe?fields[email]=${data.email}&gdpr[]=${gdpr}&ml-summit=1`
    );

    response
      .json()
      .then((res) => {
        setLoading(false);
        setIsSuccess(true);
      })
      .catch((err) => {
        message.error('subscrible error' + err);
      });
  };

  return (
    <div className="max-w-[634px] py-6 text-neutral-white">
      {!isSuccess ? (
        <div>
          <div>
            <h1 className="text-2xl">We&apos;d love to see you there</h1>
            <p className=" py-4">
              We&apos;ll occasionally send updates about our monthly news and upcoming hackathons or events to keep you
              informed.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-4">
              {/* register your input into the hook by invoking the "register" function */}
              <input
                aria-label="email"
                aria-required="true"
                type="email"
                className={`form-control h-6 w-[300px] rounded  border-2  py-5 pl-2 text-black outline-none  ${
                  errors.email && 'border-2 border-rose-600'
                }`}
                placeholder="Email"
                autoComplete="email"
                {...register('email')}
              />

              <Button loading={loading} className="rounded-sm bg-neutral-white px-2 py-2  text-neutral-white">
                <span className="text-black">Subscrible</span>
              </Button>
            </form>
            <p className="py-3">
              By subscribing you acknowledge that the information you provide will be processed in accordance with our
              Privacy Policy
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl">You are all set!</h1>
          <p className="my-2">Great news! You&apos;ve successfully joined our subscriber list. </p>
          <p>🔥Keep an eye out for some exciting updates coming your way!</p>
          <p className="my-2">LFG, </p>
          <p>HackQuest</p>
        </div>
      )}
    </div>
  );
};

export default MailterLiteForm;
