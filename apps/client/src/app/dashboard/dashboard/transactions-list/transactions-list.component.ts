import { TransactionService } from './../../services/transaction.service';
import {
    Component,
    inject,
    Input,
    input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import {
    HlmCaptionComponent,
    HlmTableComponent,
    HlmTdComponent,
    HlmThComponent,
    HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { Transaction } from 'utils/schemas/schemas';
import { toTitleCase } from '../../../shared/utils';

@Component({
    selector: 'app-transactions-list',
    standalone: true,
    imports: [
        HlmCaptionComponent,
        HlmTableComponent,
        HlmTdComponent,
        HlmThComponent,
        HlmTrowComponent,
    ],
    templateUrl: './transactions-list.component.html',
    styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent implements OnChanges {
    transactionService = inject(TransactionService);
    @Input({ required: true }) transactions!: Transaction[];

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['transactions'] && changes['transactions'].currentValue) {
            this.transactions = this.transactions.map((transaction) => ({
                ...transaction,
                type: toTitleCase(transaction.type) as 'expense' | 'income',
                category: toTitleCase(transaction.category),
            }));
        }
    }
}
