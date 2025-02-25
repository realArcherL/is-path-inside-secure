# is-path-inside-secure

Is in beta, and a symlink-aware implementation of popular [is-path-inside](https://www.npmjs.com/package/is-path-inside) npm package.

> A symlink-aware helper function that checks whether `childPath` is truly inside `parentPath`. Internally calls `fs.realpathSync` to follow symlinks. If either path doesn't exist, returns false. It then calls is-path-inside original method.

## Why build this and Usage

The original `is-path-inside` isn't symlink aware and has a following note on it:

> Important: This package is meant for use with path manipulation. It does not check if the paths exist nor does it resolve symlinks. You should not use this as a security mechanism to guard against access to certain places on the file system.

The idea is to allow `is-path-inside-secure` to be used as a security mechanism.

Example:

```js
const { isPathInsideSecure } = require('is-path-inside-secure');

router.route('/public/:file').get(function (req, res) {
  try {
    const { file } = req.params;

    // URIDecode parameter
    const decodedFile = decodeURIComponent(file);

    // Define the trusted root directory
    const rootDir = path.join(__dirname, '../../public');

    // Join the decoded path segments
    const absolutePath = path.join(rootDir, decodedFile);

    // Check if the resulting path stays inside rootDir
    // if not return 404
    if (!isPathInsideSecure(absolutePath, rootDir)) {
      console.log('Rejecting path. Absolute path resolved to:', absolutePath);
      return res.status(400).json({
        success: false,
        error: 'Invalid File Path',
      });
    }

    return res.sendFile(absolutePath, error => {
      if (error) {
        return res.status(404).json({
          success: false,
          result: null,
          message: 'we could not find : ' + file,
        });
      }
    });
  } catch (error) {
    return res.status(503).json({
      success: false,
      result: null,
      message: error.message,
      error: error,
    });
  }
});
```

# Install

```bash
npm install is-path-inside-secure
```

# API

### isPathInsideSecure(childPath, parentPath)

**Note**: Also, has the original `is-path-inside` API as well.

Checks for Symlinks and existence of path.

Type: string

The path that should be inside `parentPath`

Type: string

The path that should contain `childPath`.
