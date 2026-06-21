export interface NavigationItem {
  label: string;
  href: string;
  permission?: string; // Optional permission key required to see/access this link (e.g., 'task:read')
}

export interface ModulePermission {
  action: string;      // e.g., 'read', 'write', 'delete', 'manage'
  resource: string;    // e.g., 'task', 'inventory', 'invoice'
  description?: string;
}

export interface BusinessModule {
  id: string;
  name: string;
  description?: string;
  iconName: string;    // Name of the Lucide icon to use (e.g., 'CheckSquare')
  basePath: string;
  navigation: NavigationItem[];
  permissions: ModulePermission[];
  onRegister?: () => void;
}
