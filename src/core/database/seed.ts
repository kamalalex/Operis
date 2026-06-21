import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../shared/lib/crypto";

const prisma = new PrismaClient();

/**
 * Seed script to populate MongoDB with default roles and an administrator account.
 */
async function main() {
  console.log("Démarrage du peuplement (seeding) de la base de données...");

  // 1. Create or update core roles
  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      description: "Super-administrateur disposant d'un accès complet",
      permissions: ["*"],
    },
  });

  const managerRole = await prisma.role.upsert({
    where: { name: "Manager" },
    update: {},
    create: {
      name: "Manager",
      description: "Manager opérationnel",
      permissions: ["core:dashboard", "task:read", "task:write", "core:notifications"],
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "User" },
    update: {},
    create: {
      name: "User",
      description: "Collaborateur standard",
      permissions: ["core:dashboard", "task:read", "core:notifications"],
    },
  });

  console.log("Rôles créés ou vérifiés avec succès.");

  // 2. Create the default administrator account
  const adminEmail = "admin@platform.com";
  const hashedPassword = hashPassword("admin123");

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin SaaS",
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  console.log(`Compte administrateur vérifié/créé : ${adminEmail} (mot de passe : admin123)`);
  console.log("Peuplement terminé.");
}

main()
  .catch((e) => {
    console.error("Erreur durant le seeding :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
