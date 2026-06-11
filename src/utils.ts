const base = import.meta.env.BASE_URL || "/";

export function assetPath(path: string): string {
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}
