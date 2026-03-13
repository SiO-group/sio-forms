# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial release of `@sio/form-validation` package
- Core validation functions:
- TypeScript support with full type inference
- Custom error message support with `{label}` placeholder (for most validators)
- Consistent return pattern: `null` for valid, `string` (or `string[]`) for errors
- Empty value handling (`null`, `undefined`, empty string are considered valid)

### Changed

- N/A (initial release)

### Deprecated

- N/A (initial release)

### Removed

- N/A (initial release)

### Fixed

- N/A (initial release)

### Security

- N/A (initial release)

---

## [0.1.0] - 2024-03-13

### Added

- Initial beta release
- Core validation suite
- Comprehensive test coverage
- Documentation and examples

--- 

## Versioning Guidelines

This project follows [SemVer](https://semver.org/):
- MAJOR version for incompatible API changes
- MINOR version for new functionality in a backward compatible manner
- PATCH version for backward compatible bug fixes

## Release History

| Version | 	Date       | 	Highlights           |
|---------|-------------|-----------------------|
| 0.1.0   | 	2024-03-13 | 	Initial beta release |
| 1.0.0   | 	TBD        | 	Stable release       |

---

## Upgrade Guides

### From 0.x to 1.x
*Coming soon*

---

## Migration Notes

### Beta Users
If you're using the beta version (0.x), please note that the API is considered stable, but minor changes may occur before the 1.0.0 release. Check the release notes for any breaking changes.

---

## Dependencies

This package depends on:
- `@sio/form-types` - Shared type definitions for form fields
