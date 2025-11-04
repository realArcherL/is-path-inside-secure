/**
 * Check if a path is inside another path.
 * Note that this function does not follow symlinks.
 * @param childPath - The path that should be inside the parent path.
 * @param parentPath - The parent path.
 * @returns Returns `true` if `childPath` is inside `parentPath`, otherwise `false`.
 */
export function isPathInside(childPath: string, parentPath: string): boolean;

/**
 * Check if a path is inside another path (secure version).
 * This function resolves both paths on disk (following symlinks) before checking.
 * @param childPath - The path that should be inside the parent path.
 * @param parentPath - The parent path.
 * @returns Returns `true` if `childPath` is inside `parentPath` after resolving symlinks, otherwise `false`. Returns `false` if path resolution fails.
 */
export function isPathInsideSecure(
  childPath: string,
  parentPath: string
): boolean;
