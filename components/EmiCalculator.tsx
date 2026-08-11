'use client';

import React, { useState, useMemo } from 'react';
import { InputSlider } from './ui/InputSlider';
import { calculateEMI, formatCurrency } from '@/lib/finance';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Printer, Download, Save, Share2, FileText, Check } from 'lucide-react';
import { format } from 'date-fns';
import { downloadAmortizationCSV } from '@/lib/export';

interface EmiCalculatorProps {
  type: string;
  currency: string;
}

export function EmiCalculator({ type, currency }: EmiCalculatorProps) {
  const getDefaultValues = () => {
    switch (type) {
      case 'HOME_LOAN': return { p: 5000000, r: 8.5, t: 20 };
      case 'PERSONAL_LOAN': return { p: 500000, r: 11.5, t: 3 };
      case 'CAR_LOAN': return { p: 800000, r: 9, t: 5 };
      case 'EDUCATION_LOAN': return { p: 1500000, r: 10, t: 7 };
      default: return { p: 1000000, r: 10, t: 5 };
    }
  };

  const defaults = getDefaultValues();
  const [principal, setPrincipal] = useState(defaults.p);
  const [rate, setRate] = useState(defaults.r);
  const [tenureYears, setTenureYears] = useState(defaults.t);
  const [processingFee, setProcessingFee] = useState(0);
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => {
    return calculateEMI(principal, rate, tenureYears * 12, processingFee, 0, new Date());
  }, [principal, rate, tenureYears, processingFee]);

  const chartData = [
    { name: 'Principal Loan Amount', value: result.totalPrincipal, color: '#10b981' },
    { name: 'Total Interest', value: result.totalInterest, color: '#f59e0b' }
  ];

  const yearlyChartData = useMemo(() => {
    const map = new Map<number, { year: string; principal: number; interest: number }>();
    result.amortizationSchedule.forEach((row) => {
      const year = new Date(row.date).getFullYear();
      if (!map.has(year)) {
        map.set(year, { year: `Yr ${year}`, principal: 0, interest: 0 });
      }
      const curr = map.get(year)!;
      curr.principal += row.principal;
      curr.interest += row.interest;
    });
    return Array.from(map.values());
  }, [result]);

  const principalPercent = (result.totalPrincipal / result.totalRepayment) * 100 || 0;
  const interestPercent = (result.totalInterest / result.totalRepayment) * 100 || 0;

  const handlePrint = () => {
    window.print();
  };

  const handleSave = () => {
    const history = JSON.parse(localStorage.getItem('emi_history') || '[]');
    const newItem = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type,
      principal,
      rate,
      tenureYears,
      monthlyEmi: result.monthlyEmi,
      totalInterest: result.totalInterest
    };
    localStorage.setItem('emi_history', JSON.stringify([newItem, ...history].slice(0, 50)));
    alert('Calculation saved to history!');
  };

  const handleExport = () => {
    downloadAmortizationCSV(result.amortizationSchedule);
  };

  const handleShare = () => {
    const summary = `EMIProX Calculation Summary (${type.replace('_', ' ')}):\n- Loan Amount: ${formatCurrency(principal, currency)}\n- Interest Rate: ${rate}%\n- Tenure: ${tenureYears} Years\n- Monthly EMI: ${formatCurrency(result.monthlyEmi, currency)}\n- Total Interest: ${formatCurrency(result.totalInterest, currency)}\n- Total Repayment: ${formatCurrency(result.totalRepayment, currency)}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const prefix = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£'));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 print:hidden">
        <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">Loan Details</h2>
        
        <InputSlider
          label="Loan Amount"
          tooltip="Total principal amount you wish to borrow. Range: 10k - 20Cr. Format: Numeric currency."
          value={principal}
          onChange={setPrincipal}
          min={10000}
          max={20000000}
          step={10000}
          prefix={prefix}
        />
        
        <InputSlider
          label="Interest Rate"
          tooltip="Annual percentage rate (APR) charged by lenders. Typical market ranges: Home Loans (7.5% - 11.5%), Personal Loans (10% - 18%), Car Loans (8.5% - 13%)."
          value={rate}
          onChange={setRate}
          min={1}
          max={30}
          step={0.1}
          unit="%"
        />
        
        <InputSlider
          label="Loan Tenure"
          tooltip="Duration of the loan repayment period in years. Typical range: 1 to 30 years."
          value={tenureYears}
          onChange={setTenureYears}
          min={1}
          max={30}
          step={1}
          unit="Yr"
        />

        <InputSlider
          label="Processing Fee"
          tooltip="One-time upfront fee charged by lenders for loan processing. Typical range: 0.5% - 2% of loan amount."
          value={processingFee}
          onChange={setProcessingFee}
          min={0}
          max={5}
          step={0.1}
          unit="%"
        />

        <div className="flex gap-2 mt-6">
          <button 
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors"
          >
            <Save size={18} />
            Save
          </button>
          <button 
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-xl font-semibold transition-colors"
          >
            {copied ? <Check size={18} className="text-emerald-500" /> : <Share2 size={18} />}
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>
      </div>

      {/* Results & Chart Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 print:shadow-none print:border-none">
          <div className="flex justify-between items-center mb-6 print:block">
            <h2 className="text-xl font-display font-bold tracking-tight text-zinc-800 dark:text-zinc-100">EMI & Repayment Breakdown</h2>
            <div className="flex gap-2 print:hidden">
              <button 
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Share2 size={16} />}
                <span>{copied ? 'Copied Summary' : 'Share Summary'}</span>
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-3 py-2 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg text-sm font-medium transition-colors"
              >
                <FileText size={16} />
                <span>Download PDF Report</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">Monthly EMI</p>
                  <p className="text-3xl font-display font-bold tracking-tight text-emerald-700 dark:text-emerald-300">
                    {formatCurrency(result.monthlyEmi, currency)}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">Total Principal</p>
                    <p className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                      {formatCurrency(result.totalPrincipal, currency)}
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/30">
                    <p className="text-xs text-orange-600 dark:text-orange-400 font-medium mb-1">Total Interest</p>
                    <p className="text-lg font-semibold text-orange-700 dark:text-orange-300">
                      {formatCurrency(result.totalInterest, currency)}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/30 rounded-xl border border-zinc-100 dark:border-zinc-700/50">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mb-1">Total Amount Payable</p>
                  <p className="text-xl font-display font-bold tracking-tight text-zinc-800 dark:text-zinc-200">
                    {formatCurrency(result.totalRepayment, currency)}
                  </p>
                </div>
              </div>

              {/* Progress Bar Visual */}
              <div className="mt-6">
                <div className="flex justify-between text-xs font-medium mb-2">
                  <span className="text-emerald-600 dark:text-emerald-400">Principal ({principalPercent.toFixed(1)}%)</span>
                  <span className="text-orange-500 dark:text-orange-400">Interest ({interestPercent.toFixed(1)}%)</span>
                </div>
                <div className="w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${principalPercent}%` }}></div>
                  <div className="h-full bg-orange-400 transition-all duration-500" style={{ width: `${interestPercent}%` }}></div>
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

        {/* Interactive Bar Chart: Repayment Breakdown Over Time */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 print:shadow-none print:border-none">
          <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">Yearly Principal vs Interest Repayment Breakdown</h2>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(val) => formatCurrency(val, currency)} />
                <Tooltip 
                  formatter={(value: any) => formatCurrency(value, currency)}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--tooltip-bg, #ffffff)', color: '#111' }}
                />
                <Legend />
                <Bar dataKey="principal" name="Principal Paid" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="interest" name="Interest Paid" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Amortization Schedule */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6 overflow-hidden print:shadow-none print:border-none">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-display font-bold tracking-tight text-zinc-800 dark:text-zinc-100">Amortization Schedule</h2>
            <div className="flex gap-2 print:hidden">
              <button 
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 rounded-lg text-sm font-medium transition-colors"
              >
                <Download size={16} />
                <span>Export CSV</span>
              </button>
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors"
              >
                <Printer size={16} />
                <span>Print</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto max-h-[500px] print:max-h-none print:overflow-visible">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-zinc-600 uppercase bg-zinc-50 dark:bg-zinc-800/50 dark:text-zinc-300 sticky top-0">
                <tr>
                  <th className="px-6 py-3 rounded-tl-lg">Month</th>
                  <th className="px-6 py-3">Principal</th>
                  <th className="px-6 py-3">Interest</th>
                  <th className="px-6 py-3">Total Payment</th>
                  <th className="px-6 py-3 rounded-tr-lg">Balance</th>
                </tr>
              </thead>
              <tbody>
                {result.amortizationSchedule.map((row, i) => (
                  <tr key={i} className="border-b dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{format(row.date, 'MMM yyyy')}</td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-300">{formatCurrency(row.principal, currency)}</td>
                    <td className="px-6 py-4 text-orange-600 dark:text-orange-400">{formatCurrency(row.interest, currency)}</td>
                    <td className="px-6 py-4 text-emerald-600 dark:text-emerald-400 font-medium">{formatCurrency(row.emi, currency)}</td>
                    <td className="px-6 py-4 font-medium">{formatCurrency(row.balance, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
