/**
 * Creates a validation function that checks if a value is present and not empty.
 *
 * @remarks
 * This is a higher-order function that returns a validator. The validation logic depends on the value type:
 * - **Strings**: Checks if not empty after trimming
 * - **Arrays**: Checks if array has at least one item
 * - **Booleans**: Value must be `true` (for checkboxes/consent fields)
 * - **Other types**: Checks if not `null` or `undefined`
 *
 * @param errorMessage - Optional custom error message. Use {label} as placeholder for the field name.
 * @returns A validator function that takes a value and optional label, returns error message or null
 *
 * @example
 * // Basic usage
 * const validate = isRequired();
 * validate('test'); // null
 * validate(''); // "Dit is een verplicht veld."
 *
 * @example
 * // With custom error message
 * const validate = isRequired('{label} moet ingevuld worden');
 * validate('', 'Naam'); // "Naam moet ingevuld worden"
 *
 * @example
 * // With arrays
 * const validateTags = isRequired();
 * validateTags(['tag1']); // null
 * validateTags([]); // "Dit is een verplicht veld."
 *
 * @example
 * // With booleans (checkboxes)
 * const validateConsent = isRequired('U moet akkoord gaan met de voorwaarden');
 * validateConsent(true); // null
 * validateConsent(false); // "U moet akkoord gaan met de voorwaarden"
 *
 * @example
 * // With number 0 (0 is considered a valid value)
 * const validateNumber = isRequired();
 * validateNumber(0); // null (0 is a valid number)
 * validateNumber(null); // "Dit is een verplicht veld."
 */
export const isRequired = (errorMessage?: string) => (val: unknown, label: string = 'Dit'): string | null =>  {
  const message: string = errorMessage?.replace('{label}', label) || `${label} is een verplicht veld.`;

  if (val === null || val === undefined) {
    return message;
  }

  if (typeof val === "string" && val.trim().length === 0) {
    return message;
  }

  if (typeof val === "boolean" && !val) {
    return message;
  }

  if (Array.isArray(val) && val.length === 0) {
    return message;
  }

  return null;
}