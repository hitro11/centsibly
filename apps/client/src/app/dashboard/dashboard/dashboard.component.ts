import {
    Component,
    effect,
    ElementRef,
    inject,
    OnInit,
    signal,
    ViewChild,
} from '@angular/core';
import { BudgetService } from '../../setup-account/services/budget/budget.service';
import { Chart, ChartItem } from 'chart.js/auto';
import {
    getColorsForSummaryChart,
    setLabelColor,
    toTitleCase,
} from '../../shared/utils';
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
export class DashboardComponent implements OnInit {
    @ViewChild('budgetSummary') chartCanvasRef!: ElementRef;

    budgetService = inject(BudgetService);
    themeService = inject(ThemeService);
    transactionsService = inject(TransactionService);
    theme = this.themeService.getTheme();
    summaryChart: Partial<Chart<'doughnut', number[], string>> = {};
    expenses: Expense[] = [];
    month = getCurrentYearMonth();
    monthasReadableText = dateToReadableText(this.month);
    budgetExists = signal(true);
    transactions: Transaction[] = [];

    constructor() {
        effect(() => {
            const currentTheme = this.theme();

            if (
                this.isChart(this.summaryChart) &&
                this.summaryChart.options?.plugins?.legend?.labels?.color
            ) {
                this.summaryChart.options.plugins.legend.labels.color =
                    setLabelColor(currentTheme);
                this.summaryChart.update();
            }
        });
    }

    async ngOnInit(): Promise<void> {
        try {
            await this.refreshTransactionsList();
            const budget = await this.budgetService.getCurrentBudget();
            if (!budget) {
                console.log('no budget set. Please set it');
                this.budgetExists.set(false);
                return;
            }
            this.budgetExists.set(true);
            const income = budget.income;
            this.expenses = budget.expenses;
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
                                    getColorsForSummaryChart(i)
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
                                color: setLabelColor(this.theme()),
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

    isChart(chart: any): chart is Chart {
        return (
            this.summaryChart.options?.plugins?.legend?.labels?.color !==
            undefined
        );
    }

    async refreshTransactionsList() {
        this.transactions = await this.transactionsService.getTransactions();
    }

    async refreshBudget() {
        this.expenses =
            ((await this.budgetService.getCurrentBudget()) ?? {}).expenses ??
            [];
    }
}
