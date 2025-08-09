import { z } from 'zod';
import { MAX_NUMBER_VALUE, MIN_NUMBER_VALUE } from '../constants.js';

// error mesasges
const MIN_AMOUNT_ERROR_MESSAGE = `Amount must be greater than ${MIN_NUMBER_VALUE}`;
const MAX_AMOUNT_ERROR_MESSAGE = `Amount must be less than ${MAX_NUMBER_VALUE}`;

// Schemas
const dollarAmountZod = z
    .number({ message: 'Invalid input' })
    .min(MIN_NUMBER_VALUE, MIN_AMOUNT_ERROR_MESSAGE)
    .max(MAX_NUMBER_VALUE, MAX_AMOUNT_ERROR_MESSAGE);

export const ExpenseSchema = z.object({
    name: z.string(),
    amount: dollarAmountZod,
    actual: dollarAmountZod.optional(),
});

export const CurrencySchema = z.enum([
    'CAD',
    'EUR',
    'GBP',
    'INR',
    'JPY',
    'USD',
]);

export const BudgetSchema = z.object({
    email: z.string().email('Invalid email'),
    currency: CurrencySchema,
    income: dollarAmountZod,
    expenses: z.array(ExpenseSchema),
    month: z
        .string()
        .length(7)
        .regex(/^\d{4}-(0[1-9]|1[0-2])$/),
});

export const AccountInfoSchema = BudgetSchema.omit({ month: true });

export const TransactionSchema = z.object({
    type: z.enum(['expense', 'income'], { message: 'Please sleect a type' }),
    category: z.string({ message: 'Please sleect a category' }).min(1),
    amount: dollarAmountZod,
});

export const TransactionArraySchema = z.array(TransactionSchema);

// Types
export type Budget = z.infer<typeof BudgetSchema>;
export type AccountInfo = z.infer<typeof AccountInfoSchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type Expense = z.infer<typeof ExpenseSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;

// non schema types
export type HTTPresponse = {
    status: 'success' | 'error';
    data: unknown;
    error: null | unknown;
    stack: null | unknown;
};

export type YearMonth =
    `${2}${0}${number}${number}-${'01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'}`;

export const SettingsSchema = z.object({
    email: z.string().email('Invalid email'),
    currency: CurrencySchema,
    income: dollarAmountZod,
    expenses: z.array(ExpenseSchema),
});
