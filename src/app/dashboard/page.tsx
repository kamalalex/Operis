import React from "react";
import { moduleRegistry } from "../../core/modules/registry";
import { corePermissionDetails } from "../../core/permissions/permissions";
import { DynamicIcon } from "../../shared/lib/icons";
import Link from "next/link";
import { auth } from "../../core/auth/auth";

/**
 * Main dashboard view showing registered business modules and stats.
 */
export default async function DashboardPage() {
  const session = await auth();
  const activeModules = moduleRegistry.getAllModules();
  const allPermissions = moduleRegistry.getAllPermissions();

  const stats = [
    {
      title: "Modules Actifs",
      value: activeModules.length,
      description: "Modules métiers connectés au noyau",
      icon: "Layers",
      color: "text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-350",
    },
    {
      title: "Rôle Actuel",
      value: session?.user?.role || "Utilisateur",
      description: "Niveau d'accès pour cette session",
      icon: "ShieldAlert",
      color: "text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-350",
    },
    {
      title: "Permissions Actives",
      value: session?.user?.permissions?.length || 0,
      description: "Permissions assignées à votre rôle",
      icon: "Key",
      color: "text-slate-700 bg-slate-100 dark:bg-slate-800 dark:text-slate-350",
    },
    {
      title: "Statut Système",
      value: "Actif",
      description: "Noyau et connexion base de données",
      icon: "Activity",
      color: "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/20 dark:text-emerald-450",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner - Industrial Slate Design */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8 text-white relative overflow-hidden shadow-sm">
        <div className="absolute right-[-10%] top-[-30%] h-48 w-48 rounded-full bg-slate-800/20 blur-[80px] pointer-events-none" />
        <div className="relative z-10 max-w-xl space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Bonjour, {session?.user?.name || "Utilisateur"}
          </h2>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
            {"Bienvenue sur le portail d'administration de la plateforme SaaS. Vos modules métiers s'enregistrent de manière isolée au démarrage pour garantir un couplage faible et une extensibilité maximale."}
          </p>
        </div>
      </div>

      {/* Grid statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-xl p-5 card-shadow hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-450 dark:text-slate-400 uppercase tracking-wider">
                  {stat.title}
                </p>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-2">
                  {stat.value}
                </h4>
              </div>
              <div className={`p-2.5 rounded-lg ${stat.color} shrink-0`}>
                <DynamicIcon name={stat.icon} size={18} />
              </div>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Main dashboard content sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Module Manager Card */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-xl card-shadow overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
            <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 flex items-center gap-2">
              <DynamicIcon name="Box" size={16} className="text-slate-650 dark:text-slate-400" />
              <span>Modules Métiers Installés</span>
            </h3>
            <span className="text-xs font-medium px-2 py-0.5 bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-400 rounded-full">
              {activeModules.length} Enregistrés
            </span>
          </div>

          <div className="p-6 flex-1 flex flex-col justify-center">
            {activeModules.length === 0 ? (
              <div className="text-center py-10 space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-850 flex items-center justify-center text-slate-400 border border-slate-200/60 dark:border-slate-800/60">
                  <DynamicIcon name="Puzzle" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-750 dark:text-slate-300">Aucun module métier actif</h4>
                  <p className="text-xs text-slate-450 dark:text-slate-500 max-w-sm mx-auto mt-1 leading-relaxed">
                    {"Les modules d'affaires (ex: Task, Achat, CRM) s'enregistrent d'eux-mêmes au niveau du Core. Prêt pour l'enregistrement du premier module !"}
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-slate-850 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-350 border border-slate-200/40 dark:border-slate-800/40">
                    <code>/src/modules/</code> est prêt à accueillir vos fichiers.
                  </span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeModules.map((mod) => (
                  <div key={mod.id} className="border border-slate-200/60 dark:border-slate-800 rounded-xl p-4 flex gap-3 hover:border-slate-300 dark:hover:border-slate-750 transition-colors bg-white dark:bg-slate-900 card-shadow">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/40 dark:border-slate-800/40 shrink-0">
                      <DynamicIcon name={mod.iconName} size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">{mod.name}</h4>
                      <p className="text-xs text-slate-450 dark:text-slate-500 mt-1 line-clamp-2 leading-relaxed">{mod.description || "Pas de description."}</p>
                      <Link href={mod.basePath} className="inline-flex items-center gap-1 text-xs text-slate-900 hover:underline dark:text-slate-100 mt-3 font-semibold">
                        <span>Ouvrir</span>
                        <DynamicIcon name="ArrowRight" size={12} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stack info card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-xl card-shadow p-6 space-y-6">
          <div>
            <h3 className="font-bold text-sm text-slate-850 dark:text-slate-100 flex items-center gap-2 mb-4">
              <DynamicIcon name="Cpu" size={16} className="text-slate-650 dark:text-slate-400" />
              <span>Noyau & Architecture</span>
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Next.js 15 (App Router)", type: "Framework" },
                { name: "TypeScript", type: "Langage" },
                { name: "Tailwind CSS v4 & Custom Tokens", type: "Design" },
                { name: "MongoDB & Prisma ORM", type: "Base" },
                { name: "NextAuth.js v5", type: "Sécurité" },
                { name: "Zustand Core Store", type: "State" },
              ].map((tech, i) => (
                <li key={i} className="flex justify-between items-center text-xs py-1.5 border-b border-slate-100 dark:border-slate-800/60 last:border-b-0">
                  <span className="font-medium text-slate-700 dark:text-slate-305">{tech.name}</span>
                  <span className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-850 px-2 py-0.5 rounded-full border border-slate-200/20 dark:border-slate-800/20">{tech.type}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/80">
            <h4 className="font-bold text-xs text-slate-800 dark:text-slate-250 uppercase tracking-wider mb-2">
              Rôles & Permissions
            </h4>
            <p className="text-xs text-slate-450 dark:text-slate-500 leading-relaxed">
              {"Le système filtre les routes et les éléments de menu dynamiquement au démarrage. Le noyau enregistre "}
              {corePermissionDetails.length}
              {" permissions fondamentales et regroupe "}
              {allPermissions.length}
              {" permissions d'extensions modules."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
