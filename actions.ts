import { neon } from "@neondatabase/serverless";

export async function getPosts() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
        throw new Error("DATABASE_URL is not defined in the environment variables");
    }

    try {
        const sql = neon(databaseUrl);
        const posts = await sql`SELECT * FROM posts LIMIT 10;`;
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw new Error("Failed to fetch posts from the database.");
    }
}
