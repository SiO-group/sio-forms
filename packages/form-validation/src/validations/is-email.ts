/**
 * Creates a validation function that checks if a value is a valid email address.
 *
 * @remarks
 * This is a higher-order function that returns a validator. Empty values (null, undefined, empty string)
 * are considered valid to allow optional fields. Use with `isRequired` for required email fields.
 *
 * @param errorMessage - Optional custom error message. Defaults to "{label} is geen geldig e-mailadres."
 * @returns A validator function that takes a value and optional label, returns error message or null
 *
 * @example
 * // Basic usage
 * const validateEmail = isEmail();
 * validateEmail('test@example.com'); // null
 * validateEmail('invalid-email'); // "Dit is geen geldig e-mailadres."
 *
 * @example
 * // With custom error message
 * const validateEmail = isEmail('Voer een correct e-mailadres in');
 * validateEmail('invalid', 'E-mail'); // "Voer een correct e-mailadres in"
 */
export const isEmail = (errorMessage?: string) => (val: unknown, label: string = 'Dit'): string | null => {
  if (val === null || val === undefined) {
    return null;
  }

  if (typeof val !== "string") {
    return errorMessage || `${label} is geen geldig e-mailadres.`;
  }

  const trimmed: string = val.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return emailRegex.test(trimmed)
    ? null
    : errorMessage || `${label} is geen geldig e-mailadres.`;
}