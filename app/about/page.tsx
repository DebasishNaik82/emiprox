import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ArrowLeft, ShieldCheck, Target, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About EMIProX - Professional Financial Calculators & Educational Tools',
  description: 'Learn about EMIProX, our mission to provide accurate, transparent, and accessible financial calculators and personal finance educational guides.',
  alternates: {
    canonical: 'https://emiprox.vercel.app/about',
  },
};

export default function AboutPage() {
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
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">About EMIProX</h1>
        
        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h2 className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <Target className="text-emerald-600" size={24} />
              Our Mission
            </h2>
            <p>
              EMIProX was built with a singular mission: to provide financial planners, borrowers, investors, and students with lightning-fast, 100% accurate, and transparent financial calculation tools without clutter, hidden paywalls, or misleading marketing claims.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="font-display font-semibold text-xl text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                <ShieldCheck className="text-emerald-600" size={20} />
                Mathematical Precision
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Every formula used across our loan EMI, SIP, FD, PPF, and retirement calculators adheres strictly to established banking and financial standards used by financial institutions worldwide.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <h3 className="font-display font-semibold text-xl text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2">
                <Users className="text-emerald-600" size={20} />
                No Financial Advice Disclaimer
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                EMIProX provides educational calculation tools and information. We do not provide personalized financial advice, loan approvals, or investment brokerage services. Please consult a certified financial advisor before making major financial commitments.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h2 className="text-2xl font-display font-bold text-zinc-900 dark:text-zinc-50">Explore Our Tools</h2>
            <p>
              Whether you are evaluating a home loan amortization schedule, planning mutual fund SIP wealth creation, or calculating GST tax components, EMIProX delivers instantaneous results with complete privacy.
            </p>
            <div className="pt-2">
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors">
                <span>View All Calculators</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
