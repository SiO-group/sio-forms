import { AcceptType, CaptureType, IconType, Option, SelectOption, SpinnerVariant } from "@sio/form-types";
import { Properties } from 'csstype';

export type BaseFieldProps = {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  value: unknown;
  errors: string[];
  required?: boolean;
  autocomplete?: string;
  touched: boolean;
  focused: boolean;
  readOnly?: boolean;
  disabled: boolean;
  icon?: IconType;
  description?: string;
  onChange: (value: unknown) => void;
  setFocused: (focused: boolean) => void;
  setTouched: (touched: boolean) => void;
  className?: string;
  style?: Properties;
};

export type TextareaFieldProps = BaseFieldProps & {
  type: "textarea";
  rows?: number;
  cols?: number;
};

export type FileFieldProps = BaseFieldProps & {
  type: "file";
  accept?: AcceptType;
  multiple: boolean;
  capture: CaptureType;
  onError: (errors: string[]) => void;
  filesize: number;
  onFileRemove?: (file: File, index: number, files: File[]) => void;
  onRemoveAll?: (files: File[]) => void;
};

export type NumberFieldProps = BaseFieldProps & {
  type: "number";
  min: number;
  max: number;
  step: number;
  spinner: boolean | SpinnerVariant;
};

export type RangeFieldProps = BaseFieldProps & {
  type: "range";
  min: number;
  max: number;
  step: number;
  showValue: boolean;
};

export type DateFieldProps = BaseFieldProps & {
  type: "date" | "time" | "datetime-local";
  min: string;
  max: string;
  step: number;
};

export type UrlFieldProps = BaseFieldProps & {
  type: "url";
  allowLocalhost: boolean;
  allowFtp: boolean;
  secureOnly: boolean;
};

export type SelectFieldProps = BaseFieldProps & {
  type: "select" | "creatable";
  options: SelectOption[];
  multiple: boolean;
};

export type RadioFieldProps = BaseFieldProps & {
  type: "radio";
  options: string[] | Option[];
  inline: boolean;
};

export type FieldProps =
  | FileFieldProps
  | TextareaFieldProps
  | NumberFieldProps
  | RangeFieldProps
  | DateFieldProps
  | UrlFieldProps
  | SelectFieldProps
  | RadioFieldProps
  | (BaseFieldProps & { type: Exclude<FieldType, "file" | "textarea" | "range" | "date" | "time" | "datetime-local" | "url" | "select" | "creatable" | "radio"> });