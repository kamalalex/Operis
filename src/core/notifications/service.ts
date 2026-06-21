import { prisma } from "../database/prisma";

export type NotificationType = "info" | "warning" | "success" | "error";

/**
 * Creates and dispatch a new in-app notification to a user.
 */
export async function sendNotification(
  userId: string,
  title: string,
  message: string,
  type: NotificationType = "info"
) {
  return prisma.notification.create({
    data: {
      userId,
      title,
      message,
      type,
    },
  });
}

/**
 * Fetch all notifications for a specific user, sorted by creation date.
 */
export async function getNotifications(userId: string) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Marks an in-app notification as read.
 */
export async function markAsRead(id: string) {
  return prisma.notification.update({
    where: { id },
    data: { read: true },
  });
}
