export interface EmiResult {
  monthlyEmi: number;
  totalPrincipal: number;
  totalInterest: number;
  totalRepayment: number;
  processingFeeAmount: number;
  effectiveLoanCost: number;
  interestPercentage: number;
  amortizationSchedule: AmortizationRow[];
}

export interface AmortizationRow {
  month: number;
  year: number;
  date: Date;
  emi: number;
  principal: number;
  interest: number;
  balance: number;
}

export function calculateEMI(
  principal: number,
  annualInterestRate: number,
  tenureMonths: number,
  processingFeePercent: number = 0,
  downPayment: number = 0,
  startDate: Date = new Date()
): EmiResult {
  const loanAmount = principal - downPayment;
  if (loanAmount <= 0 || tenureMonths <= 0) {
    return {
      monthlyEmi: 0,
      totalPrincipal: 0,
      totalInterest: 0,
      totalRepayment: 0,
      processingFeeAmount: 0,
      effectiveLoanCost: 0,
      interestPercentage: 0,
      amortizationSchedule: []
    };
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  
  let monthlyEmi = 0;
  if (monthlyRate === 0) {
    monthlyEmi = loanAmount / tenureMonths;
  } else {
    monthlyEmi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  }

  const processingFeeAmount = (loanAmount * processingFeePercent) / 100;
  
  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;
  let totalInterest = 0;
  
  let currentDate = new Date(startDate);

  for (let i = 1; i <= tenureMonths; i++) {
    const interest = balance * monthlyRate;
    let principalPart = monthlyEmi - interest;
    
    // Adjust last month for rounding issues
    if (i === tenureMonths) {
      principalPart = balance;
      monthlyEmi = principalPart + interest;
    }
    
    balance -= principalPart;
    if (balance < 0) balance = 0;
    
    totalInterest += interest;
    
    currentDate.setMonth(currentDate.getMonth() + 1);
    
    schedule.push({
      month: i,
      year: currentDate.getFullYear(),
      date: new Date(currentDate),
      emi: monthlyEmi,
      principal: principalPart,
      interest: interest,
      balance: balance,
    });
  }

  const totalRepayment = loanAmount + totalInterest;
  const effectiveLoanCost = totalInterest + processingFeeAmount;
  const interestPercentage = (totalInterest / totalRepayment) * 100;

  return {
    monthlyEmi,
    totalPrincipal: loanAmount,
    totalInterest,
    totalRepayment,
    processingFeeAmount,
    effectiveLoanCost,
    interestPercentage,
    amortizationSchedule: schedule,
  };
}

export function calculateSimpleInterest(principal: number, annualRate: number, timeYears: number) {
  const interest = (principal * annualRate * timeYears) / 100;
  return {
    principal,
    interest,
    total: principal + interest
  };
}

export function calculateCompoundInterest(principal: number, annualRate: number, timeYears: number, compoundingFrequencyPerYear: number = 1) {
  const amount = principal * Math.pow(1 + (annualRate / 100 / compoundingFrequencyPerYear), compoundingFrequencyPerYear * timeYears);
  const interest = amount - principal;
  return {
    principal,
    interest,
    total: amount
  };
}

export function calculateSIP(monthlyInvestment: number, expectedReturnRatePercent: number, timeYears: number) {
  const i = expectedReturnRatePercent / 12 / 100;
  const n = timeYears * 12;
  const expectedAmount = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const totalInvestment = monthlyInvestment * n;
  const wealthGained = expectedAmount - totalInvestment;
  return {
    totalInvestment,
    wealthGained,
    expectedAmount
  };
}

export function calculateFD(principal: number, annualRate: number, timeYears: number, compoundingFrequencyPerYear: number = 4) {
  // FD is essentially compound interest, typically compounded quarterly in India.
  return calculateCompoundInterest(principal, annualRate, timeYears, compoundingFrequencyPerYear);
}

export function calculateGST(amount: number, gstRatePercent: number, isInclusive: boolean = false) {
  if (isInclusive) {
    const originalAmount = amount / (1 + gstRatePercent / 100);
    const gstAmount = amount - originalAmount;
    return {
      originalAmount,
      gstAmount,
      totalAmount: amount
    };
  } else {
    const gstAmount = amount * (gstRatePercent / 100);
    return {
      originalAmount: amount,
      gstAmount,
      totalAmount: amount + gstAmount
    };
  }
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  const locale = currency === 'INR' ? 'en-IN' : 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
