export default function extractToken(res: unknown): string {
    let raw = '';

    if (typeof res === 'string') {
        raw = res;
    } else if (res && typeof res === 'object') {
        const record = res as Record<string, unknown>;
        raw = String(record['token'] ?? record['accessToken'] ?? record['access_token'] ?? '');
    }

    return raw.startsWith('Bearer ') ? raw.slice(7) : raw;
}