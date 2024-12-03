import { Injectable } from '@angular/core';
import { AccountDetails } from '../models/AccountDetails';

@Injectable({
    providedIn: 'root',
})
export class SetupAccountService {
    data: Partial<AccountDetails> = { currency: 'USD' };

    constructor() {}
}
