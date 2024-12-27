export function getCurrentMonthandYear() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
}

/**
 * @param {string}  month - YYYY-MM.
 * @returns {string} eg: Dec 2024
 */
export function dateToReadableText(date: string) {
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
