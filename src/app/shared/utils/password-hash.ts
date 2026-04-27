export default async function hashPassword(password: string, salt = ''): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(`${salt}:${password}`)

    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
}
