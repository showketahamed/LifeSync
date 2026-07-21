# Supabase Database Setup

## 1. Create the project

1. Create a Supabase project in the region nearest to Bangladesh.
2. Keep the database password in a password manager. Do not place it in frontend code.
3. In **Project Settings -> Database -> Connection string**, copy the pooler connection and direct connection.

## 2. Configure local environment

Copy `.env.example` to `.env`, then replace only the placeholders:

```env
DATABASE_URL="pooler connection string with pgbouncer=true"
DIRECT_URL="direct database connection string"
AUTH_SECRET="a unique high-entropy secret"
AUTH_URL="http://localhost:3000"
```

`DATABASE_URL` is for the application. `DIRECT_URL` is for Prisma migrations.

## 3. Generate and apply schema

```powershell
cd C:\Users\88018\Desktop\next-supabase\LifeSync
npm.cmd run db:generate
npm.cmd run db:deploy
```

For a future schema change, edit `prisma/schema.prisma`, generate a new migration locally, then deploy it:

```powershell
npm.cmd run db:migrate -- --name describe_change
npm.cmd run db:deploy
```

## Security note

The planned application uses Auth.js plus Prisma, not Supabase Auth. Therefore user ownership is enforced in server-side data access by the authenticated `userId`. Do not expose the direct database URL, service role key, password hashes, encrypted document values, or health data to client components.

If a future feature uses the Supabase browser SDK directly, design and test Supabase RLS policies for that feature before enabling browser access.
