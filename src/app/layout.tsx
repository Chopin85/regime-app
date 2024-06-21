import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

import { cn } from '@/lib/utils';
import Navbar from '@/components/navbar';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-background min-h-screen font-poppins antialiased',
          poppins.variable,
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
          <main className="h-screen pt-20">{children}</main>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
