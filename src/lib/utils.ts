import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-ES').format(date);
}

/**
 * Converts cents to dollars (divides by 100)
 * @param cents - Amount in cents
 * @returns Amount in dollars
 */
export function centsToDollars(cents: number): number {
  return cents / 100;
}

/**
 * Converts dollars to cents (multiplies by 100)
 * @param dollars - Amount in dollars
 * @returns Amount in cents
 */
export function dollarsToCents(dollars: number): number {
  return Math.round(dollars * 100);
}

/**
 * Formats currency amount, assuming input is in cents
 * @param amountInCents - Amount in cents
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted currency string
 */
export function formatCurrency(amountInCents: number, currency: string = 'USD'): string {
  const amountInDollars = centsToDollars(amountInCents);
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  }).format(amountInDollars);
}

/**
 * Formats currency amount for Cuban pesos, assuming input is in cents
 * @param amountInCents - Amount in cents
 * @returns Formatted currency string in CUP
 */
export function formatCurrencyCUP(amountInCents: number): string {
  return formatCurrency(amountInCents, 'CUP');
}
