import { Component, effect, inject, OnInit } from '@angular/core';
import { BudgetService } from '../../setup-account/services/budget/budget.service';
import { Chart, ChartItem } from 'chart.js/auto';
import { Budget } from 'utils/schemas/schemas';
import { toTitleCase } from '../../shared/utils';
import { ThemeService } from '../../shared/services/theme.service';
import { DeepPartial } from '../../shared/types';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [],
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
            const budgetInfo = await this.getBudgetInfo();

            if (!budgetInfo) {
                console.log('no budget set. Please set it');
                // todo: set banner informing user they need to set a budget.
                return;
            }

            const income = budgetInfo.income;
            const expenses = budgetInfo.expenses;

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

    async getBudgetInfo(): Promise<Budget> {
        return await this.budgetService.getUserAccount();
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
