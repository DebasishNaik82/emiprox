'use client';
import React, { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/finance';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';

export function CalculationHistory({ currency }: { currency: string }) {
  const [history, setHistory] = useState<any[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem('emi_history') || '[]');
    } catch {
      return [];
    }
  });

  const clearHistory = () => {
    localStorage.removeItem('emi_history');
    setHistory([]);
  };

  const deleteItem = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    localStorage.setItem('emi_history', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500">
        No saved calculations found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-bold text-zinc-800 dark:text-zinc-100">Saved Calculations</h2>
        <button onClick={clearHistory} className="text-red-500 text-sm hover:underline">Clear All</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {history.map((item) => (
          <div key={item.id} className="bg-white dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm relative group">
            <button 
              onClick={() => deleteItem(item.id)} 
              className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
            <div className="text-xs text-zinc-500 mb-2">{format(new Date(item.date), 'PP p')}</div>
            <div className="font-semibold text-emerald-600 dark:text-emerald-400 mb-4">{item.type.replace('_', ' ')}</div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Amount:</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{formatCurrency(item.principal, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Rate:</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.rate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Tenure:</span>
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{item.tenureYears} Yrs</span>
              </div>
              <div className="pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-700 flex justify-between">
                <span className="text-zinc-500">EMI:</span>
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{formatCurrency(item.monthlyEmi, currency)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
