import { parseDateValue } from "../parse-date";

/**
 * Creates a validation function that checks if a date is smaller than or equal to a maximum date.
 *
 * @remarks
 * This is a higher-order function that returns a validator. Empty values (null, undefined, empty string)
 * are considered valid to allow optional fields. The function accepts both Date objects and date strings.
 *
 * @param max - The maximum date required (inclusive). Must be a valid Date object.
 * @param errorMessage - Optional custom error message. Can use {label} and {min} as placeholders.
 * @returns A validator function that takes a value and optional label, returns error message or null
 *
 * @example
 * // Basic usage
 * const validateDate = dateIsSmallerThan(new Date('2024-01-01'));
 * validateDate('2023-12-31'); // null
 * validateDate('2024-02-01'); // "Dit mag niet na 1-1-2024 zijn."
 *
 * @example
 * // With custom error message
 * const validateDate = dateIsSmallerThan(
 *   new Date('2024-01-01'),
 *   '{label} moet voor {min} liggen'
 * );
 * validateDate('2024-02-01', 'Startdatum'); // "Startdatum moet voor 1-1-2024 liggen"
 *
 * @example
 * // With Date object as value
 * const validateDate = dateIsSmallerThan(new Date('2024-01-01'));
 * validateDate(new Date('2023-06-15')); // null
 */
export const dateIsSmallerThan = (max: Date, errorMessage?: string) => (val: unknown, label: string = 'Dit'): string | null => {
  if (val === null || val === undefined || val === '') {
    return null;
  }

  const parsed: { type: 'date' | 'time' | 'datetime' | 'invalid', value: Date | null} = parseDateValue(val);

  if (!parsed.value) {
    return `${label} moet een geldige ${parsed.type === 'time' ? 'tijd' : 'datum'} zijn.`;
  }

  let formattedMax: string;

  switch (parsed.type) {
    case 'time':
      formattedMax = max.toLocaleTimeString("nl-NL", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
      });
      break;

    case 'date':
      formattedMax = max.toLocaleDateString("nl-NL", {timeZone: 'UTC'});
      break;

    case 'datetime':
      formattedMax = max.toLocaleString("nl-NL", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
      });
      break;

    default:
      formattedMax = max.toLocaleDateString("nl-NL", {timeZone: 'UTC'});
  }

  if (parsed.type === 'time') {
    const timeValue = parsed.value.getHours() * 60 + parsed.value.getMinutes();
    const macTime = max.getHours() * 60 + max.getMinutes();

    return macTime >= timeValue
      ? null
      : errorMessage
        ?.replace('{label}', label)
        ?.replace('{min}', formattedMax) ||
      `${label} mag niet na ${formattedMax} zijn.`;
  }

  return parsed.value.getTime() <= max.getTime()
    ? null
    : errorMessage
      ?.replace('{label}', label)
      ?.replace('{min}', formattedMax) ||
    `${label} mag niet na ${formattedMax} zijn.`;
}