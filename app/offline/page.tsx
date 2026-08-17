'use client';

import React from 'react';
import Link from 'next/link';
import { WifiOff, Calculator, ArrowLeft, RefreshCw } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto">
          <WifiOff size={32} />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-display font-bold tracking-tight">You are offline</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            It looks like you have lost your internet connection. However, previously cached calculators and guides remain fully available offline!
          </p>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-left text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
          <div className="font-semibold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
            <Calculator size={16} className="text-emerald-600" />
            <span>Available Offline Calculators:</span>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            <li>EMI & Loan Calculators (Home, Personal, Car)</li>
            <li>SIP & Mutual Fund Calculators</li>
            <li>Fixed Deposit (FD) & PPF Calculators</li>
            <li>GST & Interest Calculators</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => typeof window !== 'undefined' && window.location.reload()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm transition-colors"
          >
            <RefreshCw size={16} />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl font-medium text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
