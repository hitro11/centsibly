import { z } from 'zod';
export declare const ExpenseSchema: z.ZodObject<{
    name: z.ZodString;
    amount: z.ZodNumber;
    actual: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    name: string;
    amount: number;
    actual?: number | undefined;
}, {
    name: string;
    amount: number;
    actual?: number | undefined;
}>;
export declare const CurrencySchema: z.ZodEnum<["CAD", "EUR", "GBP", "INR", "JPY", "USD"]>;
export declare const BudgetSchema: z.ZodObject<{
    email: z.ZodString;
    currency: z.ZodEnum<["CAD", "EUR", "GBP", "INR", "JPY", "USD"]>;
    income: z.ZodNumber;
    expenses: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        amount: z.ZodNumber;
        actual: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        amount: number;
        actual?: number | undefined;
    }, {
        name: string;
        amount: number;
        actual?: number | undefined;
    }>, "many">;
    month: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    currency: "CAD" | "EUR" | "GBP" | "INR" | "JPY" | "USD";
    income: number;
    expenses: {
        name: string;
        amount: number;
        actual?: number | undefined;
    }[];
    month: string;
}, {
    email: string;
    currency: "CAD" | "EUR" | "GBP" | "INR" | "JPY" | "USD";
    income: number;
    expenses: {
        name: string;
        amount: number;
        actual?: number | undefined;
    }[];
    month: string;
}>;
export declare const TransactionSchema: z.ZodObject<{
    type: z.ZodEnum<["expense", "income"]>;
    category: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    amount: number;
    type: "income" | "expense";
    category: string;
}, {
    amount: number;
    type: "income" | "expense";
    category: string;
}>;
export type Budget = z.infer<typeof BudgetSchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type Expense = z.infer<typeof ExpenseSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type httpResponse = {
    code: string;
    message: unknown;
};
