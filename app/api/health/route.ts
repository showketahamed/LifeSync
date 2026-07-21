import { NextResponse } from "next/server";
import { hasDatabaseConfiguration } from "@/lib/env";
export function GET() { return NextResponse.json({ status: "ok", databaseConfigured: hasDatabaseConfiguration() }); }
