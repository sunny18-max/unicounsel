import type { VisaFitLevel } from '@/types';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatScore = (score: number): string => {
  return `${score}/100`;
};

export const formatPercentage = (value: number): string => {
  return `${value}%`;
};

export const formatVisaFit = (level: VisaFitLevel): string => {
  const labels = {
    High: 'High Visa Success Rate',
    Medium: 'Moderate Visa Success Rate',
    Low: 'Challenging Visa Process'
  };
  return labels[level];
};