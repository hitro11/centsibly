import { Injectable } from '@angular/core';
import { AccountInfo, AccountInfoSchema } from 'utils/schemas';
import { DeepPartial } from '../../shared/types';

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
