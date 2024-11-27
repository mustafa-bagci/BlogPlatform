import { NextResponse } from 'next/server';
import pool from "../db.js";

export async function POST(req) {
  try {
    const { title, content } = await req.json();
    const created_at = new Date(); 

    const query = "INSERT INTO posts (title, content, created_at) VALUES ($1, $2, $3)";
    const values = [title, content, created_at];

    await pool.query(query, values);

    return NextResponse.json({ 
      message: 'Post is successfully published!', 
      redirectTo: '/' 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}