/**
 * Creates a validation function that checks if a numeric value is smaller than or equal to a maximal threshold.
 *
 * @remarks
 * This is a higher-order function that returns a validator. Empty values (null, undefined, empty string)
 * are considered valid to allow optional fields. The function attempts to convert the input to a number.
 *
 * @param max - The maximum value required (inclusive). The validated value must be <= this number.
 * @param errorMessage - Optional custom error message. Can use {label} and {max} as placeholders.
 * @returns A validator function that takes a value and optional label, returns error message or null
 *
 * @example
 * // Basic usage
 * const validateAge = isSmallerThan(100);
 * validateAge(99); // null
 * validateAge(101); // "Dit mag niet groter zijn dan 100."
 *
 * @example
 * // With custom error message
 * const validateAge = isSmallerThan(1000, '{label} moet maximaal {min} jaar zijn');
 * validateAge(101, 'Leeftijd'); // "Leeftijd moet maximaal 100 jaar zijn"
 *
 * @example
 * // Works with string numbers
 * const validateAmount = isSmallerThan(100);
 * validateAmount('50'); // null
 * validateAmount('110'); // "Dit mag niet kleiner zijn dan 100."
 *
 * @example
 * // For decimal values
 * const validatePrice = isSmallerThan(100.05, 'Prijs moet maximaal {min} zijn');
 * validatePrice(100.01); // null
 * validatePrice(100.051); // "Prijs moet maximaal 100.05 zijn"
 */
export const isSmallerThan = (max: number, errorMessage?: string) => (val: unknown, label: string = 'Dit'): string | null => {
  if (val === null || val === undefined || val === '') {
    return null;
  }

  const num: number = Number(val);
  if (Number.isNaN(num)) {
    return `${label} moet een geldig getal zijn.`
  }

  return num <= max
    ? null
    : errorMessage?.replace('{label}', label)?.replace('{max}', max.toString()) || `${label} mag niet groter zijn dan ${max}.`;
}