import pool from '../../db.js';
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const id = (await params).id;

    const query = `SELECT title, content, created_at FROM posts WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return Response.json({ error: 'Post not found' }, { status: 404 });
    }

    return Response.json({ post: rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const id = (await params).id;
  const { content } = await req.json();

  if (!id || !content) {
    console.error("Missing id or content");
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    const query = "UPDATE posts SET content = $1 WHERE id = $2 RETURNING *";
    const values = [content, id];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      console.error("No post found with the provided ID:", id);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post: rows[0] }, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const id = (await params).id;

  if (!id) {
    console.error("No ID provided for deletion");
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
    const values = [id];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      console.error("No post found with ID:", id);
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Post is successfully published!', 
      redirectTo: '/' 
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error deleting post:", error.message);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}