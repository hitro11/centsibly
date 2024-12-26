import { Component, effect, inject, OnInit } from '@angular/core';
import { BudgetService } from '../../setup-account/services/budget/budget.service';
import { Chart, ChartItem } from 'chart.js/auto';
import { toTitleCase } from '../../shared/utils';
import { ThemeService } from '../../shared/services/theme.service';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucidePlus, lucidePlusCircle } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [HlmButtonDirective, HlmIconComponent],
    providers: [provideIcons({ lucidePlus, lucidePlusCircle })],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    budgetService = inject(BudgetService);
    themeService = inject(ThemeService);
    theme = this.themeService.getTheme();
    summaryChart: Partial<Chart<'doughnut', number[], string>> = {};

    constructor() {
        effect(() => {
            const currentTheme = this.theme();

            if (
                this.isChart(this.summaryChart) &&
                this.summaryChart.options?.plugins?.legend?.labels?.color
            ) {
                this.summaryChart.options.plugins.legend.labels.color =
                    this.setLabelColor(currentTheme);
                this.summaryChart.update();
            }
        });
    }

    async ngOnInit(): Promise<void> {
        try {
            // const budget = await this.budgetService.getLatestBudget();
            // console.log(budget);

            const budget = {
                _id: '676a12c1b6ec0f6154dfd221',
                email: 'hitrosmurf@gmail.com',
                month: '2024-12',
                currency: 'CAD',
                income: 4000,
                expenses: [
                    {
                        name: 'rent',
                        amount: 2000,
                    },
                    {
                        name: 'groceries',
                        amount: 200,
                    },
                ],
            };

            if (!budget) {
                console.log('no budget set. Please set it');
                // todo: set banner informing user they need to set a budget.
                return;
            }

            const income = budget.income;
            const expenses = budget.expenses;

            const surplus =
                income -
                expenses.reduce((total, current) => {
                    return total + current.amount;
                }, 0);

            this.summaryChart = new Chart(
                document.getElementById('budgetSummary') as ChartItem,
                {
                    type: 'doughnut',
                    data: {
                        labels: [
                            ...expenses.map(
                                (expense) =>
                                    `${toTitleCase(expense.name)}: $${expense.amount}`
                            ),
                            `Surplus: $${surplus}`,
                        ],
                        datasets: [
                            {
                                data: [
                                    ...expenses.map(
                                        (expense) => expense.amount
                                    ),
                                    surplus,
                                ],
                                backgroundColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(54, 162, 235)',
                                    'rgb(255, 205, 86)',
                                    '#398333',
                                ],
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
                                    color: this.setLabelColor(this.theme()),
                                },
                            },
                        },
                    },
                }
            );
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

    setLabelColor(theme: string): string {
        return theme === 'dark' ? '#fff' : '#000';
    }
}
