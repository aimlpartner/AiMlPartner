/**
 * Currency configuration and formatting utilities.
 * Single source of truth — used by both server-side PDF/emails and client-side dashboard.
 */

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, locale: 'en-US' },
  INR: { code: 'INR', symbol: '₹', rate: 83.5, locale: 'en-IN' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, locale: 'en-GB' },
  JPY: { code: 'JPY', symbol: '¥', rate: 158.0, locale: 'ja-JP' },
  CNY: { code: 'CNY', symbol: '¥', rate: 7.25, locale: 'zh-CN' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.50, locale: 'en-AU' },
  CAD: { code: 'CAD', symbol: 'C$', rate: 1.37, locale: 'en-CA' },
};

/**
 * Formats a USD value into the target currency with proper locale formatting.
 */
export function formatCurrencyValue(valInUsd, currencyCode) {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = valInUsd * config.rate;
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(converted);
}
