import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import Script from 'next/script';
import './globals.css'; // Global styles

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EMIProX - Advanced Financial Calculator',
  description: 'A modern, advanced Loan & EMI Calculator app for professional financial planning.',
  manifest: '/manifest.json',
  other: {
    'google-adsense-account': 'ca-pub-7850864713634423',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${outfit.variable} font-sans antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 selection:bg-emerald-500/30 flex flex-col min-h-screen`} suppressHydrationWarning>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7850864713634423"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <div className="flex-1">
          {children}
        </div>
        <footer className="py-6 text-center text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
          <p>&copy; {new Date().getFullYear()} EMIProX Financial Tools. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
