import postgres from "postgres";

const globalForDb = global as unknown as { db: ReturnType<typeof postgres> };

export const db =
    globalForDb.db ||
    postgres(process.env.DATABASE_URL || "", {
        prepare: false,
    });

if (process.env.NODE_ENV !== "production") {
    globalForDb.db = db;
}