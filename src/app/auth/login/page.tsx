"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DynamicIcon } from "../../../shared/lib/icons";

const loginSchema = z.object({
  email: z.string().email("Veuillez saisir une adresse email valide."),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères."),
});

type LoginForm = z.infer<typeof loginSchema>;

/**
 * Authentication View.
 * Contains user form inputs with client-side reactive Zod validations.
 */
export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        setError("Identifiants incorrects. Veuillez réessayer.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Une erreur inattendue est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background visual graphics - Industrial Slate Style */}
      <div className="absolute top-[-20%] left-[-20%] h-[70%] w-[70%] rounded-full bg-slate-200/40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] h-[70%] w-[70%] rounded-full bg-slate-200/40 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 z-10">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-[#0F172A] text-white shadow-md mb-4">
            <DynamicIcon name="Layers" size={26} />
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight text-[#0F172A] font-sans">
            Connexion
          </h2>
          <p className="mt-2 text-center text-sm text-[#334155]">
            {"Plateforme SaaS modulaire de gestion d'entreprise"}
          </p>
        </div>

        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm space-y-6">
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-3 text-sm text-rose-500">
              <DynamicIcon name="AlertCircle" size={16} />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#334155] uppercase tracking-wide">
                Adresse Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <DynamicIcon name="Mail" size={16} />
                </div>
                <input
                  type="email"
                  placeholder="nom@entreprise.com"
                  {...register("email")}
                  className="w-full rounded-lg bg-slate-50 border border-[#E2E8F0] pl-10 pr-4 py-2.5 text-sm text-[#334155] placeholder-slate-450 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
                />
              </div>
              {errors.email && (
                <span className="text-xs text-rose-500">{errors.email.message}</span>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#334155] uppercase tracking-wide">
                Mot de Passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <DynamicIcon name="Lock" size={16} />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="w-full rounded-lg bg-slate-50 border border-[#E2E8F0] pl-10 pr-4 py-2.5 text-sm text-[#334155] placeholder-slate-450 focus:outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800 transition-colors"
                />
              </div>
              {errors.password && (
                <span className="text-xs text-rose-500">{errors.password.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-2.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>Se connecter</span>
                  <DynamicIcon name="ArrowRight" size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
