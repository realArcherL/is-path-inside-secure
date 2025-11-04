# is-path-inside-secure

A symlink-aware implementation of the popular [is-path-inside](https://www.npmjs.com/package/is-path-inside) npm package.

> A symlink-aware helper function that checks whether `childPath` is truly inside `parentPath`. Internally calls `fs.realpathSync` to follow symlinks. If either path doesn't exist, returns false. It then calls the original is-path-inside method.

## Why build this and Usage

The original `is-path-inside` isn't symlink aware and has the following note:

> Important: This package is meant for use with path manipulation. It does not check if the paths exist nor does it resolve symlinks. You should not use this as a security mechanism to guard against access to certain places on the file system.

The idea is to allow `is-path-inside-secure` to be used as a security mechanism.

The package also takes inspiration from Vercel's [serve-handler](https://github.com/vercel/serve-handler/blob/main/src/index.js#L572-L580), which is the NPM package protecting another popular Vercel static file server package [@vercel/serve](https://www.npmjs.com/package/serve). (**Note:** [@vercel/serve](https://www.npmjs.com/package/serve) handles symlinks differently and doesn't need to handle that case within this check).

The package is also inspired by the fix from [BackStage](https://github.com/backstage/backstage) in this [PR](https://github.com/backstage/backstage/commit/78f892b3a84d63de2ba167928f171154c447b717) to address [CVE-2024-26150](https://github.com/backstage/backstage/security/advisories/GHSA-2fc9-xpp8-2g9h).

You can refer to this [research work here](https://realarcherl.github.io/posts/research_1/) for more information.

A simple use case for the package would be where users can control whether or not a symlink can be created on the machine, and we don't want to serve sensitive files outside of a parent directory. The package would return true even for symlinks PROVIDED they are within the intended directory AND if the file/path it is pointing to exists. Since this also handles missing files, users can simply call the function, and it will return false, so they can directly return a 404 response.

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
      return res.status(404).json({
        success: false,
        error: 'File could not be found',
      });
    }
    // Additional code to handle the file...
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

Can also use it with typescript

```js
import { isPathInsideSecure } from 'is-path-inside-secure';
```

## Install

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
