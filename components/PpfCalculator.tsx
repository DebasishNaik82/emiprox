import React, { useState, useMemo } from 'react';
import { InputSlider } from './ui/InputSlider';
import { formatCurrency } from '@/lib/finance';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PpfCalculatorProps {
  currency: string;
}

export function PpfCalculator({ currency }: PpfCalculatorProps) {
  const [yearlyInvestment, setYearlyInvestment] = useState(150000);
  const [interestRate, setInterestRate] = useState(7.1);
  const [durationYears, setDurationYears] = useState(15);

  const result = useMemo(() => {
    let totalInvestment = 0;
    let currentBalance = 0;
    const schedule = [];
    
    const r = interestRate / 100;

    for (let year = 1; year <= durationYears; year++) {
      totalInvestment += yearlyInvestment;
      const interestForYear = (currentBalance + yearlyInvestment) * r;
      currentBalance = currentBalance + yearlyInvestment + interestForYear;
      
      schedule.push({
        year,
        investment: yearlyInvestment,
        interest: interestForYear,
        totalInterest: currentBalance - totalInvestment,
        balance: currentBalance
      });
    }

    return {
      totalInvestment,
      totalInterest: currentBalance - totalInvestment,
      maturityAmount: currentBalance,
      schedule
    };
  }, [yearlyInvestment, interestRate, durationYears]);

  const chartData = [
    { name: 'Total Investment', value: result.totalInvestment, color: '#10b981' },
    { name: 'Total Interest', value: result.totalInterest, color: '#f59e0b' }
  ];

  const investmentPercent = (result.totalInvestment / result.maturityAmount) * 100 || 0;
  const interestPercent = (result.totalInterest / result.maturityAmount) * 100 || 0;

  const prefix = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£'));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">PPF Details</h2>
          
          <InputSlider
            label="Yearly Investment"
            tooltip="Amount you invest every year (Max 1.5 Lakh in India)."
            value={yearlyInvestment}
            onChange={setYearlyInvestment}
            min={500}
            max={150000}
            step={500}
            prefix={prefix}
          />
          
          <InputSlider
            label="Interest Rate"
            tooltip="Current PPF interest rate (typically 7.1%)."
            value={interestRate}
            onChange={setInterestRate}
            min={1}
            max={15}
            step={0.1}
            unit="%"
          />
          
          <InputSlider
            label="Duration"
            tooltip="Minimum duration is 15 years."
            value={durationYears}
            onChange={setDurationYears}
            min={15}
            max={50}
            step={5}
            unit=" Yrs"
          />
        </div>

        {/* Results & Chart Section */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 flex-1 flex flex-col md:flex-row items-center">
            
            <div className="w-full md:w-1/2 pr-0 md:pr-6 mb-6 md:mb-0">
              <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">Maturity Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Total Investment</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrency(result.totalInvestment, currency)}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-zinc-500 dark:text-zinc-400">Total Interest</span>
                  <span className="font-semibold text-orange-500 dark:text-orange-400">{formatCurrency(result.totalInterest, currency)}</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-zinc-500 dark:text-zinc-400">Maturity Amount</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 block">{formatCurrency(result.maturityAmount, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar Visual */}
              <div className="mt-6">
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-emerald-600 dark:text-emerald-400">Investment ({investmentPercent.toFixed(1)}%)</span>
                  <span className="text-orange-500 dark:text-orange-400">Interest ({interestPercent.toFixed(1)}%)</span>
                </div>
                <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${investmentPercent}%` }}></div>
                  <div className="h-full bg-orange-400 transition-all duration-500" style={{ width: `${interestPercent}%` }}></div>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => formatCurrency(value as number, currency)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
