import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions - EMIProX',
  description: 'Read the Terms and Conditions governing the use of EMIProX financial calculators and educational guides.',
  alternates: {
    canonical: 'https://emiprox.vercel.app/terms',
  },
};

export default function TermsPage() {
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
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">Terms and Conditions</h1>
        
        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <p className="text-sm text-zinc-500">Last updated: August 15, 2026</p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">1. Acceptance of Terms</h2>
          <p>
            By accessing emiprox.vercel.app, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">2. Use License</h2>
          <p>
            Permission is granted to temporarily use EMIProX calculators and guides for personal, non-commercial transitory viewing and financial planning only.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">3. Disclaimer</h2>
          <p>
            The materials and calculation outputs on EMIProX are provided on an &apos;as is&apos; basis. EMIProX makes no warranties, expressed or implied, and hereby disclaims all warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">4. Limitations</h2>
          <p>
            In no event shall EMIProX or its operators be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the calculators on EMIProX.
          </p>
        </div>
      </main>
    </div>
  );
}
