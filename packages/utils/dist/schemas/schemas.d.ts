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
export declare const ExpenseSchemaForAccount: z.ZodObject<{
    name: z.ZodString;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    amount: number;
}, {
    name: string;
    amount: number;
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
export declare const AccountInfoSchema: z.ZodObject<z.objectUtil.extendShape<Omit<{
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
}, "month">, {
    expenses: z.ZodArray<z.ZodObject<Omit<{
        name: z.ZodString;
        amount: z.ZodNumber;
        actual: z.ZodOptional<z.ZodNumber>;
    }, "actual">, "strip", z.ZodTypeAny, {
        name: string;
        amount: number;
    }, {
        name: string;
        amount: number;
    }>, "many">;
}>, "strip", z.ZodTypeAny, {
    email: string;
    currency: "CAD" | "EUR" | "GBP" | "INR" | "JPY" | "USD";
    income: number;
    expenses: {
        name: string;
        amount: number;
    }[];
}, {
    email: string;
    currency: "CAD" | "EUR" | "GBP" | "INR" | "JPY" | "USD";
    income: number;
    expenses: {
        name: string;
        amount: number;
    }[];
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
export declare const TransactionArraySchema: z.ZodArray<z.ZodObject<{
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
}>, "many">;
export type Budget = z.infer<typeof BudgetSchema>;
export type AccountInfo = z.infer<typeof AccountInfoSchema>;
export type Currency = z.infer<typeof CurrencySchema>;
export type Expense = z.infer<typeof ExpenseSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type HTTPresponse = {
    status: 'success' | 'error';
    data: unknown;
    error: null | unknown;
    stack: null | unknown;
};
export type YearMonth = `${2}${0}${number}${number}-${'01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'}`;
export declare const SettingsSchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
    email: string;
    currency: "CAD" | "EUR" | "GBP" | "INR" | "JPY" | "USD";
    income: number;
    expenses: {
        name: string;
        amount: number;
        actual?: number | undefined;
    }[];
}, {
    email: string;
    currency: "CAD" | "EUR" | "GBP" | "INR" | "JPY" | "USD";
    income: number;
    expenses: {
        name: string;
        amount: number;
        actual?: number | undefined;
    }[];
}>;
//# sourceMappingURL=schemas.d.ts.map