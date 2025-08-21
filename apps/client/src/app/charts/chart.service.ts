import { effect, EffectRef, inject, Injectable, Signal } from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';
import { Chart } from 'chart.js';
import { CHART_COLORS } from '../shared/constants';

@Injectable({
    providedIn: 'root',
})
export class ChartService {
    themeService = inject(ThemeService);

    constructor() {}

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
