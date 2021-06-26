export default function getHashParams(str) {
    const query = str.substr(1);
    const result = {};

    if (query !== undefined) {
        query.split('&').forEach((part) => {
            const item = part.split('=');
            result[item[0]] = decodeURIComponent(item[1]);
        });
    }
    return result;
}