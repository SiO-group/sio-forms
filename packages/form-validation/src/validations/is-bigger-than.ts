/**
 * Creates a validation function that checks if a numeric value is greater than or equal to a minimum threshold.
 *
 * @remarks
 * This is a higher-order function that returns a validator. Empty values (null, undefined, empty string)
 * are considered valid to allow optional fields. The function attempts to convert the input to a number.
 *
 * @param min - The minimum value required (inclusive). The validated value must be >= this number.
 * @param errorMessage - Optional custom error message. Can use {label} and {min} as placeholders.
 * @returns A validator function that takes a value and optional label, returns error message or null
 *
 * @example
 * // Basic usage
 * const validateAge = isBiggerThan(18);
 * validateAge(25); // null
 * validateAge(16); // "Dit mag niet kleiner zijn dan 18."
 *
 * @example
 * // With custom error message
 * const validateAge = isBiggerThan(18, '{label} moet minimaal {min} jaar zijn');
 * validateAge(16, 'Leeftijd'); // "Leeftijd moet minimaal 18 jaar zijn"
 *
 * @example
 * // Works with string numbers
 * const validateAmount = isBiggerThan(100);
 * validateAmount('150'); // null
 * validateAmount('50'); // "Dit mag niet kleiner zijn dan 100."
 *
 * @example
 * // For decimal values
 * const validatePrice = isBiggerThan(0.01, 'Prijs moet minimaal {min} zijn');
 * validatePrice(0.05); // null
 * validatePrice(0.005); // "Prijs moet minimaal 0.01 zijn"
 */
export const isBiggerThan = (min: number, errorMessage?: string) => (val: unknown, label: string = 'Dit'): string | null => {
  if (val === null || val === undefined || val === '') {
    return null;
  }

  const num: number = Number(val);
  if (Number.isNaN(num)) {
    return `${label} moet een geldig getal zijn.`
  }

  return min <= num
    ? null
    : errorMessage?.replace('{label}', label)?.replace('{min}', min.toString()) || `${label} mag niet kleiner zijn dan ${min}.`;
}