import { hash } from "@node-rs/argon2";
import postgres from "postgres";

const db = postgres(process.env.DATABASE_URL ?? "postgresql://postgres:postgres@localhost:5432/postgres", { prepare: false });

const hashed = await hash("hello", { memoryCost: 19456, timeCost: 2, outputLen: 32, parallelism: 1 });

const rows = await db`
    insert into public.app_users (first_name, last_name, email, password, account_type, email_verified, is_admin)
    values ('Admin', 'User', 'yaya@gmail.com', ${hashed}, 'email', true, true)
    on conflict (email) do update set password = excluded.password, is_admin = true
    returning id, email, is_admin
`;

console.log("✅ User created:", rows[0]);
await db.end();
