import { z } from 'zod';
import { MAX_NUMBER_VALUE } from '../constants';
const ExpenseSchema = z.object({
    name: z.string(),
    amount: z.number().int().min(1).max(MAX_NUMBER_VALUE),
    // amount: z.number().int().min(1).max(9999999999),
});
const CurrencySchema = z.enum([
    'USD',
    'EUR',
    'JPY',
    'GBP',
    'CAD',
    'CNY',
    'KRW',
    'SGD',
    'HKD',
    'NZD',
    'INR',
    'MXN',
    'RUB',
    'ZAR',
]);
export const AccountInfoSchema = z.object({
    currency: CurrencySchema,
    income: z.number().int().min(1).max(MAX_NUMBER_VALUE),
    // income: z.number().int().min(1).max(9999999999),
    expenses: z.array(ExpenseSchema),
});
