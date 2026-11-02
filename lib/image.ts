export function resolveImagePath(value: string | null | undefined): string | null {
  const v = value?.trim();
  if (!v) return null;

  // URL externe ou chemin déjà absolu : on ne touche à rien
  if (/^(https?:)?\/\//.test(v) || v.startsWith("/")) return v;

  // Simple nom de fichier : on cherche dans public/images
  return `/images/${v}`;
}