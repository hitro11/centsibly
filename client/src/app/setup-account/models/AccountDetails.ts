export type AccountDetails = {
    currency: Currency;
    income: number;
    expenses: Expense[];
};

export type Currency =
    | 'USD'
    | 'EUR'
    | 'JPY'
    | 'GBP'
    | 'CAD'
    | 'CNY'
    | 'KRW'
    | 'SGD'
    | 'HKD'
    | 'NZD'
    | 'INR'
    | 'MXN'
    | 'RUB'
    | 'ZAR';

export type Expense = {
    name: string;
    amount: number;
};
