export function getMonth() {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
}
