import * as Icons from "lucide-react";
import React from "react";

/**
 * Dynamically resolves a string name to a Lucide icon component.
 * Fallback to 'HelpCircle' if the icon is not found.
 */
export function DynamicIcon({ 
  name, 
  className, 
  size = 18 
}: { 
  name: string; 
  className?: string; 
  size?: number; 
}) {
  const IconComponent = (Icons as any)[name];
  
  if (!IconComponent) {
    // Fallback icon
    const Fallback = Icons.HelpCircle;
    return React.createElement(Fallback, { className, size });
  }

  return React.createElement(IconComponent, { className, size });
}
