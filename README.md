# LifeSync

LifeSync is a Bangladesh-focused life management web app that brings everyday planning into one place. The project combines personal productivity, finance tracking, document reminders, student planning, family coordination, health tools, and an AI-style assistant experience inside a single dashboard.

## Overview

This repository contains the current Next.js frontend experience, Tailwind-based UI system, and Prisma + PostgreSQL database foundation prepared for Supabase.

The product experience includes:

- Landing page with animated hero and LifeSync branding
- Personal dashboard and daily planning flows
- Tasks, goals, habits, and notification modules
- Finance, bills, and savings tracking
- Document reminder workflows
- Student life planning tools
- Family and health management sections
- Admin-style dashboard views

## Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS 4
- Prisma 7
- PostgreSQL / Supabase
- Radix UI primitives

## Project Structure

- `app/`
  Next.js app router entry, layout, metadata, and app icon
- `src/app/App.tsx`
  Main prototype application UI
- `src/styles/`
  Tailwind, theme, fonts, and global styling
- `prisma/schema.prisma`
  Prisma schema for the application data model
- `supabase/migrations/`
  SQL migrations for the Supabase/PostgreSQL database
- `src/generated/prisma/`
  Generated Prisma client output

## Local Setup

1. Install dependencies:

```powershell
npm.cmd install
```

2. Create a local environment file from `.env.example`:

```powershell
Copy-Item .env.example .env
```

3. Add your Supabase/PostgreSQL connection values to `.env`.

4. Generate Prisma client:

```powershell
npm.cmd run db:generate
```

5. Apply database migrations:

```powershell
npm.cmd run db:deploy
```

6. Start the development server:

```powershell
npm.cmd run dev
```

## Database Notes

This project does not upload a local database file to Supabase. Instead, it uses:

- `prisma/schema.prisma` for the data model
- `supabase/migrations/*` for SQL migrations
- `.env` for `DATABASE_URL` and `DIRECT_URL`

## Current Status

As of July 21, 2026, the repository contains:

- A working branded frontend prototype in Next.js
- Tailwind styling and custom hero animations
- Supabase-ready Prisma/PostgreSQL configuration
- A custom LifeSync SVG app icon

Some prototype flows are still UI-driven and not yet fully backed by production-grade APIs or persisted business logic.

## Scripts

- `npm.cmd run dev` - start local development server
- `npm.cmd run build` - create production build
- `npm.cmd run start` - run production server
- `npm.cmd run db:generate` - generate Prisma client
- `npm.cmd run db:deploy` - deploy Prisma migrations
- `npm.cmd run db:migrate` - create a new development migration
- `npm.cmd run db:studio` - open Prisma Studio

## Branding

LifeSync uses a custom SVG logo and icon included in:

- `app/icon.svg`

## Goal

The goal of LifeSync is simple: help users organize their life, money, responsibilities, and planning in one modern platform built with local Bangladesh-focused use cases in mind.
