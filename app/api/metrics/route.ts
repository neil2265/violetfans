import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Replace with real DB query (Supabase) and auth
  const now = new Date();
  const daily = Array.from({ length: 30 }).map((_, i) => {
    const revenue = Math.round(800 + Math.sin(i/3)*200 + Math.random()*120);
    const subs = Math.round(40 + Math.cos(i/4)*10 + Math.random()*8);
    const msgs = Math.round(300 + Math.sin(i/2.5)*60 + Math.random()*50);
    const cr = +(2.4 + Math.sin(i/5)*0.6 + Math.random()*0.3).toFixed(2);
    const day = String(i+1).padStart(2,'0');
    return { date: `2025-09-${day}`, revenue, subs, msgs, cr };
  });

  return NextResponse.json({ daily });
}
