# @sio/form-validation

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
![npm version](https://img.shields.io/badge/version-0.1.0-blue)
![TypeScript](https://img.shields.io/badge/types-Yes-brightgreen)

<!--
[![npm version](https://img.shields.io/npm/v/@sio/form-validation.svg)](https://www.npmjs.com/package/@sio/form-validation)
[![npm downloads](https://img.shields.io/npm/dm/@sio/form-validation.svg)](https://www.npmjs.com/package/@sio/form-validation)
-->

A fully typed, composable validation library for validating form inputs and data structures in TypeScript.
This package is designed to work seamlessly with `@sio/form-builder` and `@sio/form-react`, but can be used independently with any validation needs.

Validating user input is crucial, but writing the same validation logic repeatedly is tedious and error-prone. While you could write custom validation functions for every field, ensuring type-safety and consistent error handling is challenging. `@sio/form-validation` provides a set of pre-built, fully typed validation functions that are composable, configurable, and framework-agnostic.

---

## Installation

```bash
npm install @sio/form-validation
```

## Quick Example
```javascript
import { isRequired, isEmail, isPattern } from '@sio/form-validation';

// Create validators
const validateEmail = isEmail();
const validateRequired = isRequired();

// Use them directly
validateEmail('test@example.com'); // null
validateEmail('invalid'); // "Dit is geen geldig e-mailadres."

validateRequired(''); // "Dit is een verplicht veld."
validateRequired('value'); // null

// Compose multiple validations
const validations = [
  isRequired('Email is verplicht'), 
  isEmail('Ongeldig email formaat'), 
  isPattern(/^[^@]+@company\.com$/, 'Alleen company emails toegestaan')
];

function validateField(value, label) {
  return validations
    .map(v => v(value, label))
    .filter(error => error !== null);
}

console.log(validateField('test@company.com', 'Email'));
// [] (no errors)

console.log(validateField('invalid', 'Email'));
// ['Ongeldig email formaat']
```

## Core Concepts

All validations in this library follow the same pattern:
1. **Higher-Order Functions** - Each validator is a function that returns a validation function 
2. **Consistent Return Type** - Always returns `null` for valid values, `string` for errors
3. **Empty Value Handling** - Empty values (`null`, `undefined`, `''`) are considered valid (use with isRequired() for mandatory fields)
4. **Custom Error Messages** - Most validators accept an optional custom error message with `{label} placeholder

## Available Validations

### Core Validations
| Function          | Description                                | Example                                             |
|-------------------|--------------------------------------------|-----------------------------------------------------|
| `isRequired()`	   | Checks if value is present (not empty)	    | `isRequired()('')` → "Dit is een verplicht veld."   |
| `isEmail()`	      | Validates email format	                    | `isEmail()('test@example.com')` → null              |
| `isUrl()`         | Validates URL with configurable options	   | `isUrl()('https://example.com')` → null             |
| `isPattern()`	    | Validates against regex pattern	           | `isPattern(/^[A-Z]+$/)('ABC')` → null               |

### Number Validations
| Function             | 	Description	                 | Example                         |
|----------------------|-------------------------------|---------------------------------|
| `isBiggerThan(min)`  | 	Checks if number >= minimum	 | `isBiggerThan(18)(20)` → null   |
| `isSmallerThan(max)` | 	Checks if number <= maximum	 | `isSmallerThan(100)(50)` → null |

### Date Validations
| Function	                 | Description	               | Example                                                          |
|---------------------------|----------------------------|------------------------------------------------------------------|
| `dateIsBiggerThan(min)`	  | Checks if date >= minimum	 | `dateIsBiggerThan(new Date('2024-01-01'))('2024-06-01')` → null  |
| `dateIsSmallerThan(max)`	 | Checks if date <= maximum	 | `dateIsSmallerThan(new Date('2024-12-31'))('2024-06-01')` → null |

### File Validations
| Function	                       | Description	Example           |
|---------------------------------|-------------------------------|
| `isValidFile(maxSize, accept)`	 | Validates file size and type	 |`isValidFile(1024, 'image/*')(file)` → null|

## Detailed Usage

### isRequired

```javascript
import { isRequired } from '@sio/form-validation';

const validate = isRequired('{label} moet ingevuld worden');

validate('test'); // null
validate(''); // "Dit moet ingevuld worden"
validate([]); // "Dit moet ingevuld worden"
validate(false); // "Dit moet ingevuld worden" (for checkboxes)
validate(0); // null (0 is considered valid)
```

### isEmail

```javascript
import { isEmail } from '@sio/form-validation';

const validate = isEmail('Ongeldig email adres');

validate('user@example.com'); // null
validate('user.name+tag@example.co.uk'); // null
validate('invalid'); // "Ongeldig email adres"
validate('user@'); // "Ongeldig email adres"
```

### isUrl with Options

```javascript
import { isUrl } from '@sio/form-validation';

// Strict mode (default)
const validateStrict = isUrl();
validateStrict('https://example.com'); // null
validateStrict('http://example.com'); // "Dit moet https gebruiken."

// Development mode (allow localhost and HTTP)
const validateDev = isUrl(true, false, false);
validateDev('http://localhost:3000'); // null
```

### isPattern

```javascript
import { isPattern } from '@sio/form-validation';

// With RegExp (letters and numbers)
const validateCode = isPattern(/^[A-Z0-9]+$/);
validateCode('ABC123'); // null
validateCode('abc123'); // "Dit heeft een ongeldig patroon."

// With string pattern (postcode)
const validatePostcode = isPattern('^[1-9][0-9]{3}[A-Z]{2}$');
validatePostcode('1234AB'); // null
validatePostcode('1234'); // "Dit heeft een ongeldig patroon."

// With flags (case-insensitive)
const validateCase = isPattern('/^[a-z0-9]+$/i');
validateCase('ABC123'); // null (case-insensitive)
```

### Number Validations

```javascript
import { isBiggerThan, isSmallerThan } from '@sio/form-validation';

const validateAge = isBiggerThan(18, 'Je moet minimaal 18 jaar zijn');
validateAge(25); // null
validateAge(16); // "Je moet minimaal 18 jaar zijn"

const validatePrice = isSmallerThan(1000, 'Prijs mag maximaal €1000 zijn');
validatePrice(500); // null
validatePrice(1500); // "Prijs mag maximaal €1000 zijn"
```

### Date Validations

```javascript
import { dateIsBiggerThan, dateIsSmallerThan } from '@sio/form-validation';

const validateStart = dateIsBiggerThan(
  new Date('2024-01-01'),
  'Startdatum moet na 1 januari 2024 zijn'
);

validateStart('2024-06-01'); // null
validateStart('2023-12-31'); // "Startdatum moet na 1 januari 2024 zijn"

const validateTime = dateIsBiggerThan(new Date().setTime('12:00'));
validateTime('13:00'); // null
validateTime('11:00'); // "Dit mag niet voor 12:00 zijn"

const validateMeeting = dateIsBiggerThan(new Date('2024-01-01 12:00'));
validateTime('2024-06-01T13:00'); // null
validateTime('2023-12-31T11:00'); // "Dit mag niet voor 1-1-2024, 12:00 zijn"
```

### File Validation

```javascript
import { isValidFile } from '@sio/form-validation';

// Single file
const validateFile = isValidFile(1024, 'image/jpeg,image/png'); // max 1MB
const file = new File([''], 'photo.jpg', { type: 'image/jpeg' });
validateFile(file); // null

// Too large
const largeFile = new File(['x'.repeat(2 * 1024 * 1024)], 'large.jpg');
validateFile(largeFile); // "large.jpg is te groot (max 1024 KB)."
```

## Integration with @sio/form-builder
```javascript
import { formBuilder } from '@sio/form-builder';
import { isRequired, isEmail, isPattern } from '@sio/form-validation';

const form = formBuilder()
  .addText('username', { 
    label: 'Username', 
    required: true,
    validations: [
      isRequired(),
      isPattern(/^[a-z0-9_]{3,20}$/, 'Alleen kleine letters, cijfers en underscores, 3-20 karakters')
    ] 
  })
  .addEmail('email', { 
    label: 'Email', 
    required: true,
    validations: [
      isRequired(),
      isEmail('Ongeldig email formaat')
    ] 
  })
  .getFields();
```

## Type Safety

The library is fully typed and enforces:
- Correct value types per validation function
- Proper configuration options per field type
- Type-safe error messages with placeholder support

```typescript
import { isBiggerThan, ValidationRule } from '@sio/form-validation';

// ✅ Correct: number expected
const validateAge = isBiggerThan(18);
validateAge(25); // null
validateAge('25'); // null (string is cast to number)

// ❌ Type error: boolean not allowed
const validateAge = isBiggerThan(true);

// Type-safe validation arrays
const validations: ValidationRule[] = [
  isRequired(), 
  isEmail(), 
  isPattern(/^[A-Z]+$/)
];
```

## Error Message Placeholders

Most validators accept an optional custom error message with `{label}` as a placeholder:

```javascript
const validate = isRequired('{label} is verplicht');
validate('', 'Gebruikersnaam'); // "Gebruikersnaam is verplicht"

const validateMin = isBiggerThan(18, '{label} moet minimaal {min} zijn');
validateMin(16, 'Leeftijd'); // "Leeftijd moet minimaal 18 zijn"
```

### Validators without custom message support

The following validators currently use predefined error messages:

```javascript
import { isUrl, isValidFile } from '@sio/validation';

// isUrl uses predefined messages based on configuration
const validateUrl = isUrl(false, false, true);
validateUrl('http://example.com'); // "Dit moet https gebruiken."
validateUrl('localhost'); // "Dit mag geen localhost zijn."

// isValidFile uses predefined messages
const validateFile = isValidFile(1024, 'image/*');
validateFile(largeFile); // "large.jpg is te groot (max 1024 KB)."
validateFile(wrongFile); // "document.pdf is niet toegelaten."
```

## Architecture

Each validation function follows the same pattern:

```typescript
// Higher-order function
export const isEmail = (errorMessage?: string) => 
  // Validation function
  (val: unknown, label: string = 'Dit'): string | null => {
    // Validation logic
    return isValid ? null : (errorMessage || `${label} is geen geldig e-mailadres.`);
};
```

This makes the library:
- UI framework agnostic
- Easily composable
- Tree-shakeable
- Fully testable

## Ecosystem

`@sio/form-validation` is part of the SIO Form Builder suite:

- **[@sio/form-types](https://www.npmjs.com/package/@sio/form-types)** - Shared type definitions
- **[@sio/form-builder](https://www.npmjs.com/package/@sio/form-builder)** - Define your form structure
- **[@sio/form-validation](https://www.npmjs.com/packages/@sio/form-validation)** - This package: validate your data (you are here)
- **[@sio/form-react](https://www.npmjs.com/package/@sio/form-react)** - React renderer and hooks for the builder
- *More adapters planned: Vue, Svelte, etc.*

This modular approach lets you use the same validation rules across different frameworks and form builders.

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE](../../LICENSE) file for details.