import { Poppins } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';
import PlausibleProvider from 'next-plausible';

import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import { TailwindIndicator } from '@/components/TailwindIndicator';
import { Metadata } from 'next';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Regime app',
  description: 'Diet app',
  icons: {
    icon: 'images/favicon.png',
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <PlausibleProvider
          domain="regime-app.pcatalani.com"
          customDomain="https://analytics.pcatalani.com"
          selfHosted
        />
      </head>
      <body
        className={cn(
          'bg-background min-h-screen font-poppins antialiased',
          poppins.variable,
        )}
        suppressHydrationWarning={true}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="h-screen pt-20">{children}</main>
            <TailwindIndicator />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
