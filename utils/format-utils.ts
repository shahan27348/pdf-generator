export function formatFileNameAsTitle(filename: string): string {
  const withoutExtension = filename.replace(/\.[^/.]+$/, "");
  const withSpaces = withoutExtension
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2");

  return withSpaces
    .split("")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
    .trim();
}
