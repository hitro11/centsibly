import { firstValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import {
    httpResponse,
    Transaction,
    TransactionSchema,
} from '@centsibly/utils/schemas';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
    providedIn: 'root',
})
export class TransactionService {
    httpClient = inject(HttpClient);

    constructor() {}

    async postTransactions(transaction: Transaction): Promise<httpResponse> {
        return firstValueFrom(
            this.httpClient.post<httpResponse>(
                `${environment.API_URL}/transaction`,
                transaction
            )
        );
    }
}
