export const CORE_PERMISSIONS = {
  DASHBOARD_VIEW: "core:dashboard",
  SETTINGS_VIEW: "core:settings",
  SETTINGS_WRITE: "core:settings_write",
  USERS_MANAGE: "core:users",
  NOTIFICATIONS_VIEW: "core:notifications",
} as const;

export type CorePermissionType = typeof CORE_PERMISSIONS[keyof typeof CORE_PERMISSIONS];

export interface Permission {
  key: string;
  name: string;
  description: string;
}

export const corePermissionDetails: Permission[] = [
  {
    key: CORE_PERMISSIONS.DASHBOARD_VIEW,
    name: "Dashboard View",
    description: "Access the main business operations dashboard dashboard",
  },
  {
    key: CORE_PERMISSIONS.SETTINGS_VIEW,
    name: "Settings View",
    description: "View global core settings",
  },
  {
    key: CORE_PERMISSIONS.SETTINGS_WRITE,
    name: "Settings Write",
    description: "Modify global platform settings",
  },
  {
    key: CORE_PERMISSIONS.USERS_MANAGE,
    name: "Users & Roles Management",
    description: "Manage platform users, assign roles and modify RBAC permissions",
  },
  {
    key: CORE_PERMISSIONS.NOTIFICATIONS_VIEW,
    name: "Notifications View",
    description: "Receive and manage user in-app notifications",
  },
];
