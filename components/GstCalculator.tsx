'use client';

import React, { useState, useMemo } from 'react';
import { InputSlider } from './ui/InputSlider';
import { calculateGST, formatCurrency } from '@/lib/finance';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface GstCalculatorProps {
  currency: string;
}

export function GstCalculator({ currency }: GstCalculatorProps) {
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [isInclusive, setIsInclusive] = useState(false);

  const result = useMemo(() => {
    return calculateGST(amount, gstRate, isInclusive);
  }, [amount, gstRate, isInclusive]);

  const chartData = [
    { name: 'Original Amount', value: result.originalAmount, color: '#4f46e5' },
    { name: 'GST Amount', value: result.gstAmount, color: '#f59e0b' }
  ];

  const prefix = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£'));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
        <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">GST Details</h2>
        
        <InputSlider
          label="Amount"
          value={amount}
          onChange={setAmount}
          min={100}
          max={1000000}
          step={100}
          prefix={prefix}
        />
        
        <div className="mb-6">
          <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block mb-2">GST Rate (%)</label>
          <div className="grid grid-cols-4 gap-2">
            {[5, 12, 18, 28].map(rate => (
              <button
                key={rate}
                onClick={() => setGstRate(rate)}
                className={`py-2 px-1 text-sm font-medium rounded-lg border transition-colors ${
                  gstRate === rate 
                    ? 'bg-emerald-600 text-white border-emerald-600' 
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500'
                }`}
              >
                {rate}%
              </button>
            ))}
          </div>
          <div className="mt-4">
            <InputSlider
              label="Custom Rate"
              value={gstRate}
              onChange={setGstRate}
              min={0}
              max={50}
              step={0.1}
              unit="%"
            />
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={() => setIsInclusive(false)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              !isInclusive 
                ? 'bg-emerald-600 text-white' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600'
            }`}
          >
            Exclusive
          </button>
          <button
            onClick={() => setIsInclusive(true)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              isInclusive 
                ? 'bg-emerald-600 text-white' 
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600'
            }`}
          >
            Inclusive
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">Calculation</h2>
            <div className="space-y-4">
              <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">Net Price (Original Amount)</p>
                <p className="text-xl font-semibold text-zinc-800 dark:text-zinc-200">
                  {formatCurrency(result.originalAmount, currency)}
                </p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/30">
                <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mb-1">GST Amount</p>
                <p className="text-xl font-semibold text-orange-700 dark:text-orange-300">
                  {formatCurrency(result.gstAmount, currency)}
                </p>
                <div className="flex gap-4 mt-2 text-xs font-medium text-orange-500 dark:text-orange-400">
                  <span>CGST: {formatCurrency(result.gstAmount / 2, currency)}</span>
                  <span>SGST: {formatCurrency(result.gstAmount / 2, currency)}</span>
                </div>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">Total Price (Gross Amount)</p>
                <p className="text-3xl font-display font-bold tracking-tight text-emerald-700 dark:text-emerald-300">
                  {formatCurrency(result.totalAmount, currency)}
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
