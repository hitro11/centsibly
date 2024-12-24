export function getCurrentMonth() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
}
