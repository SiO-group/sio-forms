# @sio/form-types

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
![npm](https://img.shields.io/npm/v/@sio/form-types)
![TypeScript](https://img.shields.io/badge/types-Yes-brightgreen)

<!--
[![npm version](https://img.shields.io/npm/v/@sio/form-validation.svg)](https://www.npmjs.com/package/@sio/form-validation)
[![npm downloads](https://img.shields.io/npm/dm/@sio/form-validation.svg)](https://www.npmjs.com/package/@sio/form-validation)
-->

Lightweight TypeScript type definitions for building strongly typed forms in the SIO Form ecosystem. This package provides the core types used by `@sio/form-builder`, `@sio/form-validation` and `@sio/form-react`, ensuring type safety and consistency across the entire form building experience.

---

## Installation

```bash
npm install @sio/form-types
```

## Requirements

- TypeScript >= 5.0
- Node.js >= 18

## Type-only package

This package only contains TypeScript type definitions
and has no runtime dependencies.

## Usage

```typescript
import type { 
  FormField,
  EmailFieldConfig,
  FieldConfigMap,
  TextFieldConfig,
  ValidationRule
} from '@sio/form-types';

// Define a typed form field
const nameField: FormField = {
  name: 'username',
  type: 'text',
  config: {
    label: 'Username',
    required: true,
    placeholder: 'Enter username'
  }
};

// Use config types directly
const emailConfig: EmailFieldConfig = {
  label: 'Email',
  required: true,
  placeholder: 'user@example.com',
  validations: [
    (value, label) => value?.includes('@') ? null : `${label} must contain @`
  ]
};
```

## Available Types

### Core Types

| Type                | Description                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| `InputType`         | Union of all supported input types (`'text' \| 'email' \| 'number' \| ...`) |
| `ValueType<T>`      | Maps an input type to its value type                                        |
| `LayoutType`        | Responsive layout configuration with column sizes                           |
| `ValidationRule<T>` | Function type for validation rules                                          |
| `Option`            | Option object with label and value                                          |
| `AcceptType`        | File accept types                                                           |
| `CaptureType`       | Media capture types                                                         |

### Layout Configuration

```typescript
interface LayoutType {
  sm?: ColumnSize;      // 1-12 columns for small screens
  md?: ColumnSize;      // 1-12 columns for medium screens
  lg?: ColumnSize;      // 1-12 columns for large screens
  order?: { 
    sm?: number; 
    md?: number; 
    lg?: number 
  };
  className?: string;
  style?: CSSProperties;
}

type ColumnSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
```

### Value Types Mapping

The `ValueType<T>` type maps each input type to its JavaScript type:

| Input Type                             | Value Type            |
|----------------------------------------|-----------------------|
| `'text'`, `'email'`, `'url'`, etc.     | `string`              |
| `'number'`, `'range'`                  | `number`              |
| `'checkbox'`                           | `boolean`             |
| `'file'`                               | `unknown`             |
| `'select'`, `'creatable'`              | `Option \| Option[]`  |
| `'radio'`                              | `string` (via config) |
| `'date'`, `'time'`, `'datetime-local'` | `string`              |

### Field Configuration Types

| Type                   | Description                            | Extra Properties                                                  |
|------------------------|----------------------------------------|-------------------------------------------------------------------|
| `Base<T>`              | Base configuration for all field types | -                                                                 |
| `TextFieldConfig`      | Text input configuration               | `pattern?: RegExp`                                                |
| `SearchFieldConfig`    | Search input configuration             | -                                                                 |
| `EmailFieldConfig`     | Email input configuration              | -                                                                 |
| `TelephoneFieldConfig` | Telephone input configuration          | `pattern?: RegExp`                                                |
| `PasswordFieldConfig`  | Password input configuration           | -                                                                 |
| `UrlFieldConfig`       | URL input configuration                | `allowLocalhost?`, `allowFtp?`, `secureOnly?`, `pattern?: RegExp` |
| `NumberFieldConfig`    | Number input configuration             | `min?`, `max?`, `step?`                                           |
| `RangeFieldConfig`     | Range input configuration              | `min?`, `max?`, `step?`                                           |
| `TextareaFieldConfig`  | Textarea configuration                 | `rows?`, `cols?`                                                  |
| `DateFieldConfig`      | Date/time input configuration          | `min?`, `max?`, `step?`                                           |
| `ColorFieldConfig`     | Color input configuration              | -                                                                 |
| `FileFieldConfig`      | File input configuration               | `accept?`, `filesize?`, `multiple?`, `capture?`                   |
| `CheckboxFieldConfig`  | Checkbox configuration                 | -                                                                 |
| `RadioFieldConfig`     | Radio button configuration             | **`options: string[] \| Option[]`** (required)                    |
| `SelectFieldConfig`    | Select dropdown configuration          | **`options: string[] \| Option[]`** (required), `multiple?`       |
| `HiddenFieldConfig`    | Hidden input configuration             | -                                                                 |

## Base Configuration Interface

All field types extend `Base` interface:

```typescript
interface Base<T extends InputType> {
  defaultValue?: ValueType<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autocomplete?: string;
  validations?: ValidationRule<T>[];
  icon?: string;
  layout?: LayoutType;
  styling?: {
    className?: string;
    style?: CSSProperties;
  };
}
```

## Field Config Map

The `FieldConfigMap` binds each input type to its configuration type:

```typescript
type FieldConfigMap = {
  text: TextFieldConfig;
  search: SearchFieldConfig;
  textarea: TextareaFieldConfig;
  email: EmailFieldConfig;
  checkbox: CheckboxFieldConfig;
  radio: RadioFieldConfig;
  select: SelectFieldConfig;
  creatable: SelectFieldConfig;
  tel: TelephoneFieldConfig;
  password: PasswordFieldConfig;
  hidden: HiddenFieldConfig;
  color: ColorFieldConfig;
  number: NumberFieldConfig;
  range: RangeFieldConfig;
  date: Extract<DateFieldConfig, Base<'date'>>;
  time: Extract<DateFieldConfig, Base<'time'>>;
  'datetime-local': Extract<DateFieldConfig, Base<'datetime-local'>>;
  file: FileFieldConfig;
  url: UrlFieldConfig;
};
```

## Form Field Type

The `FormField` type is a discriminated union of all possible field combinations:

```typescript
type FormField = {
  [K in keyof FieldConfigMap]: {
    name: string;
    type: K;
    config: FieldConfigMap[K];
  }
}[keyof FieldConfigMap];
```

This ensures that the correct config is made available with the correct type:

```typescript
// ✅ Correct - 'text' gets TextFieldConfig
const textField: FormField = {
  name: 'name',
  type: 'text',
  config: { pattern: /^[A-Z]+$/ } // ✅ TextFieldConfig has pattern
};

// ✅ Correct - 'select' has SelectFieldConfig
const selectField: FormField = {
  name: 'country',
  type: 'select',
  config: { 
    options: ['BE', 'NL'], // ✅ SelectFieldConfig requires options
    multiple: true 
  }
};

// ❌ Type error - 'select' has no pattern
const wrongField: FormField = {
  name: 'country',
  type: 'select',
  config: { pattern: /^[A-Z]+$/ } // ❌ Property 'pattern' does not exist
};
```

## Option Types

```typescript
import { Option } from '@sio/form-types';

// Simple string options
const stringOptions = ['Belgium', 'Netherlands', 'Luxembourg'];

// Object options met label en value
const objectOptions: Option[] = [
  { label: 'Belgium', value: 'be' },
  { label: 'Netherlands', value: 'nl' },
  { label: 'Luxembourg', value: 'lu' }
];
```

## Validation Rules

```typescript
import { ValidationRule } from '@sio/form-types';
import { FieldConfigMap } from '@sio/form-types';

// Generic validation rule
const isRequired: ValidationRule<keyof FieldConfigMap> = (value, label) => {
  if (value === null || value === undefined || value === '') {
    return `${label} is verplicht`;
  }
  return null;
};

// Type-specific validation rule
const isEmail: ValidationRule<'email'> = (value, label = 'Email') => {
  if (typeof value === 'string' && !value.includes('@')) {
    return `${label} is niet geldig`;
  }
  return null;
};
```

## Usage met @sio/form-builder

```typescript
import { formBuilder } from '@sio/form-builder';
import type { FormField } from '@sio/form-types';

const builder = formBuilder()
  .addText('name', { label: 'Name' })
  .addEmail('email', { label: 'Email' });

const fields: FormField[] = builder.getFields();
```

## Usage met @sio/form-validation

```typescript
import { isRequired, isEmail } from '@sio/form-validation';
import type { ValidationRule } from '@sio/form-types';

const validations: ValidationRule<keyof FieldConfigMap>[] = [
  isRequired('Naam is verplicht'),
  isEmail('Ongeldig email adres')
];
```

## Ecosystem

`@sio/form-types` is part of the SIO Form ecosystem:

- **[@sio/form-types](../form-types/README.md)** - This package: Shared type definitions (you are here)
- **[@sio/form-builder](../form-builder/README.md)** - Define your form structure
- **[@sio/form-validation](../form-validation/README.md)** - Validate your data
- **[@sio/form-react](../form-react/README.md)** - React renderer and hooks for the builder

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE](../../LICENSE) file for details.