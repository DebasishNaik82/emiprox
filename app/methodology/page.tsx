import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ArrowLeft, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Calculation Methodology - EMIProX',
  description: 'Understand the mathematical formulas, compounding models, and algorithms used across EMIProX financial calculators.',
  alternates: {
    canonical: 'https://emiprox.vercel.app/methodology',
  },
};

export default function MethodologyPage() {
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
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">Data & Calculation Methodology</h1>
        
        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50">Transparent Mathematical Models</h2>
              <p className="text-sm text-zinc-500">How EMIProX computes financial results</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100">1. Loan EMI & Amortization</h3>
            <p>
              Loans use the reducing balance method. The formula is: <code className="bg-zinc-100 dark:bg-zinc-950 px-2 py-1 rounded text-emerald-600 dark:text-emerald-400 font-mono text-sm">EMI = [P × R × (1+R)^N] / [(1+R)^N - 1]</code>. Amortization schedules compute month-by-month principal and interest breakdown.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100">2. SIP Future Value</h3>
            <p>
              Systematic Investment Plans compute future value using the annuity formula assuming monthly compounding: <code className="bg-zinc-100 dark:bg-zinc-950 px-2 py-1 rounded text-emerald-600 dark:text-emerald-400 font-mono text-sm">FV = P × [ ( (1 + i)^n - 1 ) / i ] × (1 + i)</code>.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-display font-semibold text-zinc-900 dark:text-zinc-100">3. Fixed Deposits & Compound Interest</h3>
            <p>
              FDs compound interest quarterly (4 times a year) matching standard banking practices in India: <code className="bg-zinc-100 dark:bg-zinc-950 px-2 py-1 rounded text-emerald-600 dark:text-emerald-400 font-mono text-sm">A = P × (1 + R / 400)^(4 × t)</code>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
