'use client';

import React from 'react';
import { EmiCalculator } from '@/components/EmiCalculator';
import { SipCalculator } from '@/components/SipCalculator';
import { FdCalculator } from '@/components/FdCalculator';
import { InterestCalculator } from '@/components/InterestCalculator';
import { GstCalculator } from '@/components/GstCalculator';
import { LoanComparison } from '@/components/LoanComparison';
import { PrepaymentSimulator } from '@/components/PrepaymentSimulator';
import { EligibilityCalculator } from '@/components/EligibilityCalculator';
import { PpfCalculator } from '@/components/PpfCalculator';
import { RetirementCalculator } from '@/components/RetirementCalculator';

interface CalculatorClientMountProps {
  slug: string;
}

export function CalculatorClientMount({ slug }: CalculatorClientMountProps) {
  switch (slug) {
    case 'emi':
    case 'home-loan':
    case 'personal-loan':
    case 'car-loan':
    case 'education-loan':
      return <EmiCalculator type={slug === 'emi' ? 'LOAN_EMI' : slug.replace('-', '_').toUpperCase() as any} currency="INR" />;
    case 'sip':
      return <SipCalculator currency="INR" />;
    case 'fd':
      return <FdCalculator currency="INR" />;
    case 'ppf':
      return <PpfCalculator currency="INR" />;
    case 'retirement':
      return <RetirementCalculator currency="INR" />;
    case 'simple-interest':
      return <InterestCalculator type="SIMPLE" currency="INR" />;
    case 'compound-interest':
      return <InterestCalculator type="COMPOUND" currency="INR" />;
    case 'gst':
      return <GstCalculator currency="INR" />;
    case 'comparison':
      return <LoanComparison currency="INR" />;
    case 'prepayment':
      return <PrepaymentSimulator currency="INR" />;
    case 'eligibility':
      return <EligibilityCalculator currency="INR" />;
    default:
      return <EmiCalculator type="LOAN_EMI" currency="INR" />;
  }
}
