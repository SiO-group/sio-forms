/**
 * Creates a validation function that checks if a string value matches a specified pattern (regular expression).
 *
 * @remarks
 * This is a higher-order function that returns a validator. Empty values (null, undefined, empty string)
 * are considered valid to allow optional fields. The function supports multiple ways to specify the pattern:
 *
 * **Pattern formats:**
 * - **RegExp object**: `isPattern(/^[A-Z]+$/)`
 * - **String pattern**: `isPattern('^[0-9]{4}$')`
 * - **String with flags**: `isPattern('/^[a-z]+$/i')` (flags after last /)
 *
 * The `g` (global) flag is automatically removed as it can cause unexpected behavior with the `test()` method.
 *
 * @param pattern - Regular expression pattern to validate against
 *                 - Can be a RegExp object: `/^[A-Z]+$/`
 *                 - Can be a string pattern: `'^[0-9]{4}$'`
 *                 - Can be a string with flags: `'/^[a-z]+$/i'`
 * @param errorMsg - Optional custom error message. If not provided, a default message is used.
 *                  The message can use `{label}` as a placeholder for the field name.
 * @returns A validator function that takes a value and optional label, returns error message or null
 *
 * @example
 * // Basic usage with RegExp object
 * const validateLetters = isPattern(/^[A-Z]+$/);
 * validateLetters('ABC'); // null
 * validateLetters('abc'); // "Dit heeft een ongeldig patroon."
 * validateLetters('ABC123'); // "Dit heeft een ongeldig patroon."
 *
 * @example
 * // With string pattern (zipcode)
 * const validateZipcode = isPattern('^[1-9][0-9]{3}[A-Z]{2}$');
 * validateZipcode('1234AB'); // null
 * validateZipcode('1234'); // "Dit heeft een ongeldig patroon."
 * validateZipcode('ABCD12'); // "Dit heeft een ongeldig patroon."
 *
 * @example
 * // With case-insensitive flag
 * const validateCaseInsensitive = isPattern('/^[a-z]+$/i');
 * validateCaseInsensitive('abc'); // null
 * validateCaseInsensitive('ABC'); // null (case-insensitive)
 * validateCaseInsensitive('abc123'); // "Dit heeft een ongeldig patroon."
 *
 * @example
 * // With custom error message
 * const validateUsername = isPattern(
 *   /^[a-zA-Z0-9_]{3,20}$/,
 *   '{label} moet 3-20 karakters zijn (alleen letters, cijfers en _)'
 * );
 * validateUsername('user_123', 'Gebruikersnaam'); // null
 * validateUsername('us', 'Gebruikersnaam'); // "Gebruikersnaam moet 3-20 karakters zijn (alleen letters, cijfers en _)"
 *
 * @example
 * // Email validation (simplified)
 * const validateEmail = isPattern(
 *   '/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/',
 *   '{label} is geen geldig e-mailadres'
 * );
 * validateEmail('test@example.com', 'Email'); // null
 * validateEmail('invalid-email', 'Email'); // "Email is geen geldig e-mailadres"
 *
 * @example
 * // Phone number validation (Dutch)
 * const validatePhone = isPattern(
 *   '/^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{1,4}[-\\s.]?[0-9]{1,9}$/',
 *   '{label} is geen geldig telefoonnummer'
 * );
 * validatePhone('0612345678', 'Telefoon'); // null
 * validatePhone('+31 6 12345678', 'Telefoon'); // null
 * validatePhone('abc', 'Telefoon'); // "Telefoon is geen geldig telefoonnummer"
 *
 * @example
 * // Password strength validation
 * const validatePassword = isPattern(
 *   /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
 *   'Wachtwoord moet minimaal 8 karakters bevatten, met minstens 1 hoofdletter, 1 kleine letter, 1 cijfer en 1 speciaal teken'
 * );
 * validatePassword('Test123!'); // null
 * validatePassword('weak'); // error message
 *
 * @example
 * // Empty values are ignored (use with isRequired for required fields)
 * const validateOptional = isPattern(/^[A-Z]+$/);
 * validateOptional(null); // null
 * validateOptional(''); // null
 * validateOptional('   '); // null
 *
 * @example
 * // Non-string values are rejected
 * const validate = isPattern(/^test$/);
 * validate(123); // "Dit heeft een ongeldig patroon."
 * validate(true); // "Dit heeft een ongeldig patroon."
 * validate({}); // "Dit heeft een ongeldig patroon."
 */
export const isPattern = (pattern: RegExp | string, errorMsg?: string) => (val: unknown, label:  string = 'Dit'): string | null => {
  if (val === null || val === undefined || val === '') {
    return null;
  }

  if (typeof val !== "string") {
    return errorMsg || `${label} heeft een ongeldig patroon.`;
  }

  const trimmed: string = val.trim();
  if (trimmed === '') {
    return null;
  }

  let regex: RegExp;
  if (typeof pattern === 'string') {
    if (pattern.startsWith('/') && pattern.lastIndexOf('/') > 0) {
      const lastSlash = pattern.lastIndexOf('/');
      const patternBody = pattern.substring(1, lastSlash);
      const flags = pattern.substring(lastSlash + 1);

      const safeFlags = flags.replace('g', '');
      regex = new RegExp(patternBody, safeFlags);
    } else {
      regex = new RegExp(pattern);
    }
  } else {
    regex = new RegExp(pattern.source, pattern.flags.replace('g', ''));
  }

  return regex.test(trimmed)
    ? null
    : errorMsg || `${label} heeft een ongeldig patroon.`;
}