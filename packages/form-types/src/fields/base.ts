import { InputType } from "../core/input-type";
import { ValueType } from "../core/value-type";
import type { Properties as CSSProperties } from 'csstype';
import { LayoutType } from "../core/layout-type";
import { ValidationRule } from "../core/valudation-rule";
import { IconType } from "../core/icon-type";

/**
 * Base configuration for input fields.
 */
export interface Base<T extends InputType> {
  defaultValue?: ValueType<T>;
  label?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autocomplete?: string;
  validations?: ValidationRule<T>[]
  icon?: IconType;

  layout?: LayoutType,

  styling?: {
    className?: string;
    style?: CSSProperties;
  }
}
