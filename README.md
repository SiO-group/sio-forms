# SiO Forms

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
![version](https://img.shields.io/badge/version-0.1.0-blue)
[![Build Status](https://github.com/SiO-group/sio-forms/actions/workflows/webpack.yml/badge.svg)](https://github.com/SiO-group/sio-forms/actions/workflows/webpack.yml)
![TypeScript](https://img.shields.io/badge/types-Yes-brightgreen)

[![GitHub stars](https://img.shields.io/github/stars/SiO-group/sio-forms?style=social)](https://github.com/SiO-group/sio-forms/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/SiO-group/sio-forms?style=social)](https://github.com/SiO-group/sio-forms/forks)
![GitHub last commit](https://img.shields.io/github/last-commit/SiO-group/sio-forms)

A modular, type-safe form framework for TypeScript applications. Build complex forms with confidence using our composable architecture that separates form definition, validation, and rendering.

## Why SiO Forms?

Most form libraries tightly couple validation, rendering, and state management.

SiO Forms separates these concerns into modular packages:

- Define forms once
- Validate anywhere
- Render in any framework

This enables shared schemas between frontend and backend while maintaining full type safety.

## Philosophy

Traditional form libraries tightly couple validation, state management, and rendering. SiO Forms takes a different approach by providing **modular packages** that work together seamlessly but can also be used independently:

- **Define** your form structure with `@sio-group/form-builder`
- **Validate** your data with `@sio-group/form-validation`
- **Render** your forms with framework-specific adapters like `@sio-group/form-react`
- **Share types** across all layers with `@sio-group/form-types`

This separation gives you the flexibility to:
- Use the same validation rules across different frameworks
- Swap rendering layers without changing your form definition
- Share form schemas between frontend and backend
- Maintain type safety from definition to validation to rendering

## Packages

| Package                                                | Version                                                       | Description                                            | Documentation                                  |
|--------------------------------------------------------|---------------------------------------------------------------|--------------------------------------------------------|------------------------------------------------|
| [**@sio-group/form-types**](./packages/form-types)           | ![version](https://img.shields.io/npm/v/@sio-group/form-types)      | Core TypeScript definitions shared across all packages | [README](./packages/form-types/README.md)      |
| [**@sio-group/form-validation**](./packages/form-validation) | ![version](https://img.shields.io/npm/v/@sio-group/form-validation) | Composable validation functions with full type support | [README](./packages/form-validation/README.md) |
| [**@sio-group/form-builder**](./packages/form-builder)       | ![version](https://img.shields.io/npm/v/@sio-group/form-builder)    | Fluent API for defining form schemas                   | [README](./packages/form-builder/README.md)    |
| [**@sio-group/form-react**](./packages/form-react)           | ![version](https://img.shields.io/npm/v/@sio-group/form-react)      | React components and hooks for rendering forms         | [README](./packages/form-react/README.md)      |

## Quick Start

Choose your entry point based on your needs:

### 🚀 I want a complete form solution with React

```bash
npm install @sio-group/form-react @sio-group/form-builder @sio-group/form-validation
```

```tsx
import { Form } from '@sio-group/form-react';
import { formBuilder } from '@sio-group/form-builder';

function ContactForm() {
  const fields = formBuilder()
    .addText('name', {
      label: 'Full name',
      required: true,
      placeholder: 'John Doe'
    })
    .addEmail('email', {
      label: 'Email address',
      required: true,
      placeholder: 'john@example.com'
    })
    .addTextarea('message', {
      label: 'Message',
      rows: 5,
      placeholder: 'Your message...'
    })
    .getFields();

  return (
    <Form
      fields={fields} 
      submitAction={(values) => console.log('Form submitted:', values)} 
      submitLabel="Send Message"
    />
  );
}
```

### 🔍 I only need validation

```bash
npm install @sio-group/form-validation
```

```typescript
import { isEmail, isRequired } from '@sio-group/form-validation';

const validateEmail = isEmail('Invalid email');
validateEmail('test@example.com'); // null
validateEmail('invalid'); // "Invalid email"
```

### 📝 I want to define forms without rendering

```bash
npm install @sio-group/form-builder
```

```typescript
import { formBuilder } from '@sio-group/form-builder';

const schema = formBuilder()
  .addText('username')
  .addNumber('age', { min: 18, max: 99 })
  .addSelect('country', { 
    options: ['BE', 'NL', 'LU'] 
  })
  .getFields();
```

## Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   form-types    │──────│  form-validation│──────│   form-builder  │
│  (shared types) │      │ (validation)    │      │  (form schema)  │
└─────────────────┘      └─────────────────┘      └─────────────────┘
         │                       │                         │
         └───────────────────────┼─────────────────────────┘
                                 │
                         ┌───────▼───────┐
                         │  form-react   │
                         │  (rendering)  │
                         └───────────────┘
```

### Package Relationships

- **@sio-group/form-types**: No dependencies, used by all other packages
- **@sio-group/form-validation**: Depends on `form-types`
- **@sio-group/form-builder**: Depends on `form-types` and optionally `form-validation`
- **@sio-group/form-react**: Depends on `form-types`, `form-builder`, and optionally `form-validation`

## Key Features

- Modular architecture (definition, validation, rendering)
- Full TypeScript type inference
- Framework-agnostic core
- Composable validation rules
- Tree-shakable packages

## Documentation

Each package has its own detailed README with examples and API documentation:

- [Form Types Documentation](./packages/form-types/README.md)
- [Form Validation Documentation](./packages/form-validation/README.md)
- [Form Builder Documentation](./packages/form-builder/README.md)
- [Form React Documentation](./packages/form-react/README.md)

### Additional Resources

- [Contributing Guide](./CONTRIBUTING.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)

## Development

```bash
# Clone the repository
git clone https://github.com/sio-group/sio-forms
cd sio-forms

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests for all packages
npm test

# Run tests in watch mode
npm run test:watch

# Lint all packages
npm run lint

# Type-check all packages
npm run typecheck
```

### Workspace Structure

```
sio-forms/
├── packages/
│   ├── form-types/         # Shared type definitions
│   ├── form-validation/    # Validation engine
│   ├── form-builder/       # Form schema builder
│   ├── demo/               # Example application
│   └── form-react/         # React bindings
└── package.json            # Workspace root
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details on:

- Setting up the development environment
- Coding standards
- Pull request process
- Release process

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](./LICENSE) file for details.

## Contributors

Thanks to all contributors who have helped make SiO Forms better!

---

Made with ❤️ by the SiO Solutions Team