'use client';

import React, { useState, useMemo } from 'react';
import { InputSlider } from './ui/InputSlider';
import { calculateFD, formatCurrency } from '@/lib/finance';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface FdCalculatorProps {
  currency: string;
}

export function FdCalculator({ currency }: FdCalculatorProps) {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6.5);
  const [timeYears, setTimeYears] = useState(5);

  const result = useMemo(() => {
    return calculateFD(principal, rate, timeYears);
  }, [principal, rate, timeYears]);

  const chartData = [
    { name: 'Principal Amount', value: result.principal, color: '#4f46e5' },
    { name: 'Total Interest', value: result.interest, color: '#f59e0b' }
  ];

  const prefix = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£'));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
        <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">Fixed Deposit Details</h2>
        
        <InputSlider
          label="Total Investment"
          tooltip="Lump sum amount deposited in fixed deposit. Typical range: ₹10,000 - ₹1,00,00,000."
          value={principal}
          onChange={setPrincipal}
          min={10000}
          max={10000000}
          step={10000}
          prefix={prefix}
        />
        
        <InputSlider
          label="Interest Rate (p.a)"
          tooltip="Annual fixed interest rate offered by banks. Typical range: 5% - 8% p.a."
          value={rate}
          onChange={setRate}
          min={1}
          max={15}
          step={0.1}
          unit="%"
        />
        
        <InputSlider
          label="Time Period"
          tooltip="Tenure of the fixed deposit in years. Typical range: 1 to 10 years."
          value={timeYears}
          onChange={setTimeYears}
          min={1}
          max={20}
          step={1}
          unit="Yr"
        />
      </div>

      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">FD Returns</h2>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">Principal Amount</p>
                <p className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                  {formatCurrency(result.principal, currency)}
                </p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/30">
                <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mb-1">Total Interest (Quarterly Compounding)</p>
                <p className="text-xl font-semibold text-orange-700 dark:text-orange-300">
                  {formatCurrency(result.interest, currency)}
                </p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">Maturity Value</p>
                <p className="text-3xl font-display font-bold tracking-tight text-emerald-700 dark:text-emerald-300">
                  {formatCurrency(result.total, currency)}
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
      </div>
    </div>
  );
}
