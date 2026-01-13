export function safeJSONParse(str, fallback) {
    try {
        const val = JSON.parse(str);
        return (val === null) ? fallback : val;
    } catch {
        return fallback;
    }
}


export function readJSON(key, fallback) {
    return safeJSONParse(localStorage.getItem(key), fallback);
}

export function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
