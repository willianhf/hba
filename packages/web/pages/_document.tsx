import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="bg-gray-100 antialiased font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
