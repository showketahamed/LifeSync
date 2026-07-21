import "dotenv/config";
import { defineConfig } from "prisma/config";

const migrationUrl =
  process.env.DIRECT_URL ??
  process.env.DATABASE_URL ??
  "postgresql://placeholder:placeholder@localhost:5432/placeholder";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "supabase/migrations",
  },
  datasource: {
    url: migrationUrl,
  },
});
