import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import Script from 'next/script';
import Link from 'next/link';
import { PwaManager } from '@/components/PwaManager';
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
        <PwaManager />
        <footer className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <h3 className="font-display font-bold text-zinc-900 dark:text-zinc-100 text-base">EMIProX</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Professional financial calculation tools and evergreen guides. Designed for accurate planning and complete transparency.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3 text-xs uppercase tracking-wider">Calculators</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/calculators/emi" className="hover:text-emerald-600">Loan EMI Calculator</Link></li>
                <li><Link href="/calculators/home-loan" className="hover:text-emerald-600">Home Loan Calculator</Link></li>
                <li><Link href="/calculators/sip" className="hover:text-emerald-600">SIP Calculator</Link></li>
                <li><Link href="/calculators/fd" className="hover:text-emerald-600">FD Calculator</Link></li>
                <li><Link href="/calculators/gst" className="hover:text-emerald-600">GST Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3 text-xs uppercase tracking-wider">Guides & Resources</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/guides/emi-calculation-explained" className="hover:text-emerald-600">EMI Calculation Explained</Link></li>
                <li><Link href="/guides/sip-calculation-explained" className="hover:text-emerald-600">SIP Calculation Explained</Link></li>
                <li><Link href="/guides/sip-vs-fd" className="hover:text-emerald-600">SIP vs FD Comparison</Link></li>
                <li><Link href="/guides/ppf-calculation-explained" className="hover:text-emerald-600">PPF Calculation Explained</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-3 text-xs uppercase tracking-wider">Trust & Legal</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/about" aria-label="About EMIProX" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">About</Link></li>
                <li><Link href="/contact" aria-label="Contact EMIProX Support" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact</Link></li>
                <li><Link href="/privacy" aria-label="Privacy Policy" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" aria-label="Terms and Conditions" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Terms and Conditions</Link></li>
                <li><Link href="/disclaimer" aria-label="Financial Disclaimer" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Disclaimer</Link></li>
                <li><Link href="/methodology" aria-label="Calculation Methodology" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Calculation Methodology</Link></li>
                <li><Link href="/sitemap" aria-label="HTML Sitemap" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Sitemap</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center text-xs text-zinc-500">
            <p>&copy; {new Date().getFullYear()} EMIProX Financial Tools. All calculations are for educational and informational purposes only.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
