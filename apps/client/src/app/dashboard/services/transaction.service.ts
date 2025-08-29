import {
    catchError,
    map,
    Observable,
    of,
    shareReplay,
    startWith,
    Subject,
    switchMap,
    tap,
} from 'rxjs';
import { inject, Injectable } from '@angular/core';
import {
    Budget,
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
    private transactionsSubject$ = new Subject<void>();

    constructor() {}

    postTransactions(transaction: Transaction) {
        return this.httpClient.post<HTTPresponse>(
            `${environment.API_URL}/transactions`,
            transaction
        );
    }

    getTransactions(): Observable<Transaction[]> {
        return this.transactionsSubject$.pipe(
            startWith(void 0),
            switchMap(() =>
                this.httpClient
                    .get<HTTPresponse>(`${environment.API_URL}/transactions`)
                    .pipe(
                        map((resp) => {
                            if (this.isTransactionArray(resp.data)) {
                                return resp.data;
                            }
                            return [];
                        })
                    )
            ),
            shareReplay(1)
        );
    }

    refreshTransactions() {
        this.transactionsSubject$.next();
    }

    isTransactionArray(data: unknown): data is Transaction[] {
        return TransactionArraySchema.safeParse(data).success;
    }
}
