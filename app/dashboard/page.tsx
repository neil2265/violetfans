"use client";
import { useEffect, useMemo, useState } from "react";
import { DollarSign, Users, MessageSquare, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, AreaChart, Area } from "recharts";

const demoDaily = Array.from({ length: 30 }).map((_, i) => {
  const revenue = Math.round(800 + Math.sin(i/3)*200 + Math.random()*120);
  const subs = Math.round(40 + Math.cos(i/4)*10 + Math.random()*8);
  const msgs = Math.round(300 + Math.sin(i/2.5)*60 + Math.random()*50);
  const cr = +(2.4 + Math.sin(i/5)*0.6 + Math.random()*0.3).toFixed(2);
  const day = String(i+1).padStart(2,'0');
  return { date: `2025-09-${day}`, revenue, subs, msgs, cr };
});

const demoSources = [
  { source: "IG", revenue: 5200, subs: 220 },
  { source: "X/Twitter", revenue: 4100, subs: 180 },
  { source: "Reddit", revenue: 3100, subs: 140 },
  { source: "Telegram", revenue: 2600, subs: 120 },
  { source: "TikTok", revenue: 1800, subs: 95 },
];

function formatCurrency(n: number) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
function formatNumber(n: number) { return new Intl.NumberFormat("ru-RU").format(n); }

export default function Dashboard() {
  const [range, setRange] = useState<7|30|90>(7);
  const totals = useMemo(() => {
    const slice = demoDaily.slice(-(range as number));
    const revenue = slice.reduce((s,d)=>s+d.revenue,0);
    const subs = slice.reduce((s,d)=>s+d.subs,0);
    const msgs = slice.reduce((s,d)=>s+d.msgs,0);
    const cr = (slice.reduce((s,d)=>s+d.cr,0)/slice.length).toFixed(2);
    return { revenue, subs, msgs, cr };
  }, [range]);

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-brand-600 grid place-items-center shadow-soft">
            <Sparkles className="h-5 w-5" />
          </div>
          <h1 className="text-xl font-semibold">VioletFans — Dashboard</h1>
        </div>
        <div className="flex gap-2">
          {[7,30,90].map((r) => (
            <button key={r} onClick={()=>setRange(r as 7|30|90)} className={`px-3 py-2 rounded-lg border ${range===r? "bg-brand-700 border-brand-500" : "border-[#2a2d3d]"}`}>{r}д</button>
          ))}
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <div className="card p-4"><div className="text-zinc-400 text-xs">Выручка</div><div className="text-2xl font-bold">{formatCurrency(totals.revenue)}</div></div>
        <div className="card p-4"><div className="text-zinc-400 text-xs">Новые подписчики</div><div className="text-2xl font-bold">{formatNumber(totals.subs)}</div></div>
        <div className="card p-4"><div className="text-zinc-400 text-xs">Сообщения</div><div className="text-2xl font-bold">{formatNumber(totals.msgs)}</div></div>
        <div className="card p-4"><div className="text-zinc-400 text-xs">Конверсия</div><div className="text-2xl font-bold">{totals.cr}%</div></div>
      </div>

      {/* Charts */}
      <div className="grid gap-3 lg:grid-cols-3 mt-6">
        <div className="card p-4 lg:col-span-2">
          <div className="font-semibold mb-2">Выручка по дням</div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demoDaily.slice(-(range as number))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" hide />
                <YAxis tickFormatter={(v)=> `$${Math.round(Number(v)/1000)}k`} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="card p-4">
          <div className="font-semibold mb-2">Источники трафика</div>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={demoSources}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" name="Выручка" />
                <Bar dataKey="subs" name="Подписки" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* UTM table */}
      <div className="card p-4 mt-6">
        <div className="font-semibold mb-3">UTM кампании</div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="text-zinc-400"><th className="text-left p-2">Кампания</th><th className="text-left p-2">Клики</th><th className="text-left p-2">Подписки</th><th className="text-left p-2">Выручка</th><th className="text-left p-2">CR</th></tr></thead>
            <tbody>
              {[
                { name: "ig_reels_oct_cta1", clicks: 4200, subs: 210, rev: 5100, cr: 5.0 },
                { name: "reddit_promos_sfw", clicks: 3100, subs: 160, rev: 3400, cr: 5.2 },
                { name: "x_thread_pta", clicks: 2800, subs: 120, rev: 2900, cr: 4.3 },
                { name: "tiktok_live_29_10", clicks: 1600, subs: 80, rev: 1500, cr: 5.0 },
              ].map(r => (
                <tr key={r.name} className="border-t border-[#1d2030]">
                  <td className="p-2 font-medium">{r.name}</td>
                  <td className="p-2">{r.clicks.toLocaleString("ru-RU")}</td>
                  <td className="p-2">{r.subs.toLocaleString("ru-RU")}</td>
                  <td className="p-2">{new Intl.NumberFormat("ru-RU", {style:"currency", currency:"USD", maximumFractionDigits:0}).format(r.rev)}</td>
                  <td className="p-2">{r.cr}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
