/**
 * Base path for hosting under a sub-path (GitHub Pages: /<repo>). Empty for local dev and root hosting.
 * Set via NEXT_PUBLIC_BASE_PATH at build time. Use asset() for any URL that Next does not prefix itself
 * (CSS url(), unoptimized <Image>, metadata icons).
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
export const asset = (path: string) => `${BASE_PATH}${path}`;
