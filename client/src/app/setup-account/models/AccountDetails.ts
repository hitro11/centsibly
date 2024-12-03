import { CURRENCIES } from '../../shared/constants';

export interface AccountDetails {
    currency:
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
