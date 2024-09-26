import Image from 'next/image';
import { FC } from 'react';
import { FOOTER_LINKS } from './constant';
import Link from 'next/link';
import MailterLiteForm from '@/components/mailter-lite/mailter-lite-form';

interface FooterProps {}

const Footer: FC<FooterProps> = (props) => {
  return (
    <div className="w-full bg-neutral-black py-[7.5rem]">
      <div className="container mx-auto flex max-w-[1280px] justify-between">
        <div>
          <div className="relative h-[.875rem] w-[8.25rem]">
            <Image src={'/images/logo/home_nav_logo.svg'} alt="hackquest" fill></Image>
          </div>
          <div className="h-[20px] w-[500px]">
            <MailterLiteForm />
          </div>
        </div>
        <div className="flex gap-[7.5rem] text-neutral-white">
          {FOOTER_LINKS.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-10">
                <h4 className="text-h4">{item.group}</h4>
                <div className="body-m flex flex-col gap-[.4375rem]">
                  {item.links.map((link, i) => {
                    return (
                      <Link key={i} href={link.link} target="_blank">
                        {link.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
