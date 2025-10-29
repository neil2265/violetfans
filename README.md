# VioletFans — Purple SaaS Starter (FansMetric-like)
Next.js 14 + Tailwind + Supabase + Recharts. Фиолетовая тема, дашборд, мок-API.

## Быстрый старт
1) Установи зависимости
```bash
npm i    # или pnpm i / yarn
```
2) Создай `.env.local` на основе `.env.example`
3) Старт
```bash
npm run dev
```

## Деплой на Vercel
- Импортируй репозиторий в Vercel
- Добавь переменные окружения из `.env.example`
- Запусти Build & Deploy

## Подключение Supabase (реальные данные)
- Создай проект на https://supabase.com
- Скопируй URL и anon key -> в `.env.local`
- Создай таблицы (пример):
```sql
create table earnings_daily (
  id bigint generated always as identity primary key,
  model_id uuid not null,
  d date not null,
  revenue_usd numeric not null,
  subs int not null,
  msgs int not null,
  cr numeric not null
);

create table traffic_sources (
  id bigint generated always as identity primary key,
  model_id uuid not null,
  source text not null,
  revenue_usd numeric not null,
  subs int not null
);

create table utm_campaigns (
  id bigint generated always as identity primary key,
  model_id uuid not null,
  name text not null,
  clicks int not null,
  subs int not null,
  rev_usd numeric not null,
  cr numeric not null
);
```

Затем замени мок-эндпоинт `app/api/metrics/route.ts` на запросы в Supabase.
Пример:
```ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data: daily } = await supabase
    .from("earnings_daily")
    .select("d as date, revenue_usd as revenue, subs, msgs, cr")
    .order("d", { ascending: true })
    .limit(90);

  return NextResponse.json({ daily });
}
```

## Stripe (биллинг)
- Создай продукт и тарифы в Stripe
- Сохрани `STRIPE_SECRET_KEY` в Vercel Environment
- Добавь страницу /billing и серверные webhooks (добавь позже)

## Папки
- `app/page.tsx` — лендинг в фиолетовой теме
- `app/dashboard/page.tsx` — дашборд (превью)
- `app/api/metrics/route.ts` — мок-API (заменить на Supabase)
- `lib/supabaseClient.ts` — клиент Supabase
- `app/globals.css` + `tailwind.config.ts` — стили/цвета
