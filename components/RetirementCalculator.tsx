import React, { useState, useMemo } from 'react';
import { InputSlider } from './ui/InputSlider';
import { formatCurrency } from '@/lib/finance';

interface RetirementCalculatorProps {
  currency: string;
}

export function RetirementCalculator({ currency }: RetirementCalculatorProps) {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [preRetirementReturn, setPreRetirementReturn] = useState(12);
  const [postRetirementReturn, setPostRetirementReturn] = useState(7);

  const result = useMemo(() => {
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge);

    if (yearsToRetirement <= 0 || yearsInRetirement <= 0) {
      return { futureMonthlyExpense: 0, requiredCorpus: 0, monthlySavings: 0 };
    }

    // 1. Calculate future monthly expense at the time of retirement
    const inflationMultiplier = Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const futureMonthlyExpense = monthlyExpense * inflationMultiplier;

    // 2. Calculate Required Corpus at retirement
    // Using real rate of return post retirement
    const postRetirementRealRate = ((1 + postRetirementReturn / 100) / (1 + inflationRate / 100)) - 1;
    
    let requiredCorpus = 0;
    if (postRetirementRealRate === 0) {
        requiredCorpus = (futureMonthlyExpense * 12) * yearsInRetirement;
    } else {
        requiredCorpus = (futureMonthlyExpense * 12) * (1 - Math.pow(1 + postRetirementRealRate, -yearsInRetirement)) / postRetirementRealRate;
    }

    // 3. Calculate required monthly savings to reach the corpus
    const preRetirementMonthlyRate = preRetirementReturn / 100 / 12;
    const monthsToRetirement = yearsToRetirement * 12;
    
    let monthlySavings = 0;
    if (preRetirementMonthlyRate === 0) {
        monthlySavings = requiredCorpus / monthsToRetirement;
    } else {
        monthlySavings = requiredCorpus * preRetirementMonthlyRate / (Math.pow(1 + preRetirementMonthlyRate, monthsToRetirement) - 1);
    }

    return {
      futureMonthlyExpense,
      requiredCorpus,
      monthlySavings
    };
  }, [currentAge, retirementAge, lifeExpectancy, monthlyExpense, inflationRate, preRetirementReturn, postRetirementReturn]);

  const prefix = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : (currency === 'EUR' ? '€' : '£'));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">Personal Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <InputSlider
              label="Current Age"
              value={currentAge}
              onChange={setCurrentAge}
              min={18}
              max={65}
              step={1}
              unit=" Yrs"
            />
            
            <InputSlider
              label="Retirement Age"
              value={retirementAge}
              onChange={setRetirementAge}
              min={currentAge + 1}
              max={75}
              step={1}
              unit=" Yrs"
            />
            
            <div className="md:col-span-2">
              <InputSlider
                label="Life Expectancy"
                value={lifeExpectancy}
                onChange={setLifeExpectancy}
                min={retirementAge + 1}
                max={100}
                step={1}
                unit=" Yrs"
              />
            </div>
            
            <div className="md:col-span-2">
              <InputSlider
                label="Current Monthly Expenses"
                tooltip="Your current living expenses per month."
                value={monthlyExpense}
                onChange={setMonthlyExpense}
                min={10000}
                max={1000000}
                step={5000}
                prefix={prefix}
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-xl font-display font-bold tracking-tight mb-6 text-zinc-800 dark:text-zinc-100">Economic Factors</h2>
          
          <InputSlider
            label="Expected Inflation Rate"
            tooltip="Average rate at which prices will increase."
            value={inflationRate}
            onChange={setInflationRate}
            min={1}
            max={12}
            step={0.1}
            unit="%"
          />
          
          <InputSlider
            label="Pre-Retirement Returns"
            tooltip="Expected ROI on your investments before you retire."
            value={preRetirementReturn}
            onChange={setPreRetirementReturn}
            min={1}
            max={20}
            step={0.1}
            unit="%"
          />
          
          <InputSlider
            label="Post-Retirement Returns"
            tooltip="Expected ROI on your investments after you retire (usually safer, lower return)."
            value={postRetirementReturn}
            onChange={setPostRetirementReturn}
            min={1}
            max={15}
            step={0.1}
            unit="%"
          />
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 p-6 md:p-10 text-center">
          <h2 className="text-2xl font-display font-bold tracking-tight mb-8 text-emerald-900 dark:text-emerald-100">Your Retirement Plan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Required Corpus</div>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatCurrency(result.requiredCorpus, currency)}
              </div>
              <div className="text-xs text-zinc-400 mt-2">Total savings needed at age {retirementAge}</div>
            </div>

            <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Monthly Savings Needed</div>
              <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(result.monthlySavings, currency)}
              </div>
              <div className="text-xs text-zinc-400 mt-2">To reach your corpus by age {retirementAge}</div>
            </div>

            <div className="p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800">
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">Future Monthly Expenses</div>
              <div className="text-3xl font-bold text-orange-500 dark:text-orange-400">
                {formatCurrency(result.futureMonthlyExpense, currency)}
              </div>
              <div className="text-xs text-zinc-400 mt-2">Adjusted for {inflationRate}% inflation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
