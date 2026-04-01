import { NextRequest, NextResponse } from 'next/server';
import dotenv from 'dotenv';
import pool from '@/lib/db';
import { RowDataPacket, FieldPacket } from 'mysql2/promise';

dotenv.config();

export async function GET(request: NextRequest) {
    try {
}