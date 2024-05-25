'use client';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Plus_Jakarta_Sans } from 'next/font/google';

import { RecoilRoot } from 'recoil';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

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
        <body>
          <Toaster />
          <div className={jakartaSans.className}>{children}</div>
        </body>
      </RecoilRoot>
    </html>
  );
}
