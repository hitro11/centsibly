import { Injectable } from '@angular/core';
import { AccountDetails } from '../models/AccountDetails';
import { DeepPartial } from '../../shared/types';

@Injectable({
    providedIn: 'root',
})
export class SetupAccountService {
    data: DeepPartial<AccountDetails> = {
        currency: 'CAD',
    };

    constructor() {}
}
