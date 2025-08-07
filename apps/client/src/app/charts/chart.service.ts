import { effect, inject, Injectable, Signal } from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';
import { Chart } from 'chart.js';
import { CHART_COLORS } from '../shared/constants';

@Injectable({
    providedIn: 'root',
})
export class ChartService {
    themeService = inject(ThemeService);

    private _charts = new Map<Partial<Chart>, Signal<string>>();

    constructor() {}

    registerChart(chart: Partial<Chart>, themeSignal: Signal<string>) {
        effect(() => {
            const theme = themeSignal();

            if (
                !this.isChart(chart) ||
                !chart.options?.plugins?.legend?.labels?.color
            ) {
                return;
            }

            chart.options.plugins.legend.labels.color =
                this.setLabelColor(theme);
            chart.update();
        });
        this._charts.set(chart, themeSignal);
    }

    unregisterChart(chart: Partial<Chart>) {
        this._charts.delete(chart);
    }

    setChartTheme(chart: Partial<Chart>) {
        const currentTheme = this.themeService.theme();

        if (
            this.isChart(chart) &&
            chart.options?.plugins?.legend?.labels?.color
        ) {
            chart.options.plugins.legend.labels.color =
                this.setLabelColor(currentTheme);
            chart.update();
        }
    }

    isChart(chart: any): chart is Chart {
        return chart.options?.plugins?.legend?.labels?.color !== undefined;
    }

    getColorsForSummaryChart(i: number): string {
        return (
            CHART_COLORS[i] ??
            '#' +
                (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0')
        );
    }

    setLabelColor(theme: string): string {
        return theme === 'dark' ? '#fff' : '#000';
    }
}
