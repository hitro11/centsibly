export interface AccountDetails {
    currency: Currency;
    income: number;
    expenses: {
        name: string;
        amount: number;
    }[];
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
