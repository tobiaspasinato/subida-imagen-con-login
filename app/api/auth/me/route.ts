import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function GET(request: NextRequest) {
    // trae el token de las cookies
    const token = request.cookies.get('token')?.value;

    // Si no hay token, el usuario no está autenticado
    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
    // Verifica el jwt_secret existe en las variables de entorno
    if (!process.env.JWT_SECRET) {
        return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }
    // Verifica el token JWT y decodifica su contenido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Si el token es válido, devuelve la información del usuario
    return NextResponse.json({ message: 'Acceso permitido', user: decoded });
    } catch (error) {
        console.error('Error en Login:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}