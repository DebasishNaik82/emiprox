import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ArrowLeft, ChevronRight } from 'lucide-react';
import { CALCULATOR_DATA, GUIDE_DATA } from '@/lib/seo-data';

export const metadata: Metadata = {
  title: 'Sitemap - EMIProX Calculators & Guides Index',
  description: 'Complete HTML sitemap of all financial calculators, evergreen finance guides, and trust pages on EMIProX.',
  alternates: {
    canonical: 'https://emiprox.vercel.app/sitemap',
  },
};

export default function SitemapPage() {
  const calculatorSlugs = Object.keys(CALCULATOR_DATA);
  const guideSlugs = Object.keys(GUIDE_DATA);

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

      <main className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        <div>
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-3">EMIProX Sitemap</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Complete index of all calculators, guides, and informative pages.</p>
        </div>

        {/* Main Pages */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50">Main Pages</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <li><Link href="/" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5"><ChevronRight size={14} /> Home Dashboard</Link></li>
            <li><Link href="/about" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5"><ChevronRight size={14} /> About Us</Link></li>
            <li><Link href="/contact" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5"><ChevronRight size={14} /> Contact Support</Link></li>
            <li><Link href="/privacy" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5"><ChevronRight size={14} /> Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5"><ChevronRight size={14} /> Terms & Conditions</Link></li>
            <li><Link href="/disclaimer" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5"><ChevronRight size={14} /> Financial Disclaimer</Link></li>
            <li><Link href="/methodology" className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5"><ChevronRight size={14} /> Calculation Methodology</Link></li>
          </ul>
        </div>

        {/* Financial Calculators */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50">Financial Calculators</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {calculatorSlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/calculators/${slug}`} className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5">
                  <ChevronRight size={14} />
                  {CALCULATOR_DATA[slug].name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Evergreen Guides */}
        <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
          <h2 className="text-xl font-display font-bold text-zinc-900 dark:text-zinc-50">Financial Guides & Articles</h2>
          <ul className="grid grid-cols-1 gap-3">
            {guideSlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/guides/${slug}`} className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5">
                  <ChevronRight size={14} />
                  {GUIDE_DATA[slug].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
