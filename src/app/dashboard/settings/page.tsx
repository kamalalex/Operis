"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DynamicIcon } from "../../../shared/lib/icons";
import { corePermissionDetails } from "../../../core/permissions/permissions";
import { moduleRegistry } from "../../../core/modules/registry";
import { platformSettings } from "../../../core/settings/config";

const settingsSchema = z.object({
  appName: z.string().min(2, "Le nom de l'application doit faire au moins 2 caractères."),
  companyName: z.string().min(2, "Le nom de l'entreprise doit faire au moins 2 caractères."),
  defaultLocale: z.string(),
  defaultCurrency: z.string(),
  allowUserRegistration: z.boolean(),
});

type SettingsForm = z.infer<typeof settingsSchema>;

/**
 * Settings configuration view.
 * Enables general customization fields and shows registered RBAC permissions list.
 */
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "permissions">("general");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsForm>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      appName: platformSettings.appName,
      companyName: platformSettings.companyName,
      defaultLocale: platformSettings.defaultLocale,
      defaultCurrency: platformSettings.defaultCurrency,
      allowUserRegistration: platformSettings.allowUserRegistration,
    },
  });

  const onSubmit = async (data: SettingsForm) => {
    // Mock save delay and message
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSuccessMsg("Paramètres sauvegardés avec succès !");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const allPermissions = [
    ...corePermissionDetails.map((p) => ({ ...p, source: "Core Platform" })),
    ...moduleRegistry.getAllPermissions().map((p) => ({
      key: p.key,
      name: p.key,
      description: p.description,
      source: "Module Métier",
    })),
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Paramètres Système</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Gérer les options du noyau de la plateforme et auditer les permissions RBAC.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("general")}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "general"
              ? "border-[#0F172A] text-[#0F172A] dark:border-slate-200 dark:text-slate-200"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Options Générales
        </button>
        <button
          onClick={() => setActiveTab("permissions")}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-all ${
            activeTab === "permissions"
              ? "border-[#0F172A] text-[#0F172A] dark:border-slate-200 dark:text-slate-200"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Permissions & Sécurité ({allPermissions.length})
        </button>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-sm text-emerald-655 dark:text-emerald-400 animate-fade-in">
          <DynamicIcon name="CheckCircle" size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Tab contents */}
      {activeTab === "general" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-xl p-6 card-shadow max-w-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Nom du SaaS</label>
                <input
                  type="text"
                  {...register("appName")}
                  className="w-full rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
                {errors.appName && <span className="text-xs text-rose-500">{errors.appName.message}</span>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  {"Nom de l'entreprise"}
                </label>
                <input
                  type="text"
                  {...register("companyName")}
                  className="w-full rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
                {errors.companyName && <span className="text-xs text-rose-500">{errors.companyName.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Langue par défaut
                </label>
                <select
                  {...register("defaultLocale")}
                  className="w-full rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                >
                  <option value="fr">Français (FR)</option>
                  <option value="en">English (EN)</option>
                  <option value="es">Español (ES)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Devise principale
                </label>
                <select
                  {...register("defaultCurrency")}
                  className="w-full rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dollar ($)</option>
                  <option value="GBP">Livre Sterling (£)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input
                type="checkbox"
                id="allowUserRegistration"
                {...register("allowUserRegistration")}
                className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 dark:border-slate-800 dark:bg-slate-950"
              />
              <label
                htmlFor="allowUserRegistration"
                className="text-sm font-semibold text-slate-700 dark:text-slate-300 select-none"
              >
                {"Autoriser l'inscription publique de nouveaux utilisateurs"}
              </label>
            </div>

            <div className="pt-4 border-t border-slate-150 dark:border-slate-800/80 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] dark:bg-slate-200 dark:hover:bg-slate-300 text-white dark:text-slate-950 font-semibold px-4 py-2 text-sm disabled:opacity-50 shadow-sm transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white dark:border-slate-950 border-t-transparent" />
                ) : (
                  <>
                    <DynamicIcon name="Save" size={16} />
                    <span>Sauvegarder</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === "permissions" && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-xl card-shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-250 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/20">
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">{"Table d'audit des permissions"}</h3>
            <p className="text-xs text-slate-450">
              Visualiser toutes les permissions enregistrées et déclarées par le noyau et les modules actifs.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/60 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/10 text-slate-400 uppercase font-semibold">
                  <th className="p-4">Clé Permission</th>
                  <th className="p-4">Nom / Libellé</th>
                  <th className="p-4">Description</th>
                  <th className="p-4 text-right">Origine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {allPermissions.map((perm, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-950/5 text-slate-700 dark:text-slate-350"
                  >
                    <td className="p-4 font-mono text-slate-900 dark:text-slate-100 font-semibold">{perm.key}</td>
                    <td className="p-4 font-bold">{perm.name}</td>
                    <td className="p-4 text-slate-500 dark:text-slate-400 leading-relaxed">{perm.description}</td>
                    <td className="p-4 text-right">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          perm.source === "Core Platform"
                            ? "bg-slate-105 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-750"
                            : "bg-slate-200 text-slate-900 border-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-650"
                        }`}
                      >
                        {perm.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
