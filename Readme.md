> A symlink-aware helper function that checks whether `childPath` is truly inside `parentPath`. Internally calls `fs.realpathSync` to follow symlinks, Also, added a check for isAbsolute for windows. If either path doesn't exist, returns false.

Install

```
npm install is-path-inside-secure
```
