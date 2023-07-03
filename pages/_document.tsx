import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/images/logo/logo.svg" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
        {/* <title>HackQuests</title> */}
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script id="theme-script" strategy="beforeInteractive">
          {`const item = localStorage.getItem('theme') || 'light';
          localStorage.setItem('theme', item);
          document.getElementsByTagName('html')[0].dataset.theme = item;`}
        </Script>
      </body>
    </Html>
  );
}
