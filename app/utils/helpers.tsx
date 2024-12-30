// utils/helpers.ts
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD") // Normalize accented characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[^\w\-]+/g, "") // Remove non-alphanumeric characters
    .replace(/\-\-+/g, "-") // Replace multiple dashes with one
    .replace(/^-+/, "") // Remove leading dashes
    .replace(/-+$/, ""); // Remove trailing dashes
}
