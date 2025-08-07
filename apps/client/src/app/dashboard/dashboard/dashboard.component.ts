import {
    Component,
    effect,
    ElementRef,
    inject,
    OnDestroy,
    OnInit,
    signal,
    ViewChild,
} from '@angular/core';
import { BudgetService } from '../../setup-account/services/budget/budget.service';
import { Chart } from 'chart.js/auto';
import { toTitleCase } from '../../shared/utils';
import { ThemeService } from '../../shared/services/theme.service';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import {
    lucideAlertTriangle,
    lucidePlus,
    lucidePlusCircle,
} from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
} from '@spartan-ng/ui-dialog-helm';
import {
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';

import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { Expense, Transaction } from 'utils/schemas/schemas';
import { dateToReadableText, getCurrentYearMonth } from 'utils/utils/utils';
import { CHART_COLOR_SURPLUS } from '../../shared/constants';
import { ExpenseCategorySummaryComponent } from './expense-category-summary/expense-category-summary.component';
import {
    HlmAlertDescriptionDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,
} from '@spartan-ng/ui-alert-helm';
import { RouterModule } from '@angular/router';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionService } from '../services/transaction.service';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { ChartService } from '../../charts/chart.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        HlmButtonDirective,
        HlmIconComponent,
        AddTransactionComponent,
        HlmDialogComponent,
        HlmDialogContentComponent,
        HlmDialogHeaderComponent,
        HlmDialogFooterComponent,
        BrnDialogContentDirective,
        BrnDialogTriggerDirective,
        ExpenseCategorySummaryComponent,
        HlmAlertDescriptionDirective,
        HlmAlertDirective,
        HlmAlertIconDirective,
        RouterModule,
        TransactionsListComponent,
        HlmSeparatorDirective,
        BrnSeparatorComponent,
    ],
    providers: [
        provideIcons({ lucidePlus, lucidePlusCircle, lucideAlertTriangle }),
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
    @ViewChild('budgetSummary') chartCanvasRef!: ElementRef;

    budgetService = inject(BudgetService);
    themeService = inject(ThemeService);
    transactionsService = inject(TransactionService);
    chartService = inject(ChartService);

    theme = this.themeService.theme;
    summaryChart: Partial<Chart<'doughnut', number[], string>> = {};
    expenses: Expense[] = [];
    month = getCurrentYearMonth();
    monthasReadableText = dateToReadableText(this.month);
    budgetExists = signal(true);
    transactions: Transaction[] = [];

    constructor() {
        effect(() => {
            const theme = this.themeService.theme();

            if (
                !this.chartService.isChart(this.summaryChart) ||
                !this.summaryChart.options?.plugins?.legend?.labels?.color
            ) {
                return;
            }

            this.summaryChart.options.plugins.legend.labels.color =
                this.chartService.setLabelColor(theme);
            this.summaryChart.update();
        });
    }

    async ngOnInit(): Promise<void> {
        try {
            await this.refreshTransactionsList();
            const currentBudget = await this.budgetService.getCurrentBudget();
            if (!currentBudget) {
                console.warn('no budget set. Please set it');
                this.budgetExists.set(false);
                return;
            }
            this.budgetExists.set(true);
            const income = currentBudget.income;
            this.expenses = currentBudget.expenses;
            const surplus =
                income -
                this.expenses.reduce((total, current) => {
                    return total + current.amount;
                }, 0);
            this.summaryChart = new Chart(this.chartCanvasRef.nativeElement, {
                type: 'doughnut',
                data: {
                    labels: [
                        ...this.expenses.map(
                            (expense) =>
                                `${toTitleCase(expense.name)}: $${expense.amount}`
                        ),
                        `Surplus: $${surplus}`,
                    ],
                    datasets: [
                        {
                            data: [
                                ...this.expenses.map(
                                    (expense) => expense.amount
                                ),
                                surplus,
                            ],
                            backgroundColor: [
                                ...this.expenses.map((expense, i) =>
                                    this.chartService.getColorsForSummaryChart(
                                        i
                                    )
                                ),
                                CHART_COLOR_SURPLUS,
                            ],
                            borderColor: '#1c1b22',
                            hoverOffset: 4,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            position: 'bottom',
                            align: 'center',
                            labels: {
                                padding: 25,
                                color: this.chartService.setLabelColor(
                                    this.theme()
                                ),
                                usePointStyle: true,
                            },
                        },
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    async refreshTransactionsList() {
        this.transactions = await this.transactionsService.getTransactions();
    }

    async refreshBudget() {
        this.expenses =
            ((await this.budgetService.getCurrentBudget()) ?? {}).expenses ??
            [];
    }

    ngOnDestroy() {}
}
