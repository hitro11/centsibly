import { Injectable } from '@angular/core';
import { AccountInfo, AccountInfoSchema } from '../models/AccountDetails';
import { DeepPartial } from '../../shared/types';
import { z } from 'zod';
import { deepCopy } from '../../shared/utils';

@Injectable({
    providedIn: 'root',
})
export class SetupAccountService {
    data: DeepPartial<AccountInfo> = {
        currency: 'CAD',
    };

    constructor() {}

    async onSetupFormSubmit(): Promise<void> {
        try {
            const data = this.data;
            AccountInfoSchema.parse(data);
        } catch (error) {
            console.error(error);
        }
    }
}
