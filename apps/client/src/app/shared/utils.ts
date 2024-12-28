import { CHART_COLORS } from './constants';

export function deepCopy<T>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(deepCopy) as T;
    }

    return { ...obj } as T;
}

export function toTitleCase(text: string) {
    return text.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export function getColorsForSummaryChart(i: number): string {
    return (
        CHART_COLORS[i] ??
        '#' + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, '0')
    );
}

export function setLabelColor(theme: string): string {
    return theme === 'dark' ? '#fff' : '#000';
}
