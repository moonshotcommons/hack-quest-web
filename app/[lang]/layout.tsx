import type { Metadata } from 'next';

import '@/styles/globals.css';
import InitializeUserProvider from '@/components/Provider/InitializeUser';

import ThemeContextProvider from '@/store/context/theme';
import Script from 'next/script';
import ConfigProvider from '@/components/Provider/Config';

import { Nunito, Space_Mono } from 'next/font/google';
import GlobalModal from '@/components/Web/GlobalModal';

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

export const metadata: Metadata = {
  title: 'HackQuest',
  description: 'Learn and Grow Careers in Web3.',
  // alternates: {
  //   canonical: 'https://www.hackquest.io'
  // },
  icons: {
    icon: [
      {
        url: '/images/logo/logo.svg',
        href: '/images/logo/logo.svg'
      }
    ]
  }
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default function RootLayout({
  children,
  params: { lang }
}: RootLayoutProps) {
  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${nunito.variable} ${space_mono.variable}`}
    >
      <body className={`${nunito.className}`}>
        <ThemeContextProvider>
          {/* <MobileRedirect> */}
          <ConfigProvider>
            <InitializeUserProvider>
              {children}
              <GlobalModal />
            </InitializeUserProvider>
          </ConfigProvider>
          {/* </MobileRedirect> */}
        </ThemeContextProvider>

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
