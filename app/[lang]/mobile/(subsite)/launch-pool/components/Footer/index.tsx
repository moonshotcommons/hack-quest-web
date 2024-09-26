import Image from 'next/image';
import { FC } from 'react';
import { FOOTER_LINKS } from './constant';
import Link from 'next/link';

interface FooterProps {}

const MailterLiteForm = () => {
  return (
    <div className="pt-6">
      <form
        action="https://assets.mailerlite.com/jsonp/1056158/forms/132693837240862303/subscribe"
        data-code=""
        method="post"
        target="_blank"
      >
        <div className="ml-validate-email ml-validate-required text-white">
          <input
            aria-label="email"
            aria-required="true"
            type="email"
            className="form-control h-9 w-full rounded pl-2 focus:outline-none"
            data-inputmask=""
            name="fields[email]"
            placeholder="Email"
            autoComplete="email"
          />
        </div>

        <div className="ml-form-embedPermissions mb-3 mt-5 text-white">
          <div className="ml-form-embedPermissionsContent default">
            <div className="ml-form-embedPermissionsOptions my-3">
              <div className="ml-form-embedPermissionsOptionsCheckbox">
                <label className="flex gap-2">
                  <input type="checkbox" name="gdpr[]" value="Newsletter and Events" xp-if="gdpr.title" />
                  <div className="label-description ">Newsletter and Events</div>
                </label>
                <div className="description" xp-if="gdpr.description">
                  We&apos;ll occasionally send updates about our monthly news and upcoming hackathons or events to keep
                  you informed.
                </div>
              </div>
            </div>
          </div>

          <div className="ml-form-embedMailerLite-GDPR">
            <p>
              <span style={{ fontSize: '11px;' }}>
                By clicking below to submit this form, you acknowledge that the information you provide will be
                processed in accordance with our Privacy Policy.
              </span>
            </p>
          </div>
        </div>

        <div className="ml-form-checkboxRow ml-validate-required text-white">
          <label className="checkbox flex gap-2 pb-2">
            <input type="checkbox" />
            <div className="label-description">
              <p>
                <strong>I confirm to opt in for news and updates</strong>
              </p>
            </div>
          </label>
        </div>

        <input type="hidden" name="ml-submit" value="1" />

        <div className="ml-form-embedSubmit">
          <button type="submit" className="rounded bg-yellow-400 px-3 py-1 text-neutral-white">
            Subscribe
          </button>

          <button disabled={true} style={{ display: 'none' }} type="button" className="loading">
            <div className="ml-form-embedSubmitLoad"></div>
            <span className="sr-only">Loading...</span>
          </button>
        </div>

        <input type="hidden" name="anticsrf" value="true" />
      </form>
    </div>
  );
};

const Footer: FC<FooterProps> = (props) => {
  return (
    <div className="w-full bg-neutral-black px-5 py-20">
      <div className="flex w-full flex-col gap-20 text-neutral-white">
        <div>
          <div className="relative h-[.875rem] w-[8.25rem]">
            <Image src={'/images/logo/home_nav_logo.svg'} alt="hackquest" fill></Image>
          </div>
          <div className="h-[20px] w-[500px]">
            <MailterLiteForm />
          </div>
        </div>
        {FOOTER_LINKS.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-5">
              <h4 className="text-h4">{item.group}</h4>
              <div className="body-m flex flex-col gap-2">
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
  );
};

export default Footer;
