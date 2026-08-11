'use client';

import React, { useState, useMemo } from 'react';
import { InputSlider } from './ui/InputSlider';
import { calculateEMI, formatCurrency } from '@/lib/finance';

interface LoanComparisonProps {
  currency: string;
}

export function LoanComparison({ currency }: LoanComparisonProps) {
  const [loan1, setLoan1] = useState({ p: 5000000, r: 8.5, t: 20 });
  const [loan2, setLoan2] = useState({ p: 5000000, r: 8.0, t: 20 });
  const [loan3, setLoan3] = useState({ p: 5000000, r: 8.5, t: 15 });

  const result1 = useMemo(() => calculateEMI(loan1.p, loan1.r, loan1.t * 12), [loan1]);
  const result2 = useMemo(() => calculateEMI(loan2.p, loan2.r, loan2.t * 12), [loan2]);
  const result3 = useMemo(() => calculateEMI(loan3.p, loan3.r, loan3.t * 12), [loan3]);

  const prefix = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£'));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          { title: 'Loan 1', state: loan1, setter: setLoan1, result: result1, color: 'blue' },
          { title: 'Loan 2', state: loan2, setter: setLoan2, result: result2, color: 'emerald' },
          { title: 'Loan 3', state: loan3, setter: setLoan3, result: result3, color: 'indigo' }
        ].map((item, index) => (
          <div key={index} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
            <h2 className={`text-xl font-display font-bold tracking-tight mb-6 text-${item.color}-600 dark:text-${item.color}-400`}>{item.title}</h2>
            
            <InputSlider
              label="Loan Amount"
              value={item.state.p}
              onChange={(v) => item.setter({ ...item.state, p: v })}
              min={100000}
              max={20000000}
              step={100000}
              prefix={prefix}
            />
            
            <InputSlider
              label="Interest Rate"
              value={item.state.r}
              onChange={(v) => item.setter({ ...item.state, r: v })}
              min={1}
              max={20}
              step={0.1}
              unit="%"
            />
            
            <InputSlider
              label="Tenure"
              value={item.state.t}
              onChange={(v) => item.setter({ ...item.state, t: v })}
              min={1}
              max={30}
              step={1}
              unit="Yr"
            />

            <div className="mt-8 space-y-4 border-t border-zinc-200 dark:border-zinc-700 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Monthly EMI</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(item.result.monthlyEmi, currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Total Interest</span>
                <span className="text-lg font-semibold text-orange-600 dark:text-orange-400">{formatCurrency(item.result.totalInterest, currency)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-500 dark:text-zinc-400">Total Payment</span>
                <span className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{formatCurrency(item.result.totalRepayment, currency)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
