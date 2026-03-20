import { NextRequest, NextResponse } from 'next/server';
import dotenv from 'dotenv';
import pool from '@/lib/db';
import { RowDataPacket, FieldPacket } from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Check if user exists
        const [user] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]) as [RowDataPacket[], FieldPacket[]];
        if (user.length === 0) {
            return NextResponse.json({ message: 'User does not exist' }, { status: 400 });
        }

        // Compare the provided password with the stored hash
        const validPassword = await bcrypt.compare(password, user[0].password_hash);
        if (!validPassword) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 400 });
        }

        // Verifica el jwt_secret existe en las variables de entorno
        if (!process.env.JWT_SECRET) {
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token in an HTTP-only cookie
        const response = NextResponse.json({ message: 'Login successful' });
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
            path: '/'
        });
        return response;
    } catch (error) {
        console.error('Error en Login:', error);
        return NextResponse.json(
            { error: 'Error en el servidor' },
            { status: 500 }
        );
    }
}