export interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number;
  locale: string;
  name: string;
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', rate: 1.0, locale: 'en-US', name: 'US Dollar ($)' },
  INR: { code: 'INR', symbol: '₹', rate: 83.5, locale: 'en-IN', name: 'Indian Rupee (₹)' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, locale: 'de-DE', name: 'Euro (€)' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, locale: 'en-GB', name: 'British Pound (£)' },
  JPY: { code: 'JPY', symbol: '¥', rate: 158.0, locale: 'ja-JP', name: 'Japanese Yen (¥)' },
  CNY: { code: 'CNY', symbol: '¥', rate: 7.25, locale: 'zh-CN', name: 'Chinese Yuan (¥)' },
  AUD: { code: 'AUD', symbol: 'A$', rate: 1.50, locale: 'en-AU', name: 'Australian Dollar (A$)' },
  CAD: { code: 'CAD', symbol: 'C$', rate: 1.37, locale: 'en-CA', name: 'Canadian Dollar (C$)' },
};

/**
 * Formats a value given in USD into the target currency.
 */
export function formatCurrencyValue(valInUsd: number, currencyCode: string, maximumFractionDigits = 0): string {
  const config = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = valInUsd * config.rate;
  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.code,
    maximumFractionDigits: maximumFractionDigits,
    minimumFractionDigits: maximumFractionDigits
  }).format(converted);
}

/**
 * Automatically detects currency based on user timezone or locale.
 */
export function detectCurrency(): string {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const locale = navigator.language || '';

    if (timeZone.includes('Kolkata') || timeZone.includes('Calcutta') || locale.includes('IN')) {
      return 'INR';
    }
    if (timeZone.includes('Tokyo') || locale.includes('JP')) {
      return 'JPY';
    }
    if (timeZone.includes('Shanghai') || timeZone.includes('Hong_Kong') || timeZone.includes('Taipei') || locale.includes('CN') || locale.includes('HK') || locale.includes('TW')) {
      return 'CNY';
    }
    if (timeZone.includes('Sydney') || timeZone.includes('Melbourne') || timeZone.includes('Brisbane') || timeZone.includes('Adelaide') || timeZone.includes('Perth') || locale.includes('AU')) {
      return 'AUD';
    }
    if (timeZone.includes('London') || timeZone.includes('Belfast') || timeZone.includes('Dublin') || locale.includes('GB') || locale.includes('IE')) {
      return 'GBP';
    }
    if (timeZone.includes('Europe') || locale.includes('FR') || locale.includes('DE') || locale.includes('IT') || locale.includes('ES') || locale.includes('NL')) {
      return 'EUR';
    }
    if (timeZone.includes('Toronto') || timeZone.includes('Vancouver') || locale.includes('CA')) {
      return 'CAD';
    }
  } catch (e) {
    console.error('Failed to detect currency:', e);
  }
  return 'USD';
}
