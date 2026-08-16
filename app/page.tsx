'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun, Home as HomeIcon, Calculator, Wallet, Percent, PieChart, FileText, Share2, Printer, ChevronRight, History, TrendingUp, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EmiCalculator } from '@/components/EmiCalculator';
import { SipCalculator } from '@/components/SipCalculator';
import { FdCalculator } from '@/components/FdCalculator';
import { InterestCalculator } from '@/components/InterestCalculator';
import { GstCalculator } from '@/components/GstCalculator';
import { LoanComparison } from '@/components/LoanComparison';
import { PrepaymentSimulator } from '@/components/PrepaymentSimulator';
import { EligibilityCalculator } from '@/components/EligibilityCalculator';
import { CalculationHistory } from '@/components/CalculationHistory';
import { PpfCalculator } from '@/components/PpfCalculator';
import { RetirementCalculator } from '@/components/RetirementCalculator';

type CalculatorType = 
  'HOME' | 'HISTORY' |
  'LOAN_EMI' | 'PERSONAL_LOAN' | 'HOME_LOAN' | 'CAR_LOAN' | 'EDUCATION_LOAN' | 
  'LOAN_ELIGIBILITY' | 'LOAN_COMPARISON' | 'EMI_VS_PREPAYMENT' | 
  'SIMPLE_INTEREST' | 'COMPOUND_INTEREST' | 
  'SIP' | 'FD' | 'PPF' | 'RETIREMENT' | 'GST';

export default function Page() {
  const [activeTab, setActiveTab] = useState<CalculatorType>('HOME');
  const [currency, setCurrency] = useState('INR');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const calculators = [
    { id: 'LOAN_EMI', name: 'Loan EMI Calculator', icon: Calculator, category: 'Loans' },
    { id: 'HOME_LOAN', name: 'Home Loan Calculator', icon: HomeIcon, category: 'Loans' },
    { id: 'PERSONAL_LOAN', name: 'Personal Loan', icon: Wallet, category: 'Loans' },
    { id: 'CAR_LOAN', name: 'Car/Bike Loan', icon: Calculator, category: 'Loans' },
    { id: 'EDUCATION_LOAN', name: 'Education Loan', icon: Calculator, category: 'Loans' },
    { id: 'LOAN_ELIGIBILITY', name: 'Loan Eligibility', icon: FileText, category: 'Loans' },
    { id: 'LOAN_COMPARISON', name: 'Compare Loans', icon: PieChart, category: 'Loans' },
    { id: 'EMI_VS_PREPAYMENT', name: 'EMI vs Prepayment', icon: Calculator, category: 'Loans' },
    { id: 'SIMPLE_INTEREST', name: 'Simple Interest', icon: Percent, category: 'Investment' },
    { id: 'COMPOUND_INTEREST', name: 'Compound Interest', icon: Percent, category: 'Investment' },
    { id: 'SIP', name: 'SIP Calculator', icon: PieChart, category: 'Investment' },
    { id: 'FD', name: 'FD Calculator', icon: Wallet, category: 'Investment' },
    { id: 'PPF', name: 'PPF Calculator', icon: Landmark, category: 'Investment' },
    { id: 'RETIREMENT', name: 'Retirement Planning', icon: TrendingUp, category: 'Investment' },
    { id: 'GST', name: 'GST Calculator', icon: Percent, category: 'Tax' },
  ];

  const renderCalculator = () => {
    switch (activeTab) {
      case 'HISTORY':
        return <CalculationHistory currency={currency} />;
      case 'LOAN_EMI':
      case 'HOME_LOAN':
      case 'PERSONAL_LOAN':
      case 'CAR_LOAN':
      case 'EDUCATION_LOAN':
        return <EmiCalculator type={activeTab} currency={currency} key={activeTab} />;
      case 'SIP':
        return <SipCalculator currency={currency} />;
      case 'FD':
        return <FdCalculator currency={currency} />;
      case 'PPF':
        return <PpfCalculator currency={currency} />;
      case 'RETIREMENT':
        return <RetirementCalculator currency={currency} />;
      case 'SIMPLE_INTEREST':
        return <InterestCalculator type="SIMPLE" currency={currency} />;
      case 'COMPOUND_INTEREST':
        return <InterestCalculator type="COMPOUND" currency={currency} />;
      case 'GST':
        return <GstCalculator currency={currency} />;
      case 'LOAN_COMPARISON':
        return <LoanComparison currency={currency} />;
      case 'EMI_VS_PREPAYMENT':
        return <PrepaymentSimulator currency={currency} />;
      case 'LOAN_ELIGIBILITY':
        return <EligibilityCalculator currency={currency} />;
      default:
        return (
          <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Loans', 'Investment', 'Tax'].map(category => (
                <div key={category} className="col-span-1 sm:col-span-2 lg:col-span-3">
                  <h2 className="text-xl font-display font-bold tracking-tight mb-4 text-zinc-800 dark:text-zinc-100">{category} Calculators</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {calculators.filter(c => c.category === category).map((calc) => (
                      <button
                        key={calc.id}
                        onClick={() => setActiveTab(calc.id as CalculatorType)}
                        className="flex items-center p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-md hover:border-emerald-500 transition-all text-left group"
                      >
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg mr-4 group-hover:scale-110 transition-transform">
                          <calc.icon size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">{calc.name}</h3>
                        </div>
                        <ChevronRight size={20} className="text-zinc-400 group-hover:text-emerald-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Evergreen Financial Guides Section */}
            <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <h2 className="text-xl font-display font-bold tracking-tight mb-4 text-zinc-800 dark:text-zinc-100">Evergreen Financial Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { slug: 'emi-calculation-explained', title: 'EMI Calculation Explained' },
                  { slug: 'loan-interest-calculation-explained', title: 'Loan Interest Calculation Explained' },
                  { slug: 'sip-calculation-explained', title: 'SIP Calculation Explained' },
                  { slug: 'sip-vs-fd', title: 'SIP vs FD Comparison' },
                  { slug: 'ppf-calculation-explained', title: 'PPF Calculation Explained' },
                  { slug: 'fd-maturity-calculation-explained', title: 'FD Maturity Calculation Explained' },
                  { slug: 'gst-calculation-explained', title: 'GST Calculation Explained' },
                  { slug: 'how-to-choose-loan-tenure', title: 'How to Choose Loan Tenure' },
                  { slug: 'principal-vs-interest-explained', title: 'Principal vs Interest Explained' },
                ].map((guide) => (
                  <a
                    key={guide.slug}
                    href={`/guides/${guide.slug}`}
                    className="p-4 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-700 hover:border-emerald-500 transition-all flex items-center justify-between group"
                  >
                    <span className="font-display font-medium text-sm text-zinc-800 dark:text-zinc-200">{guide.title}</span>
                    <ChevronRight size={16} className="text-zinc-400 group-hover:text-emerald-500 transition-colors shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('HOME')}>
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Calculator className="text-white w-5 h-5" />
            </div>
            <h1 className="text-2xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-900 dark:from-emerald-400 dark:to-emerald-200">
              EMIProX
            </h1>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setActiveTab('HISTORY')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'HISTORY' 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              <History size={18} />
              <span className="hidden md:inline">History</span>
            </button>

            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-1"></div>
            
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg px-2 md:px-3 py-1.5 text-sm font-medium focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
            </select>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab !== 'HOME' && (
          <div className="mb-6 flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <button onClick={() => setActiveTab('HOME')} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Home</button>
            <ChevronRight size={16} />
            <span className="text-zinc-900 dark:text-zinc-100">
              {activeTab === 'HISTORY' ? 'Saved Calculations' : calculators.find(c => c.id === activeTab)?.name}
            </span>
          </div>
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderCalculator()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
