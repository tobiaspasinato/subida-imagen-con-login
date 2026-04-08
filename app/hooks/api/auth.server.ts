'use server';

import { cookies } from "next/headers"

interface User {
    message: string
    user: {
        id: number
        email: string
    }
}

export async function getMe(): Promise<User> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    const response = await fetch(`${baseUrl}/api/auth/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}` // ← Envía la cookie aquí
        },
        cache: 'no-store'
    })

    if (!response.ok) throw new Error('No autenticado')
    return response.json() as Promise<User>
}