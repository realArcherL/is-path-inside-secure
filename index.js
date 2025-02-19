const path = require('path');
const fs = require('fs');

// original is-path-inside
exports.isPathInside = (childPath, parentPath) => {
  const relation = path.relative(parentPath, childPath);
  return Boolean(
    relation &&
      relation !== '..' &&
      !relation.startsWith(`..${path.sep}`) &&
      relation !== path.resolve(childPath)
  );
};

exports.isPathInsideSecure = (childPath, parentPath) => {
  // Resolve both paths on disk (following symlinks).
  // If resolution fails (ENOENT, EACCES, etc.), we return null to fail closed.
  let realChildPath = safeRealPath(childPath);
  let realParentPath = safeRealPath(parentPath);

  // If either path couldn’t be resolved, fail closed.
  if (!realChildPath || !realParentPath) {
    return false;
  }

  realChildPath = realChildPath.toLowerCase();
  realParentPath = realParentPath.toLowerCase();

  // Remove trailing slashes from both
  // so that /foo/bar/ => /foo/bar for consistency
  realChildPath = realChildPath.replace(/[\\/]+$/, '');
  realParentPath = realParentPath.replace(/[\\/]+$/, '');

  const relation = path.relative(realParentPath, realChildPath);

  if (!relation || relation.startsWith('..') || path.isAbsolute(relation)) {
    return false;
  }

  return true;
};

function safeRealPath(p) {
  try {
    return fs.realpath(p);
  } catch (error) {
    return null;
  }
}
