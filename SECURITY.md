# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.2.x   | :white_check_mark: |
| < 0.2   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within SpinozaOS, please send an email to **mustafa@mustafasarac.com**.

**Please do not report security vulnerabilities through public GitHub issues.**

### What to include in your report:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Any suggested fixes (optional)

### What to expect:

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution Timeline**: Depends on severity, typically within 30 days

### Severity Levels

| Severity | Description | Response Time |
|----------|-------------|---------------|
| Critical | Remote code execution, data breach | 24-48 hours |
| High | XSS, authentication bypass | 3-7 days |
| Medium | Information disclosure | 7-14 days |
| Low | Minor issues | 14-30 days |

## Security Best Practices

When using SpinozaOS components:

1. **Keep dependencies updated** - Regularly update to the latest version
2. **Sanitize user input** - Always sanitize data before rendering
3. **Use Content Security Policy** - Implement CSP headers in your application
4. **Review third-party integrations** - Audit any external dependencies

## Acknowledgments

We appreciate responsible disclosure and will acknowledge security researchers who help improve SpinozaOS security.

---

*SpinozaOS Security Team*
