import { z } from 'zod';
import { MAX_NUMBER_VALUE } from '../constants.js';
export const ExpenseSchema = z.object({
    name: z.string(),
    amount: z.number().int().min(1).max(MAX_NUMBER_VALUE),
});
export const CurrencySchema = z.enum([
    'CAD',
    'CNY',
    'EUR',
    'GBP',
    'INR',
    'JPY',
    'USD',
]);
export const BudgetSchema = z.object({
    currency: CurrencySchema,
    income: z.number().int().min(1).max(MAX_NUMBER_VALUE),
    expenses: z.array(ExpenseSchema),
    month: z
        .string()
        .length(7)
        .regex(/^\d{4}-(0[1-9]|1[0-2])$/),
});
