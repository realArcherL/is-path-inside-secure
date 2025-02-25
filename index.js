const path = require('path');
const fs = require('fs');

// Original is-path-inside
function isPathInside(childPath, parentPath) {
  const relation = path.relative(parentPath, childPath);
  return Boolean(
    relation &&
      relation !== '..' &&
      !relation.startsWith(`..${path.sep}`) &&
      relation !== path.resolve(childPath)
  );
}

function isPathInsideSecure(childPath, parentPath) {
  // Resolve both paths on disk (following symlinks).
  // If resolution fails (ENOENT, EACCES, etc.), we return null to fail closed.
  let realChildPath = safeRealPath(childPath);
  let realParentPath = safeRealPath(parentPath);

  // Handle null
  if (!realChildPath || !realParentPath) {
    return false;
  }

  return isPathInside(realChildPath, realParentPath);
}

function safeRealPath(p) {
  try {
    return fs.realpathSync.native(p);
  } catch (error) {
    return null;
  }
}

// Properly export functions
module.exports = {
  isPathInside,
  isPathInsideSecure,
};
