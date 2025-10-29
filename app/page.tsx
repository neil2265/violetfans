import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <main className="min-h-screen">
      <nav className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-brand-600 grid place-items-center shadow-soft">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-bold tracking-tight">VioletFans</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="btn">Open dashboard <ArrowRight className="h-4 w-4"/></Link>
        </div>
      </nav>

      <section className="text-center mt-20 px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          The purple analytics & CRM for <span className="text-brand-400">OnlyFans</span> agencies
        </h1>
        <p className="mt-4 text-lg muted max-w-2xl mx-auto">
          All‑in‑one metrics, chatting & automations. Built for speed and clarity.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/dashboard" className="btn">Start preview</Link>
          <a href="#features" className="px-4 py-2 rounded-lg border border-[#2a2d3d]">Features</a>
        </div>
        <div className="max-w-6xl mx-auto mt-16 p-4">
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop" alt="" className="rounded-2xl border border-[#1f2230]" />
        </div>
      </section>
    </main>
  );
}
