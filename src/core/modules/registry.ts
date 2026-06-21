import { BusinessModule } from "./types";

class ModuleRegistry {
  private modules = new Map<string, BusinessModule>();

  public register(module: BusinessModule) {
    if (this.modules.has(module.id)) {
      console.warn(`Module with ID "${module.id}" is already registered. Overwriting.`);
    }
    this.modules.set(module.id, module);
    if (module.onRegister) {
      module.onRegister();
    }
  }

  public getModule(id: string): BusinessModule | undefined {
    return this.modules.get(id);
  }

  public getAllModules(): BusinessModule[] {
    return Array.from(this.modules.values());
  }

  public getNavigationItems(): Array<{
    moduleId: string;
    moduleName: string;
    iconName: string;
    basePath: string;
    items: BusinessModule["navigation"];
  }> {
    return this.getAllModules().map((mod) => ({
      moduleId: mod.id,
      moduleName: mod.name,
      iconName: mod.iconName,
      basePath: mod.basePath,
      items: mod.navigation,
    }));
  }

  public getAllPermissions(): { key: string; description: string }[] {
    const list: { key: string; description: string }[] = [];
    this.getAllModules().forEach((mod) => {
      mod.permissions.forEach((perm) => {
        list.push({
          key: `${perm.resource}:${perm.action}`,
          description: perm.description || `${perm.action} access for ${perm.resource}`,
        });
      });
    });
    return list;
  }
}

export const moduleRegistry = new ModuleRegistry();
export type { BusinessModule, NavigationItem, ModulePermission } from "./types";
