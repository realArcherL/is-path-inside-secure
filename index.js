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

  // handle null
  if (!realChildPath || !realParentPath) {
    return false;
  }

  return this.isPathInside(realChildPath, realParentPath);
};

function safeRealPath(p) {
  try {
    return fs.realpathSync.native(p);
  } catch (error) {
    return null;
  }
}
