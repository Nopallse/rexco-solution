import React from 'react';
import LanguageProvider from './providers/LanguageProvider';
import { Montserrat } from 'next/font/google';
import { App as AntdApp, ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';
import theme from './theme/themeConfig';
import type { Metadata } from 'next';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Rexco Solution',
  description: 'REXCO offers high-performance lubricants, cleaners, and protective solutions for automotive, industrial, and hobbyist needs, including multi-purpose',
};

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en" className={`${montserrat.variable}`} suppressHydrationWarning>
    <body suppressHydrationWarning>
      <LanguageProvider>
        <AntdRegistry>
          <ConfigProvider theme={theme}>
            <AntdApp>
              {children}
            </AntdApp>
          </ConfigProvider>
        </AntdRegistry>
      </LanguageProvider>
    </body>
  </html>
);

export default RootLayout;