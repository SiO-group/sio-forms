# Contributing to SiO Forms

Thank you for considering contributing to **SiO Forms**.
This repository contains the core packages that make up the SiO form ecosystem.

## Code of Conduct

This project follows the guidelines described in the repository's [Code of Conduct](CODE_OF_CONDUCT.md).
By participating in this project you agree to follow those guidelines.

---

## Repository Structure

This project is maintained as a **monorepo** containing multiple packages.

```
packages/
   form-types        Shared TypeScript definitions
   form-validation   Validation utilities
   form-builder      Schema / form builder
   form-react        React bindings
```

Most contributions affect **one specific package**, but the repository is installed and built as a whole.

---

## Development Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/sio-solutions/sio-forms.git
cd sio-forms
npm install
```

Build all packages:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Lint the codebase:

```bash
npm run lint
```

---

## Working on a Specific Package

Packages are located in the `packages` directory.

Example:

```
packages/form-types
packages/form-validation
packages/form-builder
packages/form-react
```

When making changes:

1. Navigate to the package directory
2. Implement your change
3. Add or update tests
4. Update documentation if needed
5. Ensure the full test suite passes

---

## Reporting Bugs

Before creating a bug report:

* Check existing issues
* Verify the issue is reproducible

When reporting a bug include:

* Clear description of the issue
* Steps to reproduce
* Expected vs actual behavior
* Relevant code examples
* Environment details (Node, TypeScript, package version)

Example:

```
Steps to reproduce:
1. Create builder with `.addNumber('age', { min: '18' })`
2. Expected: TypeScript error
3. Actual: No error
```

---

## Suggesting Enhancements

Enhancement suggestions are welcome.

When submitting one:

* Use a clear title
* Describe the current limitation
* Provide an example of the proposed improvement
* Explain why it benefits common use cases

---

## Pull Request Process

1. Fork the repository
2. Create a branch from `main`
3. Implement your changes
4. Add tests for new functionality
5. Ensure tests and linting pass
6. Update documentation where relevant
7. Submit a Pull Request

---

## Commit Message Guidelines

This project follows **Conventional Commits**.

Format:

```
<type>(<scope>): <description>
```

Types:

```
feat     new feature
fix      bug fix
docs     documentation
style    formatting / code style
refactor internal code change
test     tests
chore    tooling / maintenance
```

Examples:

```
feat(builder): add hidden field type
fix(types): correct ValueType for file inputs
docs(readme): update validation examples
test(validation): add tests for URL validator
```

---

# Versioning

This project follows **Semantic Versioning**.

```
MAJOR   breaking changes
MINOR   new features (backward compatible)
PATCH   bug fixes and small improvements
```

Package releases are managed by the maintainers.

---

# Questions

If you have questions or want to discuss a feature:

* open an issue
* start a discussion on GitHub

Thank you for helping improve the SiO Forms ecosystem.
