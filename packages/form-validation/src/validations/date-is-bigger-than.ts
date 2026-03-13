import { parseDateValue } from "../parse-date";

/**
 * Creates a validation function that checks if a date is greater than or equal to a minimum date.
 *
 * @remarks
 * This is a higher-order function that returns a validator. Empty values (null, undefined, empty string)
 * are considered valid to allow optional fields. The function accepts both Date objects and date strings.
 *
 * @param min - The minimum date required (inclusive). Must be a valid Date object.
 * @param errorMessage - Optional custom error message. Can use {label} and {min} as placeholders.
 * @returns A validator function that takes a value and optional label, returns error message or null
 *
 * @example
 * // Basic usage
 * const validateDate = dateIsBiggerThan(new Date('2024-01-01'));
 * validateDate('2024-02-01'); // null
 * validateDate('2023-12-31'); // "Dit mag niet voor 1-1-2024 zijn."
 *
 * @example
 * // With custom error message
 * const validateDate = dateIsBiggerThan(
 *   new Date('2024-01-01'),
 *   '{label} moet na {min} liggen'
 * );
 * validateDate('2023-12-31', 'Startdatum'); // "Startdatum moet na 1-1-2024 liggen"
 *
 * @example
 * // With Date object as value
 * const validateDate = dateIsBiggerThan(new Date('2024-01-01'));
 * validateDate(new Date('2024-06-15')); // null
 */
export const dateIsBiggerThan = (min: Date, errorMessage?: string) => (val: unknown, label: string = 'Dit'): string | null => {
  if (val === null || val === undefined || val === '') {
    return null;
  }

  const parsed: { type: 'date' | 'time' | 'datetime' | 'invalid', value: Date | null} = parseDateValue(val);

  if (!parsed.value) {
    return `${label} moet een geldige ${parsed.type === 'time' ? 'tijd' : 'datum'} zijn.`;
  }

  let formattedMin: string;

  switch (parsed.type) {
    case 'time':
      formattedMin = min.toLocaleTimeString("nl-NL", {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
      });
      break;

    case 'date':
      formattedMin = min.toLocaleDateString("nl-NL", {timeZone: 'UTC'});
      break;

    case 'datetime':
      formattedMin = min.toLocaleString("nl-NL", {
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
      formattedMin = min.toLocaleDateString("nl-NL", {timeZone: 'UTC'});
  }

  if (parsed.type === 'time') {
    const timeValue = parsed.value.getHours() * 60 + parsed.value.getMinutes();
    const minTime = min.getHours() * 60 + min.getMinutes();

    return timeValue >= minTime
      ? null
      : errorMessage
        ?.replace('{label}', label)
        ?.replace('{min}', formattedMin) ||
      `${label} mag niet voor ${formattedMin} zijn.`;
  }

  return min.getTime() <= parsed.value.getTime()
    ? null
    : errorMessage
      ?.replace('{label}', label)
      ?.replace('{min}', formattedMin) ||
    `${label} mag niet voor ${formattedMin} zijn.`;
}