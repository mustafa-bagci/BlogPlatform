import { NextResponse } from 'next/server';
import pool from '../db.js';

export async function GET() {
  try {
    const query = 'SELECT id, title, content, created_at FROM posts ORDER BY created_at DESC';
    const { rows } = await pool.query(query);

    return NextResponse.json({ posts: rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
