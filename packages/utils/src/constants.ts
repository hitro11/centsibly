import { CurrencySchema } from './schemas/schemas';

export const MAX_NUMBER_VALUE = 999999999999;

export const CURRENCIES = [
    { label: 'CAD', value: 'CAD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' },
    { label: 'JPY', value: 'JPY' },
    { label: 'USD', value: 'USD' },
] as const;

export const STRING_REGEX = /^[a-zA-Z0-9\s\(\)\-_]+$/;
export const AMOUNT_REGEX = /^\d+(\.\d{1,})?$/;
