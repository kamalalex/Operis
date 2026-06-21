/**
 * Checks whether a user's permissions array satisfies the required permission.
 * 
 * Supports wildcards:
 * - '*' matches any permission.
 * - 'resource:*' matches any action on a specific resource (e.g., 'task:*' matches 'task:read' and 'task:write').
 * - '*:action' matches a specific action on any resource (e.g., '*:read' matches 'task:read' and 'inventory:read').
 * 
 * @param userPermissions Array of permissions assigned to the user
 * @param requiredPermission The specific permission string to verify (format: "resource:action")
 */
export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  // Superuser wildcard
  if (userPermissions.includes("*")) {
    return true;
  }

  // Exact match
  if (userPermissions.includes(requiredPermission)) {
    return true;
  }

  const requiredParts = requiredPermission.split(":");
  if (requiredParts.length !== 2) {
    return false; // Invalid permission format
  }

  const [reqResource, reqAction] = requiredParts;

  return userPermissions.some((userPerm) => {
    const userParts = userPerm.split(":");
    if (userParts.length !== 2) {
      return false;
    }

    const [userResource, userAction] = userParts;

    const matchesResource = userResource === "*" || userResource === reqResource;
    const matchesAction = userAction === "*" || userAction === reqAction;

    return matchesResource && matchesAction;
  });
}

/**
 * Checks whether a user's permissions satisfy all of the required permissions.
 */
export function hasAllPermissions(userPermissions: string[], requiredPermissions: string[]): boolean {
  return requiredPermissions.every((req) => hasPermission(userPermissions, req));
}

/**
 * Checks whether a user's permissions satisfy at least one of the required permissions.
 */
export function hasAnyPermission(userPermissions: string[], requiredPermissions: string[]): boolean {
  return requiredPermissions.some((req) => hasPermission(userPermissions, req));
}
