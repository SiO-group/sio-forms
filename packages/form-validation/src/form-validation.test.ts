import { describe, expect, test } from "vitest";
import {
  dateIsBiggerThan,
  dateIsSmallerThan,
  isBiggerThan,
  isEmail, isPattern,
  isRequired,
  isSmallerThan,
  isUrl, isValidFile
} from "./validations";


describe('formValidation', () => {
  describe("isRequired ", () => {
    test('gives error on undefined', () => {
      expect(isRequired()(undefined)).toBe('Dit is een verplicht veld.')
    });

    test('gives error on null', () => {
      expect(isRequired()(null)).toBe('Dit is een verplicht veld.');
    });

    test('gives error on empty string', () => {
      expect(isRequired()('')).toBe('Dit is een verplicht veld.');
    });

    test('gives error on empty array', () => {
      expect(isRequired()([])).toBe('Dit is een verplicht veld.');
    });

    test('gives error on boolean false', () => {
      expect(isRequired()(false)).toBe('Dit is een verplicht veld.');
    });

    test('gives null on string with value', () => {
      expect(isRequired()('test')).toBeNull();
    });

    test('gives null on number 0', () => {
      expect(isRequired()(0)).toBeNull();
    });

    test('gives null on array with items', () => {
      expect(isRequired()([1, 2, 3])).toBeNull();
    });

    test('gives null on boolean true', () => {
      expect(isRequired()(true)).toBeNull();
    });

    test('uses custom label in error message', () => {
      expect(isRequired()(undefined, 'Naam')).toBe('Naam is een verplicht veld.');
    });
  });

  describe('isEmail', () => {
    test('validates correct emails', () => {
      expect(isEmail()('test@example.com')).toBeNull();
      expect(isEmail()('user.name+tag@example.co.uk')).toBeNull();
      expect(isEmail()('123@test.com')).toBeNull();
    });

    test('gives null for empty values', () => {
      expect(isEmail()('')).toBeNull();
      expect(isEmail()(null)).toBeNull();
      expect(isEmail()(undefined)).toBeNull();
    });

    test('gives error for non-string values', () => {
      expect(isEmail()(0)).toBe('Dit is geen geldig e-mailadres.');
    });

    test('rejects emails without @', () => {
      expect(isEmail()('testexample.com')).toBe('Dit is geen geldig e-mailadres.');
    });

    test('rejects emails without domain', () => {
      expect(isEmail()('test@')).toBe('Dit is geen geldig e-mailadres.');
      expect(isEmail()('test@.com')).toBe('Dit is geen geldig e-mailadres.');
    });

    test('rejects emails with spaces', () => {
      expect(isEmail()('test @example.com')).toBe('Dit is geen geldig e-mailadres.');
    });

    test('uses custom label in error message', () => {
      expect(isEmail()('testexample.com', 'E-mail')).toBe('E-mail is geen geldig e-mailadres.');
    });
  });

  describe('isUrl', () => {
    const urlValidator = isUrl(false, false, true);

    test('gives null for empty values', () => {
      expect(urlValidator('')).toBeNull();
      expect(urlValidator(null)).toBeNull();
      expect(urlValidator(undefined)).toBeNull();
    });

    test('gives error for non-string values', () => {
      expect(urlValidator(0)).toBe('Dit is geen geldige URL.');
    });

    test('validates HTTPS URLs', () => {
      expect(urlValidator('https://example.com')).toBeNull();
      expect(urlValidator('https://sub.domain.com/path?query=1')).toBeNull();
    });

    test('gives error on URLs without protocol', () => {
      expect(urlValidator('example.com')).toBe('Dit is geen geldige URL.');
    });

    test('rejects HTTP URLs while secureOnly is true', () => {
      expect(urlValidator('http://example.com')).toBe('Dit moet https gebruiken.');
    });

    test('rejects localhost if not allowed', () => {
      expect(urlValidator('https://localhost')).toBe('Dit mag geen localhost zijn.');
      expect(urlValidator('https://127.0.0.1')).toBe('Dit mag geen localhost zijn.');
    });

    test('processes FTP URLs correctly', () => {
      const ftpValidator = isUrl(false, true, false);
      expect(ftpValidator('ftp://example.com')).toBeNull();
    });

    test('processes localhost URLs correctly', () => {
      const localhostValidator = isUrl(true, false, false);
      expect(localhostValidator('http://localhost')).toBeNull();
      expect(localhostValidator('http://127.0.0.1')).toBeNull();
    });

    test('uses custom label in error message', () => {
      expect(urlValidator('example.com', 'Website')).toBe('Website is geen geldige URL.');
    });
  });

  describe('isBiggerThan', () => {
    const min5 = isBiggerThan(5);

    test('validates numbers bigger than minimum', () => {
      expect(min5(10)).toBeNull();
      expect(min5(5.1)).toBeNull();
      expect(min5(100)).toBeNull();
    });

    test('validates numbers equal to minimum', () => {
      expect(min5(5)).toBeNull();
    });

    test('gives null for empty values', () => {
      expect(min5('')).toBeNull();
      expect(min5(null)).toBeNull();
      expect(min5(undefined)).toBeNull();
    });

    test('gives error on non number values', () => {
      expect(min5('test')).toBe('Dit moet een geldig getal zijn.');
    })

    test('rejects numbers smaller than minimum', () => {
      expect(min5(3)).toBe('Dit mag niet kleiner zijn dan 5.');
      expect(min5(4.9)).toBe('Dit mag niet kleiner zijn dan 5.');
    });

    test('uses custom label in error message', () => {
      expect(min5(3, 'Leeftijd')).toBe('Leeftijd mag niet kleiner zijn dan 5.');
    });
  });

  describe('isSmallerThan', () => {
    const max100 = isSmallerThan(100);

    test('validates numbers smaller than maximum', () => {
      expect(max100(99.9)).toBeNull();
      expect(max100(5)).toBeNull();
      expect(max100(90)).toBeNull();
    });

    test('validates numbers equal to maximum', () => {
      expect(max100(100)).toBeNull();
    });

    test('gives null for empty values', () => {
      expect(max100('')).toBeNull();
      expect(max100(null)).toBeNull();
      expect(max100(undefined)).toBeNull();
    });

    test('gives error on non number values', () => {
      expect(max100('test')).toBe('Dit moet een geldig getal zijn.');
    });

    test('rejects numbers bigger than maximum', () => {
      expect(max100(105)).toBe('Dit mag niet groter zijn dan 100.');
      expect(max100(100.1)).toBe('Dit mag niet groter zijn dan 100.');
    });

    test('uses custom label in error message', () => {
      expect(max100(101, 'Leeftijd')).toBe('Leeftijd mag niet groter zijn dan 100.');
    });
  });

  describe('dateIsBiggerThan', () => {
    const minDate = new Date('2024-01-01');
    const afterJan1 = dateIsBiggerThan(minDate);

    test('validates dates na minimum', () => {
      expect(afterJan1('2024-02-01')).toBeNull();
      expect(afterJan1(new Date('2024-06-15'))).toBeNull();
    });

    test('validates dates equal to minimum', () => {
      expect(afterJan1('2024-01-01')).toBeNull();
      expect(afterJan1(new Date('2024-01-01'))).toBeNull();
    });

    test('gives null for empty values', () => {
      expect(afterJan1('')).toBeNull();
      expect(afterJan1(null)).toBeNull();
      expect(afterJan1(undefined)).toBeNull();
    });

    test('gives error on non date values', () => {
      expect(afterJan1('test')).toBe('Dit moet een geldige datum zijn.');
    });

    test('rejects dates before minimum', () => {
      expect(afterJan1(new Date('2023-12-31'))).toBe('Dit mag niet voor 1-1-2024 zijn.');
      expect(afterJan1('2023-12-31')).toBe('Dit mag niet voor 1-1-2024 zijn.');
    });

    test('verwerkt tijd notaties', () => {
      const afterNoon = dateIsBiggerThan(new Date('2024-01-01T12:00:00.000Z'));
      expect(afterNoon('2024-01-01T13:00:00')).toBeNull();
      expect(afterNoon('2024-01-01T11:00:00')).toBe('Dit mag niet voor 01-01-2024, 12:00 zijn.');
    });

    test('uses custom label in error message', () => {
      expect(afterJan1('2023-12-31', 'Datum')).toBe('Datum mag niet voor 1-1-2024 zijn.');
    });
  });

  describe('dateIsSmallerThan', () => {
    const maxDate = new Date('2024-12-31');
    const beforeDec31 = dateIsSmallerThan(maxDate);

    test('validates dates before maximum', () => {
      expect(beforeDec31('2024-12-30')).toBeNull();
      expect(beforeDec31(new Date('2024-06-15'))).toBeNull();
    });

    test('validates dates equal to maximum', () => {
      expect(beforeDec31('2024-12-31')).toBeNull();
      expect(beforeDec31(new Date('2024-12-31'))).toBeNull();
    });

    test('gives null for empty values', () => {
      expect(beforeDec31('')).toBeNull();
      expect(beforeDec31(null)).toBeNull();
      expect(beforeDec31(undefined)).toBeNull();
    });

    test('gives error on non date values', () => {
      expect(beforeDec31('test')).toBe('Dit moet een geldige datum zijn.');
    });

    test('rejects dates after maximum', () => {
      expect(beforeDec31(new Date('2025-01-01'))).toBe('Dit mag niet na 31-12-2024 zijn.');
      expect(beforeDec31('2025-01-01')).toBe('Dit mag niet na 31-12-2024 zijn.');
    });

    test('handles time notation', () => {
      const beforeNoon = dateIsSmallerThan(new Date('2024-01-01T12:00:00.000Z'));
      expect(beforeNoon('2024-01-01T11:00:00')).toBeNull();
      expect(beforeNoon('2024-01-01T13:00:00')).toBe('Dit mag niet na 01-01-2024, 12:00 zijn.');
    });

    test('uses custom label in error message', () => {
      expect(beforeDec31('2025-01-01', 'Datum')).toBe('Datum mag niet na 31-12-2024 zijn.');
    });
  });

  describe('isValidFile', () => {
    const mockFile = (name: string, type: string, size: number): File => {
      return {
        name,
        type,
        size,
      } as File;
    };

    const fileValidator = isValidFile(1024, 'image/jpeg,image/png,.pdf');

    test('validates filetype and size correctly', () => {
      const validJpg = mockFile('test.jpg', 'image/jpeg', 500 * 1024);
      expect(fileValidator(validJpg)).toBeNull();
      const validPng = mockFile('test.png', 'image/png', 500 * 1024);
      expect(fileValidator(validPng)).toBeNull();
      const validPdf = mockFile('test.pdf', 'application/pdf', 500 * 1024);
      expect(fileValidator(validPdf)).toBeNull();
    });

    test('gives null for empty values', () => {
      expect(fileValidator(undefined)).toBeNull();
    });

    test('rejects wrong filetypes', () => {
      const invalidType = mockFile('test.gif', 'image/gif', 500 * 1024);
      expect(fileValidator(invalidType)).toBe('test.gif is niet toegelaten.');
    });

    test('works with extensions', () => {
      const validateExt = isValidFile(1024, '.pdf,.docx');
      const pdfFile = mockFile('test.pdf', 'application/pdf', 500 * 1024);
      const docxFile = mockFile('test.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 500 * 1024);
      const jpgFile = mockFile('test.jpg', 'image/jpeg', 500 * 1024);

      expect(validateExt(pdfFile)).toBeNull();
      expect(validateExt(docxFile)).toBeNull();
      expect(validateExt(jpgFile)).toBe('test.jpg is niet toegelaten.');
    });

    test('works with wildcard patterns', () => {
      const validateWildcard = isValidFile(1024, 'image/*');
      const jpgFile = mockFile('test.jpg', 'image/jpeg', 500 * 1024);
      const pngFile = mockFile('test.png', 'image/png', 500 * 1024);
      const pdfFile = mockFile('test.pdf', 'application/pdf', 500 * 1024);

      expect(validateWildcard(jpgFile)).toBeNull();
      expect(validateWildcard(pngFile)).toBeNull();
      expect(validateWildcard(pdfFile)).toBe('test.pdf is niet toegelaten.');
    });

    test('rejects to large files', () => {
      const tooLarge = mockFile('test.jpg', 'image/jpeg', 2 * 1024 * 1024);
      expect(fileValidator(tooLarge)).toBe('test.jpg is te groot (max 1024 KB).');
    });

    test('works without filesize or mime', () => {
      const noValidator = isValidFile();
      const file = mockFile('test.gif', 'image/gif', 2 * 1024 * 1024);
      expect(noValidator(file)).toBeNull();
    });
  });

  describe('isPattern', () => {
    test('validates regex pattern', () => {
      const onlyLetters = isPattern(/^[A-Za-z]+$/);

      expect(onlyLetters('abc')).toBeNull();
      expect(onlyLetters('ABC')).toBeNull();
      expect(onlyLetters('abc123')).toBe('Dit heeft een ongeldig patroon.');
    });

    test('validates string pattern', () => {
      const postalCode = isPattern('^[1-9][0-9]{3}[A-Z]{2}$');

      expect(postalCode('1234AB')).toBeNull();
      expect(postalCode('1234')).toBe('Dit heeft een ongeldig patroon.');
    });

    test('validates patterns met flags', () => {
      const caseInsensitive = isPattern('/^[a-z]+$/i');

      expect(caseInsensitive('abc')).toBeNull();
      expect(caseInsensitive('ABC')).toBeNull();
      expect(caseInsensitive('123')).toBe('Dit heeft een ongeldig patroon.');
    });

    test('gives null for empty values', () => {
      const onlyLetters = isPattern(/^[A-Za-z]+$/);
      expect(onlyLetters('')).toBeNull();
      expect(onlyLetters(null)).toBeNull();
      expect(onlyLetters(undefined)).toBeNull();
    });

    test('uses custom label in error message', () => {
      const onlyLetters = isPattern(/^[A-Za-z]+$/);
      expect(onlyLetters('123', 'Label')).toBe('Label heeft een ongeldig patroon.');
    });

    test('uses custom error message', () => {
      const onlyLetters = isPattern(/^[A-Za-z]+$/, 'Ongeldig');
      expect(onlyLetters('123')).toBe('Ongeldig');
    });
  });

  describe('Edge cases', () => {
    test('behandelt undefined/null correct voor alle validaties', () => {
      expect(isRequired()(undefined)).toBeTruthy();
      expect(isEmail()(undefined)).toBeNull();
      expect(isUrl()(undefined)).toBeNull();
      expect(isBiggerThan(5)(undefined)).toBeNull();
      expect(isPattern(/test/)('')).toBeNull();
    });
  });
});