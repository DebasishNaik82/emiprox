'use client';

import React, { useState, useMemo } from 'react';
import { InputSlider } from './ui/InputSlider';
import { formatCurrency } from '@/lib/finance';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PrepaymentSimulatorProps {
  currency: string;
}

export function PrepaymentSimulator({ currency }: PrepaymentSimulatorProps) {
  const [principal, setPrincipal] = useState(5000000);
  const [rate, setRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [monthlyPrepayment, setMonthlyPrepayment] = useState(5000);

  const result = useMemo(() => {
    const monthlyRate = rate / 12 / 100;
    const n = tenureYears * 12;
    let monthlyEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

    // Standard Loan
    const stdTotalInterest = (monthlyEmi * n) - principal;

    // Prepayment Loan
    let balance = principal;
    let preTotalInterest = 0;
    let monthsTaken = 0;

    for (let i = 1; i <= n; i++) {
      if (balance <= 0) break;
      const interest = balance * monthlyRate;
      preTotalInterest += interest;
      
      let payment = monthlyEmi + monthlyPrepayment;
      if (payment > balance + interest) {
        payment = balance + interest;
      }
      
      const principalPart = payment - interest;
      balance -= principalPart;
      monthsTaken++;
    }

    const interestSaved = stdTotalInterest - preTotalInterest;
    const monthsSaved = n - monthsTaken;

    return {
      monthlyEmi,
      stdTotalInterest,
      preTotalInterest,
      interestSaved,
      monthsSaved,
      monthsTaken
    };
  }, [principal, rate, tenureYears, monthlyPrepayment]);

  const prefix = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£'));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
        <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">Loan Details</h2>
        
        <InputSlider
          label="Loan Amount"
          value={principal}
          onChange={setPrincipal}
          min={100000}
          max={20000000}
          step={100000}
          prefix={prefix}
        />
        
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

        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
          <InputSlider
            label="Extra Monthly Prepayment"
            value={monthlyPrepayment}
            onChange={setMonthlyPrepayment}
            min={0}
            max={100000}
            step={1000}
            prefix={prefix}
          />
        </div>
      </div>

      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">Savings Impact</h2>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">Interest Saved</p>
                <p className="text-3xl font-display font-bold tracking-tight text-emerald-700 dark:text-emerald-300">
                  {formatCurrency(result.interestSaved, currency)}
                </p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">Time Saved</p>
                <p className="text-2xl font-display font-bold tracking-tight text-emerald-700 dark:text-emerald-300">
                  {Math.floor(result.monthsSaved / 12)} Years, {result.monthsSaved % 12} Months
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">Original Interest</p>
                  <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                    {formatCurrency(result.stdTotalInterest, currency)}
                  </p>
                </div>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">New Interest</p>
                  <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                    {formatCurrency(result.preTotalInterest, currency)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-50 dark:bg-zinc-800/30 p-6 rounded-xl border border-zinc-100 dark:border-zinc-700/50 flex flex-col justify-center">
            <h3 className="text-lg font-bold mb-4 text-zinc-800 dark:text-zinc-100">Summary</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Standard EMI</span>
                <span className="font-semibold">{formatCurrency(result.monthlyEmi, currency)}</span>
              </li>
              <li className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">New Monthly Payment</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(result.monthlyEmi + monthlyPrepayment, currency)}</span>
              </li>
              <li className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-700 pb-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">Original Tenure</span>
                <span className="font-semibold">{tenureYears} Years</span>
              </li>
              <li className="flex justify-between items-center pb-2">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">New Tenure</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{Math.floor(result.monthsTaken / 12)} Yrs {result.monthsTaken % 12} Mos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
