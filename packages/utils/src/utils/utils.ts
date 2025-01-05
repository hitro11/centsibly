import { HTTPresponse, YearMonth } from '../../src/schemas/schemas.js';

export function getCurrentYearMonth(): YearMonth {
    const date = new Date();
    const month = date.getMonth() + 1;
    const dateMonth = month > 9 ? month : `0${month}`;
    return `${date.getFullYear()}-${dateMonth}` as YearMonth;
}

export function getPreviousYearMonth(): YearMonth {
    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month === 1) {
        month = 12;
        year = year - 1;
    }

    month = month > 9 ? month : Number(`0${month}`);
    return `${year}-${month}` as YearMonth;
}

/**
 * @param {YearMonth}  date - YYYY-MM.
 * @returns {string} eg: Dec 2024
 */
export function dateToReadableText(date: YearMonth) {
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const month = Number(date.split('-')[1]);
    const year = date.split('-')[0];
    return `${monthNames[month - 1]} ${year}`;
}

export function createHttpResponse(
    status: 'success' | 'error',
    data: unknown,
    error: unknown,
    stack?: unknown
): HTTPresponse {
    const responseObject: HTTPresponse = {
        status,
        data,
        error,
        stack,
    };

    return responseObject;
}
