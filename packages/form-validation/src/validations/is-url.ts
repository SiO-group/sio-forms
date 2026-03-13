/**
 * Creates a validation function that checks if a value is a valid URL with configurable restrictions.
 *
 * @remarks
 * This is a higher-order function that returns a validator. Empty values (null, undefined, empty string)
 * are considered valid to allow optional fields. The function uses the native URL constructor for parsing.
 *
 * Protocol handling:
 * - HTTPS is required when `secureOnly` is true (overrides other protocol settings)
 * - FTP is only allowed when `allowFtp` is true AND `secureOnly` is false
 * - HTTP is always allowed when `secureOnly` is false
 *
 * @param allowLocalhost - Whether to allow localhost URLs (localhost, 127.0.0.1). Default: `false`
 * @param allowFtp - Whether to allow FTP URLs. Default: `false`
 * @param secureOnly - Whether to require HTTPS for all URLs. When true, overrides allowFtp. Default: `true`
 * @returns A validator function that takes a value and optional label, returns error message or null
 *
 * @example
 * // Basic usage (secure only, no localhost, no ftp)
 * const validateUrl = isUrl();
 * validateUrl('https://example.com'); // null
 * validateUrl('http://example.com'); // "Dit moet https gebruiken."
 *
 * @example
 * // Allow HTTP and localhost for development
 * const validateDevUrl = isUrl(true, false, false);
 * validateDevUrl('http://localhost:3000'); // null
 * validateDevUrl('https://example.com'); // null
 *
 * @example
 * // Allow FTP URLs
 * const validateFtpUrl = isUrl(false, true, false);
 * validateFtpUrl('ftp://files.example.com'); // null
 * validateFtpUrl('https://example.com'); // null
 *
 * @example
 * // With custom label in error messages
 * const validateUrl = isUrl(false, false, true);
 * validateUrl('invalid', 'Website'); // "Website is geen geldige URL."
 *
 * @example
 * // Secure only overrides FTP
 * const validateSecure = isUrl(false, true, true); // allowFtp=true but secureOnly=true
 * validateSecure('ftp://example.com'); // "Dit moet https gebruiken." (FTP not allowed)
 */
export const isUrl = (allowLocalhost = false, allowFtp = false, secureOnly = true) => (val: unknown, label: string = 'Dit'): string | null => {
  if (val === null || val === undefined) {
    return null;
  }

  if (typeof val !== "string") {
    return `${label} is geen geldige URL.`;
  }

  const trimmed = val.trim();
  if (trimmed.length === 0) {
    return null;
  }

  try {
    const url = new URL(trimmed);

    if (secureOnly && url.protocol !== "https:") {
      return `${label} moet https gebruiken.`;
    }

    if (!allowFtp && url.protocol === 'ftp') {
      return `${label} mag geen ftp gebruiken.`;
    }

    if (!allowLocalhost && (url.hostname === 'localhost' || url.hostname === '127.0.0.1')) {
      return `${label} mag geen localhost zijn.`;
    }

    return null;
  } catch {
    return `${label} is geen geldige URL.`
  }
}