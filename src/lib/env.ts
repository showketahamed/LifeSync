import { z } from "zod";
const schema = z.object({ DATABASE_URL: z.string().url().optional(), DIRECT_URL: z.string().url().optional() });
export const env = schema.parse({ DATABASE_URL: process.env.DATABASE_URL, DIRECT_URL: process.env.DIRECT_URL });
export const hasDatabaseConfiguration = () => Boolean(env.DATABASE_URL && env.DIRECT_URL);
