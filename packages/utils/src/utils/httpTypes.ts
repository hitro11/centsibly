import { Budget } from '../schemas/schemas.js';

export interface HTTPresponse {
    status: 'success' | 'error';
    data: unknown;
    error: null | unknown;
    stack?: null | unknown;
}

export interface BudgetHttpResponse extends HTTPresponse {
    data: Budget | null;
}
