import { firstValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { AccountInfoSchema, AccountInfoSchema } from '@centsibly/utils/schemas';
import { DeepPartial } from '../../shared/types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class SetupAccountService {
    accountInfo: DeepPartial<AccountInfoSchema> = {
        currency: 'CAD',
    };

    httpClient = inject(HttpClient);
    userService = inject(UserService);

    constructor() {}

    async onSetupFormSubmit(): Promise<void> {
        try {
            
            // const data = this.data;
            const data: AccountInfoSchema = {
                currency: 'CAD',
                income: 5000,
                expenses: [
                    {name:'rent',  amount:1500},
                    {name:'groceries',  amount:200},
                ],
            }; 
            AccountInfoSchema.parse(data);
            const email = this.userService.accountInfo.email();
            await this.sendFormDataToBackend(data);
        } catch (error) {
            console.error(error);
        }
    }


    async sendFormDataToBackend(body: unknown): Promise<unknown> {
        return firstValueFrom(this.httpClient.post(`${environment.API_URL}/user/account-info`, body));
    }
    
    async getUserInfo() {
        return firstValueFrom(this.httpClient.get(`${environment.API_URL}/user/account-info`));
    }

}
