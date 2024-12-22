import { Component, inject, OnInit } from '@angular/core';
import { BudgetService } from '../../setup-account/services/budget/budget.service';
import { Chart, ChartItem } from 'chart.js/auto';
import { AccountInfo } from 'utils/schemas/schemas';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
    budgetService = inject(BudgetService);
    data: any;

    async ngOnInit() {
        const budgetInfo: AccountInfo =
            await this.budgetService.getUserAccount();

        const income = budgetInfo.income;
        const expenses = budgetInfo.expenses;

        const surplus =
            income -
            expenses.reduce((total, current) => {
                return total + current.amount;
            }, 0);

        this.data = {
            labels: [...expenses.map((expense) => expense.name), 'Surplus'],
            datasets: [
                {
                    data: [
                        ...expenses.map((expense) => expense.amount),
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
        };

        new Chart(document.getElementById('budgetSummary') as ChartItem, {
            type: 'doughnut',
            data: this.data,
        });
    }
}
