import Image from 'next/image';
import Bg from '@/public/images/home/policy_banner.svg';

const PrivacyPolicy = () => {
  return (
    <div className="w-full text-center text-text-default-color">
      <div className="relative h-[60.25rem] w-full bg-default-global-bg">
        <Image src={Bg} alt="bg" className="mt-[3.375rem] w-full"></Image>
        <div className="absolute -top-[3.375rem] left-0 h-full w-full bg-gradient-to-b from-transparent to-default-global-bg">
          <h1 className="text-h1 mt-[12.5rem] pb-[2.625rem] text-center text-text-default-color">
            Privacy Policy for HackQuest
          </h1>
          <h1 className="text-h2 mt-[23.75rem] text-left text-text-default-color">
            Privacy Policy for HackQuest
          </h1>
          <div className="body-xl mt-[4.5rem] flex flex-col gap-[1.875rem] text-left text-text-default-color">
            <p className="">
              {`This privacy policy ("Policy") will help you understand how
              HackQuest ("us", "we", "our") uses and protects the data you
              provide to us when you visit and use HackQuest ("website",
              "service").`}
            </p>
            <p className="">
              {`We reserve the right to change this policy at any given time. If you want to make sure that you are up to date with the latest changes, we advise you to frequently visit this page.`}
            </p>
          </div>
        </div>
      </div>
      <div className="body-xl mt-[4.5rem] flex flex-col gap-[12.5rem] text-left text-text-default-color">
        <div className="flex flex-col gap-[1.875rem]">
          <h1 className="text-h2 pb-[2.625rem] text-text-default-color">
            1. Data We Collect
          </h1>
          <p className="mt-[1.875rem]">
            When you visit the website, we may collect the following data
          </p>
          <ul className="flex list-disc flex-col gap-[0.725rem]">
            <li className="ml-6">Your IP address.</li>
            <li className="ml-6">
              Your contact information and email address.
            </li>
            <li className="ml-6">
              Other information such as interests and preferences.
            </li>
            <li className="ml-6">
              Data profile regarding your online behavior on our website.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-[1.875rem]">
          <h1 className="text-h2 pb-[2.625rem]  text-text-default-color">
            2. Why We Collect Your Data
          </h1>
          <p className="mt-[1.875rem]">
            We are collecting your data for several reasons:
          </p>
          <ul className="flex list-disc flex-col gap-[0.725rem]">
            <li className="ml-6">To better understand your needs.</li>
            <li className="ml-6">To improve our services and products.</li>
            <li className="ml-6">
              To send you promotional emails containing the information we think
              you will find interesting.
            </li>
            <li className="ml-6">
              To contact you to fill out surveys and participate in other types
              of market research.
            </li>
            <li className="ml-6">
              To customize our website according to your online behavior and
              personal preferences.
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-[1.875rem]">
          <h1 className="text-h2 pb-[2.625rem]  text-text-default-color">
            5. Restricting the Collection of your Personal Data
          </h1>
          <p className="">
            {`At some point, you might wish to restrict the use and collection of your personal data. You can achieve this by doing the
following:`}
          </p>
          <p className="">
            {`When you are filling the forms on the website, make sure to check if there is a box which you can leave unchecked, if you don't
want to disclose your personal information.`}
          </p>
          <p className="">
            {`If you have already agreed to share your information with us, feel free to contact us via email and we will be more than happy to
change this for you.`}
          </p>
          <p className="">
            {`HackQuest will not lease, sell or distribute your personal information to any third parties, unless we have your permission. We
might do so if the law forces us. Your personal information will be used when we need to send you promotional materials if you
agree to this privacy policy.`}
          </p>
        </div>
        <div className="flex flex-col gap-[1.875rem]">
          <h1 className="text-h2 pb-[2.625rem]  text-text-default-color">
            6. Intellectual Property Rights
          </h1>
          <p className="">
            {`All content offered as part of our Web3 programming courses, including text, graphics, logos, images, and course materials, are
the property of HackQuest and are protected by international copyright laws. No content may be copied, reproduced,
republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, or distributed in any way to any other
computer, server, website, or other medium for publication or distribution or for any commercial enterprise, without HackQuest's
express prior written consent.`}
          </p>
          <p className="">
            {`By accessing our courses, you agree not to reuse, sell, or commercially exploit our course content.`}
          </p>
          <p className="">
            {`For any inquiries or concerns, please contact us at `}{' '}
            <a
              href={'mailto:founder@hackquest.io'}
              target="_blank"
              className="underline"
            >
              founder@hackquest.io.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
