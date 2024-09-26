import type { Metadata, Viewport } from 'next';

import '@/styles/globals.css';
import InitializeUserProvider from '@/components/Provider/InitializeUser';
import '@rainbow-me/rainbowkit/styles.css';
import Script from 'next/script';

import { Nunito, Space_Mono, Poppins } from 'next/font/google';
import { Lang } from '@/i18n/config';
import 'github-markdown-css/github-markdown.css';
import WebAppProvider from '@/components/Provider/WebAppProvider';
import webApi from '@/service';

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito'
});

const space_mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-space-mono'
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'HackQuest',
  description: 'Learn and Grow Careers in Web3.',
  robots: {
    index: process.env.RUNTIME_ENV === 'production',
    follow: process.env.RUNTIME_ENV === 'production',
    googleBot: {
      index: process.env.RUNTIME_ENV === 'production',
      follow: process.env.RUNTIME_ENV === 'production'
    }
  },
  icons: {
    icon: [
      {
        url: '/images/logo/logo.svg',
        href: '/images/logo/logo.svg'
      }
    ]
  }
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover'
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang: Lang;
  };
}

export default async function RootLayout({ children, params: { lang } }: RootLayoutProps) {
  let userInfo = null;
  try {
    userInfo = await webApi.userApi.getUserInfo();
  } catch (err) {}
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${nunito.variable} ${space_mono.variable}  ${poppins.variable}`}
    >
      <head>
        <Script id="mailerlite-script" async={true} strategy="beforeInteractive">
          {`
              (function (w, d, e, u, f, l, n) {
                (w[f] = w[f] || function () {
                  (w[f].q = w[f].q || []).push(arguments);
                }),
                (l = d.createElement(e)),
                (l.async = 1),
                (l.src = u),
                (n = d.getElementsByTagName(e)[0]),
                n.parentNode.insertBefore(l, n);
              })(
                window,
                document,
                "script",
                "https://assets.mailerlite.com/js/universal.js",
                "ml"
              );
              ml("account", "1056158");
            `}
        </Script>
        <Script
          src="https://assets.mailerlite.com/jsonp/1056158/forms/pI9XNQ?callback=ml.fn.addOnClickForm"
          async={true}
          strategy="beforeInteractive"
        />
        <Script id="ml_webform_success">
          {`  function ml_webform_success_18090423() {
        var $ = ml_jQuery || jQuery;
        $(".ml-subscribe-form-18090423 .row-success").show();
        $(".ml-subscribe-form-18090423 .row-form").hide();
      }`}
        </Script>
        <Script
          src="https://groot.mailerlite.com/js/w/webforms.min.js?v2d8fb22bb5b3677f161552cd9e774127"
          async={true}
          strategy="beforeInteractive"
        />

        <Script
          src="https://groot.mailerlite.com/js/w/webforms.min.js?v2d8fb22bb5b3677f161552cd9e774127"
          async={true}
          strategy="beforeInteractive"
        />
        <Script id="ml_webform_success">
          {`  function ml_webform_success_18090423() {
        var $ = ml_jQuery || jQuery;
        $(".ml-subscribe-form-18090423 .row-success").show();
        $(".ml-subscribe-form-18090423 .row-form").hide();
      }`}
        </Script>
        <Script id="ml_takel">
          {`  fetch(
        "https://assets.mailerlite.com/jsonp/1056158/forms/132693837240862303/takel"
      );`}
        </Script>
      </head>
      <body className={`${nunito.className}`}>
        <WebAppProvider lang={lang}>
          <InitializeUserProvider lang={lang} userInfo={userInfo}>
            {children}
          </InitializeUserProvider>
        </WebAppProvider>

        <Script id="theme-script">
          {`const item = 'light';
          localStorage.setItem('theme', item);
          document.getElementsByTagName('html')[0].dataset.theme = item;
          document.documentElement.classList.add(item);
          document.documentElement.classList.remove(
            item === 'dark' ? 'light' : 'dark'
          );
          `}
        </Script>
      </body>
    </html>
  );
}
