export const MAX_NUMBER_VALUE = 999999999999;

export const CURRENCIES = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'JPY', value: 'JPY' },
    { label: 'GBP', value: 'GBP' },
    { label: 'AUD', value: 'AUD' },
    { label: 'CAD', value: 'CAD' },
    { label: 'CHF', value: 'CHF' },
    { label: 'CNY', value: 'CNY' },
    { label: 'KRW', value: 'KRW' },
    { label: 'SGD', value: 'SGD' },
    { label: 'HKD', value: 'HKD' },
    { label: 'NZD', value: 'NZD' },
    { label: 'INR', value: 'INR' },
    { label: 'RUB', value: 'RUB' },
] as const;

export const STRING_REGEX = /^[a-zA-Z0-9\s\(\)\-_]+$/;
export const AMOUNT_REGEX = /^\d+(\.\d{1,})?$/;
