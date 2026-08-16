import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ArrowLeft, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Financial Disclaimer - EMIProX',
  description: 'Read the official financial disclaimer for EMIProX. Calculators and educational guides are for informational purposes only.',
  alternates: {
    canonical: 'https://emiprox.vercel.app/disclaimer',
  },
};

export default function DisclaimerPage() {
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
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">Financial Disclaimer</h1>
        
        <div className="space-y-6 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl flex items-start gap-3">
            <AlertTriangle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={24} />
            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
              EMIProX is strictly an educational financial calculation platform and does not provide certified financial, legal, tax, or investment advice.
            </p>
          </div>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">1. No Professional Financial Advice</h2>
          <p>
            The calculations, figures, estimates, and articles provided on EMIProX are for informational and illustrative purposes only. They should not be interpreted as professional financial advice, loan sanction guarantees, or investment recommendations.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">2. Bank & Lender Variances</h2>
          <p>
            Actual loan EMIs, interest rates, processing fees, and tax calculations offered by banks, housing finance companies (HFCs), mutual fund houses, or tax authorities may vary based on credit score (CIBIL), applicant profile, collateral valuation, and statutory revisions. Always verify exact terms directly with your lender or financial institution before signing agreements.
          </p>

          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50 pt-4">3. Investment Risk Warning</h2>
          <p>
            Mutual fund investments (including SIPs) are subject to market risks. Past performance is no guarantee of future returns. Read all scheme-related documents carefully before investing.
          </p>
        </div>
      </main>
    </div>
  );
}
