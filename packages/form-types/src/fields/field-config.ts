import { Base } from "./base";
import { Option, SelectOption } from "../core/value-type";
import { AcceptType } from "../core/accept-type";
import { CaptureType } from "../core/capture-type";
import { SpinnerVariant } from "../core/spinner-variant";

/**
 * Configuration for text input fields.
 *
 * @see {@link Base} for common options
 */
export type TextFieldConfig = Base<'text'>  & { pattern?: RegExp };

/**
 * Configuration for search input fields.
 *
 * @see {@link Base} for common options
 *
 * @property onSearch - Triggered when the user types in the search field
 * @property optionLabel - Extracts the label from a result item
 * @property optionValue - Extracts the value from a result item
 * @property renderMode - Controls how results should be handled
 *  - 'inline': results are expected to be rendered by the UI layer near the field
 *  - 'none': no internal handling, fully external
 *  @property debounce - Debounce delay in milliseconds
 *  @property minLength - Minimum number of characters before triggering search
 *  @property onResults - Callback function that returns the results to the parent for rendering
 *  @property onSelect - Callback function that returns the selected item
  */
export type SearchFieldConfig<T = unknown> = Base<'search'> & {
  onSearch?: (value: string) => Promise<T[]> | T[];
  optionLabel?: (item: T) => string;
  optionValue?: (item: T) => string | number;
  renderMode?: 'inline' | 'none';
  debounce?: number;
  minLength?: number;
  onResults?: (results: T[], loading: boolean) => void;
  onSelect?: (item: T) => void;
  portalTarget?: string | HTMLElement;
};

/**
 * Configuration for email input fields.
 *
 * @see {@link Base} for common options
 */
export type EmailFieldConfig = Base<'email'>;

/**
 * Configuration for checkbox input fields.
 *
 * @see {@link Base} for common options
 */
export type CheckboxFieldConfig = Base<'checkbox'>;

/**
 * Configuration for switch input fields.
 *
 * @see {@link Base} for common options
 */
export type SwitchFieldConfig = Base<'switch'> & { onToggle?: (value: boolean) => void };

/**
 * Configuration for tel input fields.
 *
 * @see {@link Base} for common options
 */
export type TelephoneFieldConfig = Base<'tel'> & { pattern?: RegExp };

/**
 * Configuration for password input fields.
 *
 * @see {@link Base} for common options
 */
export type PasswordFieldConfig = Base<'password'>;

/**
 * Configuration for hidden input fields.
 *
 * @see {@link Base} for common options
 */
export type HiddenFieldConfig = Base<'hidden'>;

/**
 * Configuration for color input fields.
 *
 * @see {@link Base} for common options
 */
export type ColorFieldConfig = Base<'color'>;



/**
 * Configuration for textarea input fields.
 * Extends the base configuration with textarea-specific options.
 *
 * @see {@link Base} for common options
 */
export type TextareaFieldConfig = Base<'textarea'> & { rows?: number; cols?: number };

/**
 * Configuration for radio input fields.
 * Extends the base configuration with radio-specific options.
 *
 * **Note:** `options` is required.
 *
 * @see {@link Base} for common options
 */
export type RadioFieldConfig = Base<'radio'> & { options: string[] | Option[]; inline?: boolean };

/**
 * Configuration for select and creatable input fields.
 * Extends the base configuration with select-specific options.
 *
 * **Note:** `options` is required.
 *
 * @see {@link Base} for common options
 */
export type SelectFieldConfig =
  | Base<'select'> & { options: SelectOption[]; multiple?: boolean; }
  | Base<'creatable'> & { options: SelectOption[]; multiple?: boolean; };

/**
 * Configuration for number input fields.
 *
 * @see {@link Base} for common options
 *
 * @property min - Minimum allowed value
 * @property max - Maximum allowed value
 * @property step - Increment/decrement step size
 * @property spinner - Controls the spinner UI.
 *  - `true` enables the default spinner
 *  - `false` disables the spinner
 *  - `'vertical'` shows vertical increment/decrement buttons
 *  - `'horizontal'` shows horizontal increment/decrement buttons
 */
export type NumberFieldConfig = Base<'number'> & { min?: number; max?: number; step?: number; spinner?: boolean | SpinnerVariant; };

/**
 * Configuration for range input fields.
 *
 * @see {@link Base} for common options
 *
 * @property min - Minimum allowed value
 * @property max - Maximum allowed value
 * @property step - Increment/decrement step size
 * @property showValue - Enables a value label
 */
export type RangeFieldConfig = Base<'range'> & { min?: number; max?: number; step?: number; showValue?: boolean; };

/**
 * Configuration for date, time and datetime-local input fields.
 *
 * @see {@link Base} for common options
 *
 * @property min - Minimum allowed date
 * @property max - Maximum allowed date
 * @property step - Increment/decrement step size
 */
export type DateFieldConfig =
  | Base<'date'> & { min?: string; max?: string; step?: number }
  | Base<'time'> & { min?: string; max?: string; step?: number }
  | Base<'datetime-local'> & { min?: string; max?: string; step?: number };

/**
 * Configuration for file input fields.
 *
 * @see {@link Base} for common options
 *
 * @property accept - Allowed file types (MIME types or extensions).
 * @property filesize - Maximum allowed file size in bytes.
 * @property multiple - Whether multiple files can be selected.
 * @property capture - Hint for device camera/microphone usage (mainly on mobile).
 * @property onFileRemove - Callback triggered when a single file is removed.
 * Receives the removed file, its index, and the updated file list.
 * @property onRemoveAll - Callback triggered when all files are removed.
 * Receives the list of removed files.
 */
export type FileFieldConfig = Base<'file'> & {
  accept?: AcceptType;
  filesize?: number;
  multiple?: boolean;
  capture?: CaptureType;
  onFileRemove?: (file: File, index: number, files: File[]) => void;
  onRemoveAll?: (files: File[]) => void;
};

/**
 * Configuration for url input fields.
 * Extends the base configuration with url-specific options.
 *
 * @see {@link Base} for common options
 */
export type UrlFieldConfig = Base<'url'> & { allowLocalhost?: boolean; allowFtp?: boolean; secureOnly?: boolean; pattern?: RegExp };