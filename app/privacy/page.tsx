import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - EMIProX',
  description: 'Read the Privacy Policy for EMIProX. Understand how we protect your data, use cookies, and handle analytics and advertising.',
  alternates: {
    canonical: 'https://emiprox.vercel.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Calculator className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-900 dark:from-emerald-400 dark:to-emerald-200">
              EMIProX
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 transition-colors">
            <ArrowLeft size={16} />
            <span>Home</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">Privacy Policy</h1>
        
        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-sm text-zinc-500">Last updated: August 15, 2026</p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">1. Overview</h2>
          <p>
            At EMIProX, accessible from emiprox.vercel.app, safeguarding your privacy is a top priority. This Privacy Policy document outlines types of information that is collected and recorded by EMIProX and how we use it.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">2. Client-Side Calculations & Data Storage</h2>
          <p>
            All financial calculations (loan EMIs, SIP returns, FD interest, GST) are performed directly within your browser (client-side). We do not collect, transmit, store, or sell your personal financial inputs or loan numbers on our backend servers.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">3. Log Files and Analytics</h2>
          <p>
            EMIProX follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">4. Google AdSense & Cookies</h2>
          <p>
            Google is one of a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to emiprox.vercel.app and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">5. Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
          </p>
        </div>
      </main>
    </div>
  );
}
