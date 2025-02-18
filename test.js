const path = require('node:path');
const test = require('ava');
const { isPathInsideSecure } = require('./index.js');

// same tests as that of is-path-inside
// https://github.com/sindresorhus/is-path-inside/blob/main/test.js

test('main', t => {
  t.true(isPathInsideSecure('a', '/'));
  t.true(isPathInsideSecure('a', '.'));
  t.true(isPathInsideSecure('a', './'));
  t.true(isPathInsideSecure('a', '..'));
  t.true(isPathInsideSecure('a', '../'));
  t.true(isPathInsideSecure('a/', '/'));
  t.true(isPathInsideSecure('a/', '.'));
  t.true(isPathInsideSecure('a/', './'));
  t.true(isPathInsideSecure('a/', '..'));
  t.true(isPathInsideSecure('a/', '../'));
  t.true(isPathInsideSecure('a/b', 'a'));
  t.true(isPathInsideSecure('a/b', 'a/'));
  t.true(isPathInsideSecure('a/b/', 'a'));
  t.true(isPathInsideSecure('a/b/', 'a/'));
  t.true(isPathInsideSecure('a/b/c', 'a/b'));
  t.true(isPathInsideSecure('a/b/c', 'a/b/'));
  t.true(isPathInsideSecure('a/b/c/', 'a/b'));
  t.true(isPathInsideSecure('a/b/c/', 'a/b/'));
  t.true(isPathInsideSecure('A/b', 'A'));
  t.true(isPathInsideSecure('a/../b', '.'));

  t.true(isPathInsideSecure('../a', '/'));
  t.true(isPathInsideSecure('../a/', '/'));
  t.true(isPathInsideSecure('/a', '/'));
  t.true(isPathInsideSecure('/a/', '/'));
  t.true(isPathInsideSecure('/a/b', '/a'));
  t.true(isPathInsideSecure('/a/b', '/a/'));
  t.true(isPathInsideSecure('/a/b/', '/a'));
  t.true(isPathInsideSecure('/a/b/', '/a/'));
  t.true(isPathInsideSecure('/a/b/c', '/'));
  t.true(isPathInsideSecure('/a/b/c/', '/'));
  t.true(isPathInsideSecure('/a/b/c', '/a/b'));
  t.true(isPathInsideSecure('/a/b/c', '/a/b/'));
  t.true(isPathInsideSecure('/a/b/c/', '/a/b'));
  t.true(isPathInsideSecure('/a/b/c/', '/a/b/'));

  t.false(isPathInsideSecure('..', '.'));
  t.false(isPathInsideSecure('.', '.'));
  t.false(isPathInsideSecure('.', './'));
  t.false(isPathInsideSecure('./', '.'));
  t.false(isPathInsideSecure('./', './'));
  t.false(isPathInsideSecure('.', 'a'));
  t.false(isPathInsideSecure('.', 'a/'));
  t.false(isPathInsideSecure('./', 'a'));
  t.false(isPathInsideSecure('./', 'a/'));
  t.false(isPathInsideSecure('a', 'a'));
  t.false(isPathInsideSecure('a', 'a/'));
  t.false(isPathInsideSecure('a/', 'a'));
  t.false(isPathInsideSecure('a/', 'a/'));
  t.false(isPathInsideSecure('A/b', 'a'));
  t.false(isPathInsideSecure('a/b', 'A'));
  t.false(isPathInsideSecure('/', '/'));
  t.false(isPathInsideSecure('/', '/a'));
  t.false(isPathInsideSecure('/', '/a/'));
  t.false(isPathInsideSecure('/a', '/a'));
  t.false(isPathInsideSecure('/a', '/a/'));
  t.false(isPathInsideSecure('/a/', '/a'));
  t.false(isPathInsideSecure('/a/', '/a/'));
  t.false(isPathInsideSecure('/a/b', '/a/b'));
  t.false(isPathInsideSecure('/a/bc/d', '/a/b'));
  t.false(isPathInsideSecure('a/../b', 'a'));
  t.false(isPathInsideSecure('a/../b', 'b'));
});

test('win32', t => {
  const { relative, resolve, sep } = path;

  path.relative = path.win32.relative;
  path.resolve = path.win32.resolve;
  Object.defineProperty(path, 'sep', { value: path.win32.sep });

  t.true(isPathInsideSecure('a', '\\'));
  t.true(isPathInsideSecure('a', '.'));
  t.true(isPathInsideSecure('a', '.\\'));
  t.true(isPathInsideSecure('a', '..'));
  t.true(isPathInsideSecure('a', '..\\'));
  t.true(isPathInsideSecure('a\\', '\\'));
  t.true(isPathInsideSecure('a\\', '.'));
  t.true(isPathInsideSecure('a\\', '.\\'));
  t.true(isPathInsideSecure('a\\', '..'));
  t.true(isPathInsideSecure('a\\', '..\\'));
  t.true(isPathInsideSecure('a\\b', 'a'));
  t.true(isPathInsideSecure('a\\b', 'a\\'));
  t.true(isPathInsideSecure('a\\b\\', 'a'));
  t.true(isPathInsideSecure('a\\b\\', 'a\\'));
  t.true(isPathInsideSecure('A\\b', 'A'));
  t.true(isPathInsideSecure('A\\b', 'a'));
  t.true(isPathInsideSecure('a\\b', 'A'));
  t.true(isPathInsideSecure('a\\b\\c', 'a\\b'));
  t.true(isPathInsideSecure('a\\b\\c', 'a\\b\\'));
  t.true(isPathInsideSecure('a\\b\\c\\', 'a\\b'));
  t.true(isPathInsideSecure('a\\b\\c\\', 'a\\b\\'));
  t.true(isPathInsideSecure('A\\b\\c', 'a\\b'));
  t.true(isPathInsideSecure('a\\..\\b', '.'));

  t.true(isPathInsideSecure('..\\a', '\\'));
  t.true(isPathInsideSecure('..\\a\\', '\\'));
  t.true(isPathInsideSecure('\\a', '\\'));
  t.true(isPathInsideSecure('\\a\\', '\\'));
  t.true(isPathInsideSecure('\\a\\b', '\\a'));
  t.true(isPathInsideSecure('\\a\\b', '\\a\\'));
  t.true(isPathInsideSecure('\\a\\b\\', '\\a'));
  t.true(isPathInsideSecure('\\a\\b\\', '\\a\\'));

  t.true(isPathInsideSecure('c:\\a\\b', 'C:\\a'));
  t.true(isPathInsideSecure('c:\\a\\b\\c\\d', 'C:\\a\\b\\c'));

  t.false(isPathInsideSecure('..', '.'));
  t.false(isPathInsideSecure('.', '.'));
  t.false(isPathInsideSecure('.', '.\\'));
  t.false(isPathInsideSecure('.\\', '.'));
  t.false(isPathInsideSecure('.\\', '.\\'));
  t.false(isPathInsideSecure('.', 'a'));
  t.false(isPathInsideSecure('.', 'a\\'));
  t.false(isPathInsideSecure('.\\', 'a'));
  t.false(isPathInsideSecure('.\\', 'a\\'));
  t.false(isPathInsideSecure('a', 'a'));
  t.false(isPathInsideSecure('a', 'a\\'));
  t.false(isPathInsideSecure('a\\', 'a'));
  t.false(isPathInsideSecure('a\\', 'a\\'));
  t.false(isPathInsideSecure('\\', '\\'));
  t.false(isPathInsideSecure('\\', '\\a'));
  t.false(isPathInsideSecure('\\', '\\a\\'));
  t.false(isPathInsideSecure('\\a', '\\a'));
  t.false(isPathInsideSecure('\\a', '\\a\\'));
  t.false(isPathInsideSecure('\\a\\', '\\a'));
  t.false(isPathInsideSecure('\\a\\', '\\a\\'));
  t.false(isPathInsideSecure('\\a\\b', '\\a\\b'));
  t.false(isPathInsideSecure('\\a\\bc\\d', '\\a\\b'));
  t.false(isPathInsideSecure('C:\\a\\b\\c', 'c:\\a\\b\\c'));

  t.false(isPathInsideSecure('A\\b', 'a\\b'));
  t.false(isPathInsideSecure('C:\\a\\b', 'c:\\a\\b'));
  t.false(isPathInsideSecure('C:\\a\\b', 'D:\\a'));
  t.false(isPathInsideSecure('a\\bc\\d', 'a\\b'));
  t.false(isPathInsideSecure('a\\..\\b', 'a'));
  t.false(isPathInsideSecure('a\\..\\b', 'b'));

  path.relative = relative;
  path.resolve = resolve;
  Object.defineProperty(path, 'sep', { value: sep });
});
