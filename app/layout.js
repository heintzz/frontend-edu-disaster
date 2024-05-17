'use client';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { RecoilRoot } from 'recoil';

import './globals.css';
import Cookies from 'js-cookie';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Otomanopee+One&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <SpeedInsights />
      <RecoilRoot>
        <body>{children}</body>
      </RecoilRoot>
    </html>
  );
}
