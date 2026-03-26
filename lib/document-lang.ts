/**
 * Resolves campaign `lang` query to a safe BCP 47–style value for <html lang>.
 */
export function normalizeDocumentLang(lang: string | undefined): string {
  if (!lang?.trim()) return "en";
  const t = lang.trim();
  if (/^[a-z]{2}(-[a-z0-9]{2,8}){0,3}$/i.test(t)) {
    const [primary, ...rest] = t.split("-");
    return [primary.toLowerCase(), ...rest.map((s) => s.toLowerCase())].join("-");
  }
  return "en";
}
