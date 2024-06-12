import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar';
import { TailwindIndicator } from '@/components/TailwindIndicator';

const sofiaPro = localFont({
  src: [
    {
      path: '../../public/fonts/SofiaProRegular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-sofiaPro',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-background min-h-screen font-sofia antialiased',
          sofiaPro.variable,
        )}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
