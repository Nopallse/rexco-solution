import React from 'react';
import { Montserrat } from 'next/font/google';
import { ConfigProvider } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import './globals.css';
import theme from './theme/themeConfig';
import LayoutWrapper from '@/app/components/LayoutWrapper';
import ScrollToTop from '@/app/components/ScrollToTop';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en" className={`${montserrat.variable}`} suppressHydrationWarning>
    <body suppressHydrationWarning>
      <AntdRegistry>
        <ConfigProvider theme={theme}>
          {children}
        </ConfigProvider>
      </AntdRegistry>
    </body>
  </html>
);

export default RootLayout;