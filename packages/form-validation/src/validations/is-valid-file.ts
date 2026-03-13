/**
 * Creates a validation function that checks if a file or multiple files meet size and type restrictions.
 *
 * @remarks
 * This is a higher-order function that returns a validator. The validator can handle:
 * - Single file (returns string | null)
 * - Empty values (returns null)
 *
 * Type validation supports:
 * - Exact MIME types: "image/jpeg"
 * - Wildcard MIME types: "image/*" (matches all image types)
 * - File extensions: ".pdf", ".jpg"
 * - Comma-separated combinations: "image/jpeg,.pdf,application/json"
 *
 * Size validation is in kilobytes (KB). 1 MB = 1024 KB.
 *
 * @param maxSize - Maximum file size allowed in kilobytes (KB). Example: 1024 = 1MB
 * @param accept - Comma-separated string of allowed MIME types or file extensions.
 *                Examples: "image/jpeg,image/png", ".pdf,.docx", "image/*"
 * @returns A validator function that takes a file or file array and returns:
 *          - `null` if validation passes or input is empty
 *          - `string` if a single file fails validation
 *
 * @example
 * // Single file validation
 * const validateFile = isValidFile(1024, 'image/jpeg,image/png');
 * const file = new File([''], 'photo.jpg', { type: 'image/jpeg' });
 * validateFile(file); // null (valid)
 *
 * @example
 * // File too large
 * const validateFile = isValidFile(500, 'image/jpeg'); // max 500KB
 * const largeFile = new File(['x'.repeat(600 * 1024)], 'large.jpg', { type: 'image/jpeg' });
 * validateFile(largeFile); // "large.jpg is te groot (max 500 KB)."
 *
 * @example
 * // Wrong file type
 * const validateFile = isValidFile(1024, 'image/jpeg');
 * const pdfFile = new File([''], 'document.pdf', { type: 'application/pdf' });
 * validateFile(pdfFile); // "document.pdf is niet toegelaten."
 *
 * @example
 * // Wildcard MIME types
 * const validateImage = isValidFile(2048, 'image/*'); // alle afbeeldingen
 * validateImage(new File([''], 'photo.png', { type: 'image/png' })); // null
 * validateImage(new File([''], 'photo.gif', { type: 'image/gif' })); // null
 *
 * @example
 * // Empty or no files
 * const validateFile = isValidFile(1024, 'image/*');
 * validateFile(null); // null
 * validateFile(undefined); // null
 */
 export const isValidFile = (maxSize?: number, accept?: string) => (file: File | undefined): string | null => {
  if (!file) {
    return null;
  }

  if (maxSize && file.size / 1024 > maxSize) {
    return `${file.name} is te groot (max ${maxSize} KB).`;
  }

  if (accept) {
    const allowed: string[] = accept.split(',').map((s: string) => s.trim().toLowerCase());

    const ext: string = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const mime: string = file.type.toLowerCase();

    const valid: boolean = allowed.some((pattern: string) => {
      if (pattern === mime) return true;
      if (pattern.endsWith('/*')) {
        return mime.startsWith(pattern.replace('/*', '/'));
      }
      return pattern === ext
    });

    if (!valid) {
      return `${file.name} is niet toegelaten.`;
    }
  }

  return null;
}
