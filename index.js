const path = require('path');
const fs = require('fs');

/**
 * This is the function used in is-path-inside: https://www.npmjs.com/package/is-path-inside
 * This does NOT handle symlinks properly. If `childPath` is a symlink
 * pointing outside `parentPath`, this function may incorrectly return `true`.
 *
 * @param {string} childPath - The potential subpath.
 * @param {string} parentPath - The base or parent directory.
 * @returns {boolean} True if `childPath` is inside or equals `parentPath`, otherwise false.
 */
exports.isPathInside = (childPath, parentPath) => {
  const relation = path.relative(parentPath, childPath);

  return Boolean(
    relation &&
      relation !== '..' &&
      !relation.startsWith(`..${path.sep}`) &&
      relation !== path.resolve(childPath)
  );
};

/**
 * is-path-inside-secure
 *
 * A symlink-aware helper function that checks whether `childPath`
 * is truly inside `parentPath`. Internally calls `fs.realpathSync`
 * to follow symlinks, then uses a similar string-based approach
 * to determine if the resolved child is within the resolved parent.
 *
 * Also, added a check for isAbsolute for windows.
 *
 * If either path doesn't exist, returns false.
 *
 * @param {string} childPath - The potential subpath.
 * @param {string} parentPath - The base or parent directory.
 * @returns {boolean} True if `childPath` is inside or equals `parentPath`, else false.
 */
exports.isPathInsideSecure = (childPath, parentPath) => {
  const realChildPath = realPath(childPath);
  const realParentPath = realPath(parentPath);

  // Now that we have the real on-disk paths, do the same relative check
  const relation = path.relative(realParentPath, realChildPath);

  return Boolean(
    relation &&
      relation !== '..' &&
      !relation.startsWith(`..${path.sep}`) &&
      !path.isAbsolute(relation) &&
      relation !== path.resolve(realChildPath)
  );
};

/**
 * Resolves the on-disk path for a given `p`, following symlinks.
 * If the path doesn't exist (ENOENT), returns the path.
 * For other errors (EACCES, etc.), it still returns the original path
 *
 * @param {string} p - The path to resolve
 */
function realPath(p) {
  try {
    return fs.realpathSync(p);
  } catch (error) {
    return p;
  }
}
