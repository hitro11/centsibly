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
