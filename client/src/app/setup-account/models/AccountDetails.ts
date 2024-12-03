export interface AccountDetails {
    currency: Currency;
    income: number;
    expenses: {
        housingExpenseExpenses: number;
        investmentExpenses: number;
        utilitieExpenses: number;
        grocerieExpenses: number;
        entertainmenExpenses: number;
        otherExpenses: number;
    };
}

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
