import type { ComponentType } from "react";

export const projectContentLoaders: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {};
