import { z } from "zod";

const settingsSchema = z.object({
  appName: z.string().default("SaaS Platform"),
  companyName: z.string().default("Acme Corp"),
  defaultLocale: z.string().default("fr"),
  defaultCurrency: z.string().default("EUR"),
  allowUserRegistration: z.boolean().default(true),
});

export type PlatformSettings = z.infer<typeof settingsSchema>;

/**
 * Global application settings loader.
 * Loads env variables with sensible fallbacks and verifies types using Zod.
 */
export const platformSettings: PlatformSettings = settingsSchema.parse({
  appName: process.env.NEXT_PUBLIC_APP_NAME || "SaaS Platform",
  companyName: process.env.NEXT_PUBLIC_COMPANY_NAME || "Acme Corp",
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "fr",
  defaultCurrency: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || "EUR",
  allowUserRegistration: process.env.NEXT_PUBLIC_ALLOW_REGISTRATION !== "false", // default true
});
export type { settingsSchema };
