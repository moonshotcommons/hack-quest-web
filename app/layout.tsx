import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';
const inter = Inter({ subsets: ['latin'] });
import InitializeUserProvider from '@/components/Provider/InitializeUser';

import ThemeContextProvider from '@/store/context/theme';
import Script from 'next/script';
import ConfigProvider from '@/components/Provider/Config';
import AuthModal from '@/components/Web/Business/AuthModal';

export const metadata: Metadata = {
  title: 'HackQuest',
  description: 'Learn and Grow Careers in Web3.',
  icons: {
    icon: [
      {
        url: '/images/logo/logo.svg',
        href: '/images/logo/logo.svg'
      }
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeContextProvider>
          {/* <MobileRedirect> */}
          <ConfigProvider>
            <InitializeUserProvider>
              {children}
              <AuthModal />
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
