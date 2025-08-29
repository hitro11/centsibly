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

export function generateErrorMessageString(error: unknown): string {
    console.error(error);

    if (!error) {
        return 'Unknown error occurred';
    }

    if (typeof error === 'string') {
        return error;
    }

    if (isCustomError(error)) {
        return error.error.error;
    }

    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'object') {
        if ('error' in error && typeof error.error === 'string') {
            return error.error;
        } else if ('message' in error && typeof error.message === 'string') {
            return error.message;
        } else if ('err' in error && typeof error.err === 'string') {
            return error.err;
        }

        // For objects without specific error properties, stringify them
        try {
            return JSON.stringify(error);
        } catch {
            return String(error);
        }
    }

    if (error !== null && error !== undefined) {
        return String(error);
    }

    return 'Unknown error occurred';
}

export type LoadState<T> =
    | { status: 'loading' }
    | { status: 'success'; data: T | null }
    | { status: 'error'; error: string };

export interface CustomError extends Error {
    error: {
        data: null;
        status: 'error';
        error: string;
        stack?: any;
    };
}

function isCustomError(error: unknown): error is CustomError {
    return (
        error !== null &&
        typeof error === 'object' &&
        'error' in error &&
        typeof (error as any).error === 'object' &&
        (error as any).error !== null &&
        'error' in (error as any).error &&
        typeof (error as any).error.error === 'string' &&
        'status' in (error as any).error &&
        (error as any).error.status === 'error'
    );
}
