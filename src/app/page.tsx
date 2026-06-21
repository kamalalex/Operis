import React from "react";
import Link from "next/link";
import { DynamicIcon } from "../shared/lib/icons";

/**
 * Platform Landing / Welcome View.
 * Displays details about modularity rules and directs the user to /dashboard.
 */
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC] text-[#334155] font-sans relative overflow-hidden">
      {/* Subtle background radial decoration */}
      <div className="absolute top-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full bg-slate-200/40 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[60%] w-[60%] rounded-full bg-slate-200/40 blur-[130px] pointer-events-none" />

      {/* Landing Header */}
      <header className="flex h-16 w-full items-center justify-between px-6 md:px-12 border-b border-[#E2E8F0] bg-white/70 backdrop-blur-md z-10">
        <div className="flex items-center gap-2 font-bold text-[#0F172A]">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#0F172A] text-white shadow-sm">
            <DynamicIcon name="Layers" size={18} />
          </div>
          <span className="text-base tracking-tight font-extrabold">SaaS Platform</span>
        </div>
        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-xs font-semibold px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg transition-all"
        >
          <span>Accéder au Dashboard</span>
          <DynamicIcon name="ArrowRight" size={12} />
        </Link>
      </header>

      {/* Main hero showcase */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 z-10 max-w-4xl mx-auto space-y-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#E2E8F0]/50 px-3 py-1 text-xs font-semibold text-[#334155] border border-[#E2E8F0]">
          <DynamicIcon name="Sparkles" size={12} className="text-[#334155]" />
          <span>Core MVP Architecture - Clean & Modulaire</span>
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
          Gérez vos opérations avec une{" "}
          <span className="text-[#475569]">
            architecture extensible
          </span>
        </h1>

        <p className="text-[#334155] text-base sm:text-lg max-w-2xl leading-relaxed">
          Une plateforme SaaS conçue pour intégrer de nombreux modules indépendants (CRM, Stock, Facturation, RH) de manière plug-and-play, sans jamais modifier le code du noyau.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center w-full max-w-xs sm:max-w-none">
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold px-6 py-3.5 text-sm transition-all shadow-md cursor-pointer"
          >
            <span>Se connecter à la plateforme</span>
            <DynamicIcon name="ArrowRight" size={16} />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 text-[#334155] font-semibold px-6 py-3.5 text-sm transition-all shadow-sm"
          >
            <DynamicIcon name="Github" size={16} />
            <span>Code Source</span>
          </a>
        </div>

        {/* Feature grids */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 text-left w-full">
          {[
            {
              title: "Découplage Total",
              desc: "Chaque module est indépendant et s'enregistre de lui-même sans altérer le Core.",
              icon: "Puzzle",
            },
            {
              title: "RBAC Wildcards",
              desc: "Sécurité d'accès granulaire avec permissions flexibles basées sur les rôles.",
              icon: "ShieldCheck",
            },
            {
              title: "Moderne Tech Stack",
              desc: "Bâti sur Next.js 15, React 19, MongoDB, Prisma ORM et Tailwind CSS.",
              icon: "Cpu",
            },
          ].map((feat, i) => (
            <div key={i} className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-3">
              <div className="h-9 w-9 rounded-lg bg-slate-50 flex items-center justify-center text-[#334155] border border-[#E2E8F0]">
                <DynamicIcon name={feat.icon} size={18} />
              </div>
              <h3 className="font-bold text-sm text-[#0F172A]">{feat.title}</h3>
              <p className="text-xs text-[#334155] leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer copyright */}
      <footer className="h-12 flex items-center justify-center text-xs text-slate-500 border-t border-[#E2E8F0] bg-white/40 z-10 w-full">
        © 2026 SaaS Operations Platform. Conçu pour le futur.
      </footer>
    </div>
  );
}
