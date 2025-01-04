import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    inject,
    input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import {
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { Expense } from 'utils/schemas/schemas';
import { setLabelColor, toTitleCase } from '../../../shared/utils';
import { ThemeService } from '../../../shared/services/theme.service';
import { Chart } from 'chart.js';
import {
    CHART_COLOR_SPENT,
    CHART_COLOR_SURPLUS,
} from '../../../shared/constants';

@Component({
    selector: 'app-expense-category-summary',
    standalone: true,
    imports: [
        HlmCardContentDirective,
        HlmCardDirective,
        HlmCardHeaderDirective,
        HlmCardTitleDirective,
    ],
    templateUrl: './expense-category-summary.component.html',
    styleUrl: './expense-category-summary.component.scss',
})
export class ExpenseCategorySummaryComponent
    implements OnInit, AfterViewInit, OnChanges
{
    expense = input.required<Expense>();

    @ViewChild('chartCanvas') chartCanvasRef!: ElementRef;
    @ViewChild('customLegend') customLegendRef!: ElementRef;

    componentId = crypto.randomUUID(); // Generate unique ID for each instance
    chart: Chart | undefined;

    themeService = inject(ThemeService);
    theme = this.themeService.getTheme();

    constructor() {}

    // Getters for unique IDs
    get chartId(): string {
        return `chart-${this.componentId}`;
    }

    get legendId(): string {
        return `legend-${this.componentId}`;
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        const remainingBudget =
            this.expense().amount - (this.expense().actual ?? 0);

        this.chart = new Chart(this.chartCanvasRef.nativeElement, {
            type: 'doughnut',
            data: {
                labels: [
                    `Spent: $${this.expense().actual ?? 0}`,
                    `Remaining: $${remainingBudget}`,
                ],
                datasets: [
                    {
                        data: [this.expense().actual ?? 0, remainingBudget],
                        backgroundColor: [
                            CHART_COLOR_SPENT,
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
                        display: false,
                    },
                },
            },
        });

        this.generateCustomLegend();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateChart();
    }

    private updateChart() {
        if (!this.chart) {
            return;
        }

        const remainingBudget =
            this.expense().amount - (this.expense().actual ?? 0);

        this.chart!.data = {
            labels: [
                `Spent: $${this.expense().actual ?? 0}`,
                `Remaining: $${remainingBudget}`,
            ],
            datasets: [
                {
                    data: [this.expense().actual ?? 0, remainingBudget],
                    backgroundColor: [CHART_COLOR_SPENT, CHART_COLOR_SURPLUS],
                    borderColor: '#1c1b22',
                    hoverOffset: 4,
                },
            ],
        };

        this.chart.update();

        this.generateCustomLegend();
    }

    private generateCustomLegend(): void {
        if (!this.chart || !this.customLegendRef) return;

        const legendContainer = this.customLegendRef.nativeElement;
        legendContainer.innerHTML = '';

        const remainingBudget =
            this.expense().amount - (this.expense().actual ?? 0);
        const labels = [
            `Spent: $${this.expense().actual ?? 0}`,
            `Remaining: $${remainingBudget}`,
        ];

        // Reuse the built-in legendItems generator
        let items;
        if (this.chart.options?.plugins?.legend?.labels) {
            items = (
                this.chart.options.plugins.legend.labels as any
            ).generateLabels(this.chart);
        }

        // total legend item
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.style.display = 'flex';
        legendItem.style.flexDirection = 'flex-row';

        const boxSpan = document.createElement('span');
        boxSpan.style.borderColor = items[0].strokeStyle;
        boxSpan.style.borderWidth = items[0].lineWidth + 'px';
        boxSpan.style.display = 'inline-block';
        boxSpan.style.flexShrink = '0';
        boxSpan.style.height = '20px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '20px';
        boxSpan.style.borderRadius = '50%';

        const textContainer = document.createElement('p');
        textContainer.style.color = items[0].fontColor;
        textContainer.style.margin = '0';
        textContainer.style.padding = '0';
        textContainer.textContent = `Total: ${this.expense().amount}`;

        legendItem.appendChild(boxSpan);
        legendItem.appendChild(textContainer);
        legendContainer.appendChild(legendItem);

        items.forEach((item: any, i: number) => {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';
            legendItem.style.display = 'flex';
            legendItem.style.flexDirection = 'flex-row';

            // Color box
            const boxSpan = document.createElement('span');
            boxSpan.style.background = item.fillStyle;
            boxSpan.style.borderColor = item.strokeStyle;
            boxSpan.style.borderWidth = item.lineWidth + 'px';
            boxSpan.style.display = 'inline-block';
            boxSpan.style.flexShrink = '0';
            boxSpan.style.height = '20px';
            boxSpan.style.marginRight = '10px';
            boxSpan.style.width = '20px';
            boxSpan.style.borderRadius = '50%';

            const textContainer = document.createElement('p');
            textContainer.style.color = item.fontColor;
            textContainer.style.margin = '0';
            textContainer.style.padding = '0';
            textContainer.textContent = labels[i];

            legendItem.appendChild(boxSpan);
            legendItem.appendChild(textContainer);
            legendContainer.appendChild(legendItem);
        });
    }

    toTitleCase(text: string): string {
        return toTitleCase(text);
    }
}
