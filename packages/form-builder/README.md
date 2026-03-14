# @sio/form-builder

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
![npm version](https://img.shields.io/badge/version-0.1.0-blue)
![TypeScript](https://img.shields.io/badge/types-Yes-brightgreen)

<!--
[![npm version](https://img.shields.io/npm/v/@sio/form-validation.svg)](https://www.npmjs.com/package/@sio/form-validation)
[![npm downloads](https://img.shields.io/npm/dm/@sio/form-validation.svg)](https://www.npmjs.com/package/@sio/form-validation)
-->

A fully typed, fluent API form builder for generating structured form definitions in TypeScript.
This package is the foundation of the **@sio/form-react** component, but can be used
independently with any rendering layer (React, Vue, Svelte, or server-side rendering).

Building complex forms often starts with defining their structure. While you *could* write a plain array of field objects, ensuring type-safety for every field's specific configuration (like `min`/`max` for numbers or `options` for selects) is tedious and repetitive. `@sio/form-builder` provides a fluent and fully typed API to define this structure, letting you focus on what fields you need, not *how* to type them correctly.

---

## Installation

```bash
npm install @sio/form-builder
```

## Quick Example
```javascript
import { formBuilder } from '@sio/form-builder';

const form = formBuilder()
  .addText('firstName', { 
    label: 'First name', 
    required: true, 
    placeholder: 'John' 
  })
  .addEmail('email', { 
    label: 'Email', 
    required: true 
  })
  .addSelect('role', { 
    label: 'Role', 
    options: ['Admin', 'Editor', 'User'] 
  })
  .getFields();

console.log(form);
```


Output:
```javascript
[
  {
    "name": "firstName",
    "type": "text",
    "config": {
      "label": "First name",
      "required": true,
      "placeholder": "John"
    }
  },
  {
    "name": "email",
    "type": "email",
    "config": {
      "label": "Email",
      "required": true
    }
  },
  {
    "name": "role",
    "type": "select",
    "config": {
      "label": "Role",
      "options": ["Admin", "Editor", "User"]
    }
  }
]
```

## API
### Create Builder

```javascript
const builder = formBuilder();
```

Returns a new FormBuilder instance.

### Retrieve Fields
```javascript
builder.getFields();
```

Returns a copy of the internal field array.

## Supported Field Types
### Text Inputs

```javascript
addText(name, config)
addSearch(name, config)
addEmail(name, config)
addTelephone(name, config)
addPassword(name, config)
addUrl(name, config)
```

Example
```javascript
builder.addText('username', { 
  label: 'Username', 
  required: true
});
```

### Numeric Inputs

```javascript
addNumber(name, config)
addRange(name, config)
```

Example
```javascript
builder.addNumber('age', { 
  min: 18, 
  max: 99, 
  step: 1
});
```

### Date & Time

```javascript
addDate(name, config)
addTime(name, config)
addDateTime(name, config)
```

Example
```javascript
builder.addDate('birthdate', { 
  min: '1900-01-01', 
  max: '2025-01-01'
});
```

### Select & Choice

```javascript
addSelect(name, config)
addCreatable(name, config)
addRadio(name, config)
addCheckbox(name, config)
```

Example
```javascript
builder.addSelect('country', { 
  options: [
    { label: 'Belgium', value: 'be' }, 
    { label: 'Netherlands', value: 'nl' }
  ], 
  multiple: false
});
```

### Textarea
```javascript
addTextarea(name, config)
```

Example
```javascript
builder.addTextarea('bio', { 
  rows: 4
});
```

### File
```javascript
addFile(name, config)
```

Example
```javascript
builder.addFile('avatar', { 
  accept: 'image/*', 
  multiple: false
});
```

### Other
```javascript
addColor(name, config)
addHidden(name, config)
```

## Configuration Model

All fields accept an **optional** configuration object. If you don't need any configuration, you can simply pass the field name:

```javascript
formBuilder()
  .addText('firstName')                    // ✅ Minimal: just the name
  .addEmail('email', { required: true })   // ✅ With configuration
  .getFields();
```

When provided, the configuration object extends the base interface:

```typescript
interface Base<T extends InputTypes> { 
  defaultValue?: ValueTypes<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  icon?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  autocomplete?: string;
}
```

### Required Configuration
Some field types **require** additional configuration:

| Field Type       | Required Properties                     |
|------------------|-----------------------------------------|
| `addSelect()`    | `options` (array of strings or objects) |
| `addCreatable()` | `options` (array of strings or objects) |
| `addRadio()`     | `options` (array of strings or objects) |

Example
```javascript
// ✅ Valid: options provided
builder.addSelect('country', { 
  options: ['Belgium', 'Netherlands']
});

// ❌ Invalid: options missing
builder.addSelect('country', {});  // Type error!
builder.addSelect('country');      // Type error!
```

### Optional Field-Specific Properties
Other field types may add optional properties such as:
- ```min```, ```max```, ```step```
- ```multiple``` 
- ```accept```
- ```filesize``` 
- ```rows```, ```cols```
- etc.

Example of field-specific configuration:
```javascript
// Textarea has optional 'rows' and 'cols'
const textareaConfig = { label: 'Bio', rows: 5, placeholder: 'Tell something about yourself...' };

// Number has optional 'min', 'max' and 'step'
const numberConfig = { min: 18, max: 99 };
```

## Type Safety

The builder is fully generic and enforces:
- Correct config per field type 
- Correct defaultValue type per input
- Valid option structures for select/radio fields 
- Strong compile-time guarantees

Example of invalid usage:
```javascript
builder.addNumber('age', { 
  min: '18' // ❌ Type error
});
```

## Chaining

All ```addX``` methods return the builder instance:

```javascript
formBuilder()
.addText('firstName', { label: 'First name' })
.addEmail('email', { label: 'Email' })
.addPassword('password', { label: 'Password' })
.getFields();
```

## Architecture

The builder stores fields internally as:
```javascript
FormField<InputTypes>[]
```

Each field has:
```javascript
{
  name: string
  type: InputTypes
  config: FieldConfigMap[T]
}
```

This makes the library:
- UI framework agnostic
- SSR friendly
- Easily serializable
- Suitable for headless form rendering

## Ecosystem

`@sio/form-builder` is the core of the SIO Form ecosystem:

- **[@sio/form-types](../form-types/README.md)** - Shared type definitions
- **[@sio/form-builder](../form-builder/README.md)** - This package: Define your form structure (you are here)
- **[@sio/form-validation](../form-validation/README.md)** - Validate your data
- **[@sio/form-react](../form-react/README.md)** - React renderer and hooks for the builder

This modular approach lets you use the same form definitions across different frameworks or even generate server-side validated forms from the same structure.

## Intended Usage Pattern

This package defines form structure only. It is the **core building block** for framework-specific
renderers like `@sio/form-builder-react`.

It does **not**:
- Render UI
- Handle validation
- Manage form state
- Perform submission logic

It is intended to be consumed by a renderer (e.g. React adapter).

## Example Integration (React)
```javascript
const fields = formBuilder()
  .addText('firstName', { label: 'First name' })
  .addEmail('email', { label: 'Email' })
  .getFields();

return (
  <>
    {fields.map(field => (
      <MyFieldRenderer key={field.name} field={field} />
    ))}
  </>
);
```

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE](../../LICENSE) file for details.
