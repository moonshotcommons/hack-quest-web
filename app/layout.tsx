import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '@/styles/globals.css';
const inter = Inter({ subsets: ['latin'] });
import InitializeUserProvider from '@/components/Provider/InitializeUser';
import { ReduxProvider } from '@/store/redux';
import ThemeContextProvider from '@/store/context/theme';
import Script from 'next/script';
import ConfigProvider from '@/components/Provider/Config';
import V2Layout from '@/components/v2/Layout';
import MobileRedirect from '@/components/Provider/MobileRedirect';

export const metadata: Metadata = {
  title: 'HackQuest',
  // description: 'The connected workspace where better, faster work happens.',
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
        <ReduxProvider>
          <ThemeContextProvider>
            <MobileRedirect>
              <InitializeUserProvider>
                <ConfigProvider>
                  <V2Layout navbarData={{ navList: [] }}>{children}</V2Layout>
                </ConfigProvider>
              </InitializeUserProvider>
            </MobileRedirect>
          </ThemeContextProvider>
        </ReduxProvider>
        <Script id="theme-script" strategy="beforeInteractive">
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
