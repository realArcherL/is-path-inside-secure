# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

Please report security vulnerabilities using the GitHub vulnerability submission.

**Do not report security vulnerabilities through public GitHub issues or discussions.**

## Security Model

This package is designed to prevent path traversal attacks by:

- Resolving symlinks to their actual targets
- Verifying resolved paths remain within the intended parent directory
- Implementing a "fail-closed" approach (returns `false` for non-existent paths)

## Best Practices

- Run your application with the principle of least privilege
- Sanitize user input before passing it to filesystem operations
- Keep dependencies updated
- Implement multiple layers of security beyond path checking

## Acknowledgements

Security design influenced by:

- Vercel's `serve-handler`
- BackStage's security fix for [CVE-2024-26150](https://github.com/backstage/backstage/security/advisories/GHSA-2fc9-xpp8-2g9h)
