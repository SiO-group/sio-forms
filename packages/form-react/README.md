# @sio-group/form-react

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
![npm](https://img.shields.io/npm/v/@sio-group/form-react)
![TypeScript](https://img.shields.io/badge/types-Yes-brightgreen)

<!--
[![npm version](https://img.shields.io/npm/v/@sio-group/form-validation.svg)](https://www.npmjs.com/package/@sio-group/form-validation)
[![npm downloads](https://img.shields.io/npm/dm/@sio-group/form-validation.svg)](https://www.npmjs.com/package/@sio-group/form-validation)
-->

A powerful, type-safe React form framework. This package provides ready-to-use form components with built-in validation, layout management, and extensive customization options. This package is designed to work seamlessly with `@sio-group/form-builder` and `@sio-group/form-validation`, but can be used independently.

Part of the SIO Form ecosystem, it consumes form definitions from `@sio-group/form-builder` and renders them with full type safety and accessibility in mind.

---

## Installation

```bash
npm install @sio-group/form-react
```

**Peer Dependencies:**
- `react`: ^19.0.0
- `react-dom`: ^19.0.0

---

## Quick Example

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

### Voorbeeld

![Contact form](screenshots/contact-form.png)
*A simple contact form*

---

## Features

- ✅ **Type-safe** - Full TypeScript support with inferred types
- ✅ **Built-in validation** - Automatic validation based on field configuration
- ✅ **Responsive layout** - Grid system with breakpoints (sm, md, lg)
- ✅ **Customizable buttons** - Multiple button variants and colors
- ✅ **Form state management** - Tracks dirty, touched, focused, and error states
- ✅ **Accessibility** - ARIA attributes and keyboard navigation
- ✅ **Offline support** - Disable forms when offline
- ✅ **File uploads** - Built-in file handling with validation
- ✅ **Icons** - Support for HTML and component icons
- ✅ **Flexible containers** - Custom form and button containers

---

## Core Components

### Form Component

The main component that renders your form with all fields and buttons.

```tsx
import { Form } from '@sio-group/form-react';

<Form
  fields={fields}
  layout={layoutConfig}
  submitShow={true}
  submitAction={handleSubmit}
  submitLabel="Save"
  cancelShow={true}
  cancelAction={handleCancel}
  cancelLabel="Cancel"
  buttons={buttonConfig}
  extraValidation={customGlobalValidation}
  className="my-form"
  container={CustomContainer}
  buttonContainer={CustomButtonContainer}
/>
```

### Individual Field Components

You can also use field components independently:

```tsx
import { 
  useForm,
  Input, 
  Textarea, 
  Select, 
  Radio, 
  Checkbox,
  NumberInput,
  RangeInput,
  DateInput,
  FileInput,
  TextInput 
} from '@sio-group/form-react';

// Use with useForm hook
const { register } = useForm();

return (
  <Input {...register('username', fieldConfig)} />
);
```

---

## API Reference

### Form Props

| Prop                 | Type                           | Default                  | Description                  |
|----------------------|--------------------------------|--------------------------|------------------------------|
| `fields`             | `FormField[]`                  | (required)               | Array of form fields         |
| `submitAction`       | `(values: any) => void`        | (required)               | Submit handler               |
| `layout`             | `FormLayout[]`                 | `[]`                     | Custom layout configuration  |
| `submitShow`         | `boolean`                      | `true`                   | Show submit button           |
| `submitLabel`        | `string`                       | `'Bewaar'`               | Submit button text           |
| `cancelShow`         | `boolean`                      | `false`                  | Show cancel button           |
| `cancelLabel`        | `string`                       | `'Annuleren'`            | Cancel button text           |
| `cancelAction`       | `() => void`                   | -                        | Cancel handler               |
| `buttons`            | `(ButtonProps \| LinkProps)[]` | `[]`                     | Additional buttons           |
| `extraValidation`    | `(values: any) => boolean`     | `() => true`             | Extra validation             |
| `className`          | `string`                       | -                        | CSS class for form container |
| `style`              | `React.CSSProperties`          | -                        | Inline styles                |
| `disableWhenOffline` | `boolean`                      | `true`                   | Disable form when offline    |
| `container`          | `React.ComponentType`          | `DefaultContainer`       | Custom form container        |
| `buttonContainer`    | `React.ComponentType`          | `DefaultButtonContainer` | Custom button container      |

### Layout Configuration

The `layout` prop allows you to arrange fields in a responsive grid:

```tsx
const layout = [
  { 
    layout: { sm: 12, md: 6, lg: 4 },  // Responsive column spans
    fields: ['name', 'email']           // Fields in this row
  },
  {
    layout: { sm: 12, md: 12, lg: 8 },
    fields: ['message'],
    className: 'custom-row',            // Optional CSS class
    style: { marginBottom: '2rem' }      // Optional inline styles
  }
];
```

**Breakpoint options:**
- `sm`: Small (≥640px)
- `md`: Medium (≥768px)
- `lg`: Large (≥1024px)

### Button Configuration

Buttons can be configured as an array:

```tsx
const buttons = [
  {
    type: 'button',
    variant: 'primary',
    color: 'success',
    label: 'Save Draft',
    onClick: () => saveDraft()
  },
  {
    type: 'button',
    variant: 'secondary',
    color: 'warning',
    label: 'Reset',
    onClick: () => reset()
  },
  {
    type: 'link',
    variant: 'link',
    color: 'info',
    label: 'Help',
    href: '/help'
  }
];
```

**Button Props:**
- `type: 'button' | 'link'`
- `variant: 'primary' | 'secondary' | 'link'`
- `color: 'default' | 'success' | 'warning' | 'error' | 'info'`
- `label: string`
- `onClick?: () => void` (for buttons)
- `href?: string` (for links)
- `loading?: boolean`
- `disabled?: boolean`

---

## Hooks

### useForm

A powerful hook for managing form state independently:

```tsx
import { useForm } from '@sio-group/form-react';

function CustomForm() {
  const { register, getValues, isValid, isBusy, reset, submit } = useForm();

  const handleSubmit = async () => {
    await submit(async (values) => {
      await api.save(values);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input {...register('username', fieldConfig)} />
      <button type="submit" disabled={!isValid() || isBusy()}>
        Submit
      </button>
    </form>
  );
}
```

**useForm Return Value:**

| Method                   | Description                    |
|--------------------------|--------------------------------|
| `register(name, config)` | Register a field and get props |
| `unregister(name)`       | Remove a field from form       |
| `setValue(name, value)`  | Set field value                |
| `getValues()`            | Get all form values            |
| `getValue(name)`         | Get single field value         |
| `reset()`                | Reset form state               |
| `isValid()`              | Check if form is valid         |
| `isDirty()`              | Check if form has changes      |
| `isBusy()`               | Check if form is submitting    |
| `submit(handler)`        | Submit form with handler       |
| `getField(name)`         | Get field state                |

### Conditional Fields

You can dynamically render fields based on other field values.

```javascript
import { useForm, Input, Checkbox } from '@sio-group/form-react';

function Example() {
  const { register, getValue } = useForm();
  
  return (
    <>
      <Checkbox
        {...register('subscribe', { 
          name: 'subscribe', 
          type: 'checkbox', 
          config: { label: 'Subscribe to newsletter' } 
        })} 
      />

      {getValue('subscribe') && (
        <Input
          {...register('email', {
            name: 'email',
            type: 'email',
            config: {
              label: 'Email address',
              required: true
            }
          })}
        />
      )}
    </>
  );
}
```

### Custom Validation

Default validation is automatically derived from the field configuration (`required`, `min`, `max`, `email`, etc.).
Additional validation rules can be added using the validations array.

```javascript
import { Input } from '@sio-group/form-react';

<Input
  {...register('username', {
    name: 'username',
    type: 'text',
    config: {
      label: 'Username',
      required: true,
      validations: [
        (value) => value.length < 3 ? 'Username must contain at least 3 characters' : null,
        (value) => value.includes('admin') ? 'Username cannot contain admin' : null
      ]
    },
  })}
/>
```

![Username](screenshots/invalid-username.png)
*Custom validation for admin in username*

---

## Field Components

### Input Types

All standard HTML input types are supported:

- `text`, `search`, `email`, `tel`, `password`, `url`
- `number` (with spinner options)
- `range` (with value display)
- `date`, `time`, `datetime-local`
- `color`
- `hidden`
- `file` (with file validation)

### Specialized Components

#### NumberInput
```tsx
<NumberInput
  {...register('age', {
    name: "age",
    type: "number",
    config: {
      label: "Age",
      min: 0,
      max: 120,
      step: 1,
      spinner: 'horizontal' // or "vertical", true, false
    }
  }) as NumberFieldProps}
/>
```

![NumberInput](screenshots/number-field.png)
*Number input with horizontal spinner*

#### RangeInput
```tsx
<RangeInput
  {...register('volume', {
    name: "volume",
    type: "range",
    config: {
      label: "Volume",
      min: 0,
      max: 120,
      step: 1,
      showValue: true,
    }
  }) as NumberFieldProps}
/>
```

![RangeInput](screenshots/range-field.png)
*Range input with shown value*

#### FileInput
```tsx
<FileInput
  {...register('documents', {
    name: "documents",
    type: "file",
    config: {
      label: "Documenten",
      accept: ".pdf,.doc",
      multiple: true,
      filesize: 5120, // 5MB in KB
      capture: false,
      onFileRemove: (file) => console.log('Removed:', file),
      onRemoveAll: (files) => console.log('All removed:', files)
    }
  }) as FileFieldProps}
/>
```

![FileInput](screenshots/file-input.png)
*Multiple file input*

#### Select
```tsx
<Select
  {...register('country', {
    name: 'country',
    type: 'select',
    config: {
      options: [
        { value: 'be', label: 'Belgium' },
        { value: 'nl', label: 'Netherlands' },
        {
          label: 'Europe',
          options: [
            { value: 'fr', label: 'France' }
          ]
        }
      ],
      multiple: false,
      placeholder: "Choose a country"
    }
  }) as SelectFieldProps}
/>
```

![Select](screenshots/select-field.png)
*Single select input*

#### Radio
```tsx
<Radio
  {...register('country', {
    name: "country",
    type: "radio",
    config: {
      label: "Country",
      options: ['Red', 'Green', 'Blue'],
      inline: true
    }
  }) as RadioFieldProps}
/>
```

![Radio](screenshots/radio-field.png)
*Inline radio input*

#### Textarea
```tsx
<Textarea
  {...register('bio', {
    name: "bio",
    type: "textarea",
    config: {
      label: "Bio",
      placeholder: "Tell us about yourself...",
      rows: 5,
      cols: 40,
    }
  }) as TextareaFieldProps}
/>
```

![Textarea](screenshots/textarea-field.png)
*Textarea input*

---

## Standalone Components

### Controlled Usage (with `useForm`)

You can use the `useForm` hook to control how you use the form, centrally managing state, validation, and submission. This also demonstrates conditional rendering and error automation.

```javascript
import { useForm, Input, Button } from '@sio-group/form-react';

function FormWithHook() {
  const { register, getValue, isValid, isBusy, submit } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submit(values => console.log('Form values:', values));
  };

  return (
    <form noValidate>
      <Input
        {...register('email', {
          name: 'email',
          type: 'email',
          config: {
            label: 'Email Address',
            required: true,
            validations: [
              val => val.includes('@') ? null : 'Must be a valid email',
            ]
          }
        })}
      />

      <Button
        type="submit"
        variant="primary"
        disabled={!isValid()}
        onClick={handleSubmit}
      >
        {isBusy() ? 'sending' : 'Submit'}
      </Button>

      {getValue('email') && <p>Your email: {getValue('email')}</p>}
    </form>
  );
}
```

### Uncontrolled Usage (without `useForm`)

All field components and buttons can also be used independently. You can keep and manage state for the form depending on your needs.

```javascript
import { useState } from 'react';
import { Input, Button } from '@sio-group/form-react';

function SimpleForm() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (value) => {
    if (!value) {
      setError("This is wrong");
      setIsValid(false);
    } else {
      setError("");
      setIsValid(true);
    }

    setValue(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  }

  return (
    <form noValidate>
      <TextInput
        type="email"
        id="email"
        name="email"
        value={value}
        errors={error ? [error] : []}
        touched={touched}
        focused={focused}
        disabled={false}
        onChange={handleChange}
        setFocused={setFocused}
        setTouched={setTouched}
      />

      <Button
        type="submit"
        variant="primary"
        onClick={handleSubmit}
        disabled={!isValid}
      >
        Submit
      </Button>
    </form>
  );
}
```

### Button Props
| Prop       | Type                                                       | Default     | Description             |
|------------|------------------------------------------------------------|-------------|-------------------------|
| `type`     | `'button' \| 'submit' \| 'reset'`                          | `'button'`  | Button type             |
| `label`    | `string`                                                   | -           | Label of the Link       |
| `onClick`  | `(e: React.MouseEvent) => void`                            | -           | Custom onClick function |
| `variant`  | `'primary' \| 'secondary' \| 'link'`                       | `'primary'` | Visual variant          |
| `color`    | `'default' \| 'error' \| 'success' \| 'warning' \| 'info'` | `'default'` | Color theme             |
| `size`     | `'sm' \| 'md' \| 'lg'`                                     | `'md'`      | Button size             |
| `block`    | `boolean`                                                  | `false`     | Full width              |
| `loading`  | `boolean`                                                  | `false`     | Loading state           |
| `disabled` | `boolean`                                                  | `false`     | Disabled state          |

### Link Props
| Prop       | Type                                                       | Default     | Description              |
|------------|------------------------------------------------------------|-------------|--------------------------|
| `label`    | `string`                                                   | -           | Label of the Link        |
| `to`       | `string`                                                   | `'#'`       | URL or pad               |
| `onClick`  | `(e: React.MouseEvent) => void`                            | -           | Custom onClick function  |
| `color`    | `'default' \| 'error' \| 'success' \| 'warning' \| 'info'` | `'default'` | Color theme              |
| `size`     | `'sm' \| 'md' \| 'lg'`                                     | `'md'`      | Button size              |
| `block`    | `boolean`                                                  | `false`     | Full width               |
| `loading`  | `boolean`                                                  | `false`     | Loading state            |
| `disabled` | `boolean`                                                  | `false`     | Disabled state           |
| `navigate` | `() => void`                                               | -           | Custom navigate function |
| `external` | `boolean`                                                  | `false`     | Force external link      |


---

## Styling

### Default Styles

Import the default styles:

```tsx
import '@sio-group/form-react/sio-form-style.css';
```

### Custom Styling

Each component accepts `className` and `style` props for custom styling:

```tsx
<Input
  {...register('username', {
    name: 'username',
    type: 'text',
    config: {
      styling: {
        className: 'custom-input',
        style: {
          backgroundColor: '#f0f0f0'
        }
      }
    }
  })}
/>
```

### Layout Classes

The form uses a responsive grid system. You can target these classes:

- `.sio-row` - Grid container
- `.sio-col-xs-*` - Column classes for breakpoints
- `.sio-col-sm-*`
- `.sio-col-md-*`
- `.sio-col-lg-*`
- `.sio-col-xl-*`

Example with Tailwind CSS:
```tsx
<Form
  fields={fields}
  className="max-w-2xl mx-auto"
  layout={[
    { layout: { md: 6 }, fields: ['firstName'], className: 'pr-2' },
    { layout: { md: 6 }, fields: ['lastName'], className: 'pl-2' }
  ]}
/>
```

---

## Complete Example

```tsx
import { Form } from '@sio-group/form-react';
import { formBuilder } from '@sio-group/form-builder';
import '@sio-group/form-react/sio-form-style.css';

function RegistrationForm() {
  const fields = formBuilder()
    .addText('firstName', {
      label: 'First name',
      required: true,
      layout: { md: 6 }
    })
    .addText('lastName', {
      label: 'Last name',
      required: true,
      layout: { md: 6 }
    })
    .addEmail('email', {
      label: 'Email',
      required: true,
      layout: { md: 6 }
    })
    .addTelephone('phone', {
      label: 'Phone',
      layout: { md: 6 }
    })
    .addPassword('password', {
      label: 'Password',
      required: true,
      layout: { md: 6 }
    })
    .addPassword('confirmPassword', {
      label: 'Confirm password',
      required: true,
      layout: { md: 6 }
    })
    .addCheckbox('terms', {
      label: 'I accept the terms and conditions',
      required: true
    })
    .getFields();

  const handleSubmit = (values) => {
    console.log('Registration:', values);
  };

  const customButtons = [
    {
      type: 'button',
      variant: 'secondary',
      color: 'info',
      label: 'Clear form',
      onClick: () => console.log('Clear')
    }
  ];

  return (
    <Form
      fields={fields}
      submitAction={handleSubmit}
      submitLabel="Register"
      cancelShow={true}
      cancelAction={() => console.log('Cancelled')}
      buttons={customButtons}
      className="registration-form"
      layout={[
        { layout: { md: 6 }, fields: ['firstName'] },
        { layout: { md: 6 }, fields: ['lastName'] },
        { layout: { md: 6 }, fields: ['email'] },
        { layout: { md: 6 }, fields: ['phone'] },
        { layout: { md: 6 }, fields: ['password'] },
        { layout: { md: 6 }, fields: ['confirmPassword'] },
        { layout: { md: 12 }, fields: ['terms'] }
      ]}
    />
  );
}
```

![RegistrationForm](screenshots/registration-form.png)
*A simple registration form with simple layout*

---

## Ecosystem

`@sio-group/form-react` is part of the SIO Form ecosystem:

- **[@sio-group/form-types](../form-types/README.md)** - Shared type definitions
- **[@sio-group/form-builder](../form-builder/README.md)** - Define your form structure
- **[@sio-group/form-validation](../form-validation/README.md)** - Validate your data
- **[@sio-group/form-react](../form-react/README.md)** - This package: React renderer and hooks for the builder (you are here)

---

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE](../../LICENSE) file for details.