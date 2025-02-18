> A symlink-aware helper function that checks whether `childPath` is truly inside `parentPath`. Internally calls `fs.realpathSync` to follow symlinks, then uses a similar string-based approach to determine if the resolved child is within the resolved parent. Also, added a check for isAbsolute for windows. If either path doesn't exist, returns false.

Install

```
npm install is-path-inside-secure
```
