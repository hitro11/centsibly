import { firstValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import {
    Transaction,
    TransactionArraySchema,
    TransactionSchema,
} from '@centsibly/utils/schemas';
import { HTTPresponse } from '@centsibly/utils/httpTypes';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    httpClient = inject(HttpClient);

    constructor() {}

    async postTransactions(transaction: Transaction): Promise<HTTPresponse> {
        return firstValueFrom(
            this.httpClient.post<HTTPresponse>(
                `${environment.API_URL}/transactions`,
                transaction
            )
        );
    }

    async getTransactions(): Promise<Transaction[] | []> {
        try {
            const response = await firstValueFrom(
                this.httpClient.get<HTTPresponse>(
                    `${environment.API_URL}/transactions`
                )
            );

            if (this.isTransactionArray(response.data)) {
                return response.data;
            } else {
                console.error(
                    'Invalid data structure: ' + JSON.stringify(response.error)
                );
                return [];
            }
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            return [];
        }
    }

    isTransactionArray(data: unknown): data is Transaction[] {
        return TransactionArraySchema.safeParse(data).success;
    }
}
