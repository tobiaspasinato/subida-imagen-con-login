import { NextRequest, NextResponse } from 'next/server';
import dotenv from 'dotenv';
import pool from '@/lib/db';

dotenv.config();

export async function GET() {
    const [rows] = await pool.query('SELECT * FROM productos');
    return Response.json(rows);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        return NextResponse.json({ 
            message: `Usuario ${body.username} registrado exitosamente!` 
        }, { status: 201 });
    } catch (error) {
        console.error('Error en registro:', error);
        return NextResponse.json(
            { error: 'Algo salió mal' },
            { status: 500 }
        );
    }
}
