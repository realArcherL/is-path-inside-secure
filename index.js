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
  try {
    // Resolve both paths on disk (following symlinks).
    // If resolution fails (ENOENT, EACCES, etc.), we return null to fail closed.
    let realChildPath = fs.realpathSync.native(childPath);
    let realParentPath = fs.realpathSync.native(parentPath);

    const relation = path.relative(realParentPath, realChildPath);

    if (!relation || relation.startsWith('..') || path.isAbsolute(relation)) {
      return false;
    }
  } catch {
    return false;
  }
};
