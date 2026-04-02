/**
 * Format a number as currency
 */
export function formatCurrency(value: number, currency = 'USD', locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a number as percentage
 */
export function formatPercentage(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a bigint token amount with decimals
 */
export function formatTokenAmount(amount: bigint, decimals: number, displayDecimals = 4): string {
  const divisor = BigInt(10 ** decimals);
  const integerPart = amount / divisor;
  const fractionalPart = amount % divisor;

  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const displayFractional = fractionalStr.slice(0, displayDecimals);

  return `${integerPart}.${displayFractional}`;
}

/**
 * Format an address for display (truncated)
 */
export function formatAddress(address: string, chars = 4): string {
  if (address.length < chars * 2 + 2) return address;
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format a date relative to now
 */
export function formatRelativeTime(date: Date, locale = 'en-US'): string {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const diff = date.getTime() - Date.now();
  const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));

  if (Math.abs(diffDays) < 1) {
    const diffHours = Math.round(diff / (1000 * 60 * 60));
    if (Math.abs(diffHours) < 1) {
      const diffMinutes = Math.round(diff / (1000 * 60));
      return rtf.format(diffMinutes, 'minute');
    }
    return rtf.format(diffHours, 'hour');
  }
  if (Math.abs(diffDays) < 30) {
    return rtf.format(diffDays, 'day');
  }
  if (Math.abs(diffDays) < 365) {
    return rtf.format(Math.round(diffDays / 30), 'month');
  }
  return rtf.format(Math.round(diffDays / 365), 'year');
}

/**
 * Format APY for display
 */
export function formatAPY(apy: number): string {
  return `${(apy * 100).toFixed(2)}% APY`;
}

/**
 * Format large numbers with abbreviations
 */
export function formatCompactNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2,
  }).format(value);
}
