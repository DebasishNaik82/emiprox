'use client';

import React, { useState, useMemo } from 'react';
import { InputSlider } from './ui/InputSlider';
import { formatCurrency } from '@/lib/finance';
import { CheckCircle2, XCircle } from 'lucide-react';

interface EligibilityCalculatorProps {
  currency: string;
}

export function EligibilityCalculator({ currency }: EligibilityCalculatorProps) {
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [otherEmis, setOtherEmis] = useState(15000);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // Simple FOIR (Fixed Obligation to Income Ratio) calculation
  // Usually banks allow 50% of income for all EMIs combined.
  const result = useMemo(() => {
    const foir = 0.50; // 50% max
    const maxEmiAllowed = (monthlyIncome * foir) - otherEmis;
    
    if (maxEmiAllowed <= 0) {
      return { eligibleAmount: 0, maxEmi: 0, isEligible: false };
    }

    const monthlyRate = rate / 12 / 100;
    const n = tenureYears * 12;
    // maxEmi = P * r * (1+r)^n / ((1+r)^n - 1)
    // => P = maxEmi * ((1+r)^n - 1) / (r * (1+r)^n)
    const eligibleAmount = maxEmiAllowed * (Math.pow(1 + monthlyRate, n) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, n));

    return { 
      eligibleAmount, 
      maxEmi: maxEmiAllowed, 
      isEligible: true,
      foirPercent: ((maxEmiAllowed + otherEmis) / monthlyIncome) * 100
    };
  }, [monthlyIncome, otherEmis, rate, tenureYears]);

  const prefix = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£'));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
        <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">Income Details</h2>
        
        <InputSlider
          label="Gross Monthly Income"
          value={monthlyIncome}
          onChange={setMonthlyIncome}
          min={10000}
          max={1000000}
          step={5000}
          prefix={prefix}
        />
        
        <InputSlider
          label="Existing Monthly EMIs"
          value={otherEmis}
          onChange={setOtherEmis}
          min={0}
          max={500000}
          step={1000}
          prefix={prefix}
        />
        
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
          <h3 className="text-sm font-bold mb-4 text-zinc-800 dark:text-zinc-100">Loan Terms</h3>
          <InputSlider
            label="Interest Rate"
            value={rate}
            onChange={setRate}
            min={1}
            max={20}
            step={0.1}
            unit="%"
          />
          
          <InputSlider
            label="Tenure"
            value={tenureYears}
            onChange={setTenureYears}
            min={1}
            max={30}
            step={1}
            unit="Yr"
          />
        </div>
      </div>

      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 flex flex-col items-center justify-center text-center">
        {result.isEligible ? (
          <div className="max-w-md mx-auto w-full">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-2">You are eligible!</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">Based on a 50% FOIR (Fixed Obligation to Income Ratio) standard.</p>
            
            <div className="space-y-4 text-left">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">Maximum Eligible Loan Amount</p>
                <p className="text-4xl font-display font-bold tracking-tight text-emerald-700 dark:text-emerald-300">
                  {formatCurrency(result.eligibleAmount, currency)}
                </p>
              </div>
              
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">Max EMI you can afford</p>
                <p className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                  {formatCurrency(result.maxEmi, currency)} / month
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto w-full">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle size={40} />
            </div>
            <h2 className="text-2xl font-display font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-2">Not Eligible</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-8">
              Your existing EMIs consume more than 50% of your monthly income. You need to close some existing loans or increase your income to be eligible.
            </p>
            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-700/50 text-left">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">Available for new EMI</p>
                <p className="text-xl font-semibold text-red-600 dark:text-red-400">
                  {formatCurrency(0, currency)}
                </p>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}
