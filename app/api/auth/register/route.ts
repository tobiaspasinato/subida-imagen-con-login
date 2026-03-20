import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { RowDataPacket, FieldPacket } from 'mysql2/promise';

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        
        // Check if user already exists
        const [existingUser] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]) as [RowDataPacket[], FieldPacket[]];
        if (existingUser.length > 0) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Insert new user into the database
        await pool.query('INSERT INTO usuarios (email, password_hash) VALUES (?, ?)', [email, hashedPassword]);
        
        return NextResponse.json({ 
            message: `Usuario ${email} registrado exitosamente!` 
        }, { status: 201 });
    } catch (error) {
        console.error('Error en registro:', error);
        return NextResponse.json(
            { error: 'Algo salió mal' },
            { status: 500 }
        );
    }
}
