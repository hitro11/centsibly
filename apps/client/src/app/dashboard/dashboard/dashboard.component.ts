import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    inject,
    OnDestroy,
    OnInit,
    signal,
    ViewChild,
} from '@angular/core';
import { BudgetService } from '../../setup-account-container/services/budget/budget.service';
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
import { Budget, Expense, Transaction } from 'utils/schemas/schemas';
import { dateToReadableText, getCurrentYearMonth } from 'utils/utils/utils';
import { CHART_COLOR_SURPLUS } from '../../shared/constants';
import { ExpenseCategorySummaryComponent } from './expense-category-summary/expense-category-summary.component';
import {
    HlmAlertDescriptionDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,
} from '@spartan-ng/ui-alert-helm';
import { Router, RouterModule } from '@angular/router';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { TransactionService } from '../services/transaction.service';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { ChartService } from '../../charts/chart.service';
import { UserService } from '../../setup-account-container/services/user.service';
import {
    BehaviorSubject,
    catchError,
    combineLatest,
    filter,
    map,
    Observable,
    of,
    shareReplay,
    Subject,
    take,
    takeUntil,
    tap,
} from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';

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
        HlmSpinnerComponent,
        AsyncPipe,
        NgClass,
    ],
    providers: [
        provideIcons({ lucidePlus, lucidePlusCircle, lucideAlertTriangle }),
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, AfterViewChecked, OnDestroy {
    @ViewChild('budgetSummary') chartCanvasRef!: ElementRef;

    budgetService = inject(BudgetService);
    themeService = inject(ThemeService);
    transactionsService = inject(TransactionService);
    chartService = inject(ChartService);
    userService = inject(UserService);
    router = inject(Router);

    theme = this.themeService.theme;
    summaryChart?: Partial<Chart<'doughnut', number[], string>>;
    month = getCurrentYearMonth();
    monthasReadableText = dateToReadableText(this.month);
    budgetExists = signal(false);
    loading = signal(true);

    private destroy$ = new Subject<void>();
    private chartReady$ = new BehaviorSubject<boolean>(false);
    transactions$?: Observable<Transaction[]>;
    budget$?: Observable<Budget | null>;
    expenses$?: Observable<Expense[] | null>;
    income$?: Observable<number | null>;

    constructor() {
        effect(() => {
            const theme = this.themeService.theme();

            if (
                !this.summaryChart ||
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

    ngOnInit() {
        this.budget$ = this.budgetService.getCurrentBudget().pipe(
            catchError((err) => {
                console.error('Error loading budget since', err);
                return of(null);
            }),
            takeUntil(this.destroy$)
        );

        this.transactions$ = this.transactionsService.getTransactions().pipe(
            catchError((err) => {
                console.error('Error loading transactions since', err);
                return of([]);
            }),
            takeUntil(this.destroy$)
        );

        this.expenses$ = this.budget$.pipe(
            map((budget) => budget?.expenses ?? null)
        );

        this.income$ = this.budget$.pipe(
            map((budget) => budget?.income ?? null)
        );

        combineLatest([this.budget$, this.transactions$, this.expenses$])
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.loading.set(false));

        combineLatest([
            this.budget$!.pipe(
                filter((budget): budget is Budget => budget !== null)
            ),
            this.chartReady$.pipe(filter((ready) => ready)),
        ])
            .pipe(takeUntil(this.destroy$))
            .subscribe(([budget]) => {
                this.createOrUpdateChart(budget);
            });
    }

    ngAfterViewChecked(): void {
        if (!this.chartReady$.value && this.chartCanvasRef?.nativeElement) {
            this.chartReady$.next(true);
        }
    }

    onTransactionScreenClosed() {
        this.loading.set(true);
        this.chartReady$.next(false);
        this.budgetService.refreshCurrentBudget();
        this.transactionsService.refreshTransactions();
    }

    createOrUpdateChart(budget: Budget): void {
        if (!this.chartCanvasRef?.nativeElement) {
            return;
        }

        if (this.summaryChart && this.chartService.isChart(this.summaryChart)) {
            this.summaryChart.destroy();
        }

        const surplus =
            budget.income -
            budget.expenses.reduce(
                (total, expense) => total + expense.amount,
                0
            );

        this.summaryChart = new Chart(this.chartCanvasRef.nativeElement, {
            type: 'doughnut',
            data: {
                labels: [
                    ...budget.expenses.map(
                        (expense) =>
                            `${toTitleCase(expense.name)}: ${expense.amount}`
                    ),
                    `Surplus: ${surplus}`,
                ],
                datasets: [
                    {
                        data: [
                            ...budget.expenses.map((expense) => expense.amount),
                            surplus,
                        ],
                        backgroundColor: [
                            ...budget.expenses.map((expense, i) =>
                                this.chartService.getColorsForSummaryChart(i)
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
    }

    doNothing(): void {}

    createBudgetForCurrentMonth() {
        const yearMonth = getCurrentYearMonth();

        this.budgetService
            .createBudget(yearMonth)
            .pipe(
                takeUntil(this.destroy$),
                catchError((error) => {
                    console.error(
                        `Error creating budget for month ${yearMonth} since: ${error}`
                    );
                    return of(null);
                })
            )
            .subscribe((resp) => {
                if (resp) {
                    this.router
                        .navigateByUrl('/', { skipLocationChange: true })
                        .then(() => {
                            this.router.navigate(['/dashboard']);
                        });
                }
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
