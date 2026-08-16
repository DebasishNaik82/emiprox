import { Metadata } from 'next';
import Link from 'next/link';
import { Calculator, ArrowLeft, Mail, MessageSquare, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us - EMIProX Financial Tools Support',
  description: 'Get in touch with the EMIProX team for feedback, calculator feature suggestions, or support inquiries.',
  alternates: {
    canonical: 'https://emiprox.vercel.app/contact',
  },
};

export default function ContactPage() {
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
        <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6">Contact Us</h1>
        
        <div className="space-y-8 text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
            <p>
              We value your feedback, bug reports, and calculator feature suggestions. Reach out to our editorial and development team using the contact channels below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Email Support</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">support@emiprox.vercel.app</p>
                </div>
              </div>

              <div className="p-5 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-start gap-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Response Time</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Within 24 to 48 business hours</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500">
              <p>Please note: We do not provide individual financial advisory services or loan processing assistance via email.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
