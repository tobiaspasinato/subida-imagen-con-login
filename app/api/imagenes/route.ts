import { NextRequest } from 'next/server';
import { cookies } from "next/headers"
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
    try{
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const res = await fetch(`${baseUrl}/api/auth/me`, {
            headers: { Cookie: 'token=' + token }
        });
        const data = await res.json();
        const userId = data.user.id;

        const body = await request.json();
        const base64 = body.base64;

        const result = await pool.query('INSERT INTO imagenes (usuario_id, base64) VALUES (?, ?)', [userId, base64]);
        return new Response(JSON.stringify(result), { status: 201 });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return new Response('Error al procesar la solicitud', { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value
        const res = await fetch(`${baseUrl}/api/auth/me`, {
            headers: { Cookie: 'token=' + token }
        });
        const data = await res.json();
        const userId = data.user.id;
        const result = await pool.query('SELECT * FROM imagenes WHERE usuario_id = ?', [userId]);
        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return new Response('Error al procesar la solicitud', { status: 500 });
    }
}