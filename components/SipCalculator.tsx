'use client';

import React, { useState, useMemo } from 'react';
import { InputSlider } from './ui/InputSlider';
import { calculateSIP, formatCurrency } from '@/lib/finance';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface SipCalculatorProps {
  currency: string;
}

export function SipCalculator({ currency }: SipCalculatorProps) {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [returnRate, setReturnRate] = useState(12);
  const [timeYears, setTimeYears] = useState(10);

  const result = useMemo(() => {
    return calculateSIP(monthlyInvestment, returnRate, timeYears);
  }, [monthlyInvestment, returnRate, timeYears]);

  const chartData = [
    { name: 'Invested Amount', value: result.totalInvestment, color: '#4f46e5' },
    { name: 'Est. Returns', value: result.wealthGained, color: '#10b981' }
  ];

  const prefix = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£'));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
        <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">SIP Details</h2>
        
        <InputSlider
          label="Monthly Investment"
          tooltip="Amount you plan to invest every month. Typical range: ₹500 - ₹1,00,000."
          value={monthlyInvestment}
          onChange={setMonthlyInvestment}
          min={500}
          max={100000}
          step={500}
          prefix={prefix}
        />
        
        <InputSlider
          label="Expected Return Rate (p.a)"
          tooltip="Estimated annual rate of return. Typical equity mutual fund range: 12% - 15% p.a."
          value={returnRate}
          onChange={setReturnRate}
          min={1}
          max={30}
          step={0.1}
          unit="%"
        />
        
        <InputSlider
          label="Time Period"
          tooltip="Investment duration in years. Long-term compounding rewards 5 to 30+ years."
          value={timeYears}
          onChange={setTimeYears}
          min={1}
          max={40}
          step={1}
          unit="Yr"
        />
      </div>

      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">Returns Breakdown</h2>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">Invested Amount</p>
                <p className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                  {formatCurrency(result.totalInvestment, currency)}
                </p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1">Est. Returns</p>
                <p className="text-xl font-semibold text-emerald-700 dark:text-emerald-300">
                  {formatCurrency(result.wealthGained, currency)}
                </p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">Total Value</p>
                <p className="text-3xl font-display font-bold tracking-tight text-emerald-700 dark:text-emerald-300">
                  {formatCurrency(result.expectedAmount, currency)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => formatCurrency(value, currency)}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <p className="mt-8 text-xs text-zinc-400 text-center">
          * Returns are not guaranteed and are based on the expected rate of return. Actual returns may vary depending on market conditions.
        </p>
      </div>
    </div>
  );
}
