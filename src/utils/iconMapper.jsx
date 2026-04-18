import * as LucideIcons from 'lucide-react';

export function renderIcon(iconName, size = 24, color = 'currentColor') {
  const IconComponent = LucideIcons[iconName];
  if (!IconComponent) {
    console.warn(`Icon not found: ${iconName}`);
    return null;
  }
  return <IconComponent size={size} color={color} strokeWidth={2} />;
}
