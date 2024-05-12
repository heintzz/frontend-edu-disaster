'use client';
import { RecoilRoot } from 'recoil';

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Otomanopee+One&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <RecoilRoot>
        <body>{children}</body>
      </RecoilRoot>
    </html>
  );
}
