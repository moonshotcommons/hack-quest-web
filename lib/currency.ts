export function currency<T extends number | string>(value: T): T {
  if (typeof value === 'number') {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }) as unknown as T;
  }

  return value;
}

export function currencyWithoutSymbol<T extends number | string>(value: T): T {
  if (typeof value === 'number') {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      currencyDisplay: 'code',
      minimumFractionDigits: 0
    }) as unknown as T;
  }

  return value;
}
