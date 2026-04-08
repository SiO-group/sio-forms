import { FieldConfigMap } from "../fields";

export type Option = { label: string; value: string; disabled?: boolean; hide?: boolean; }
export type OptionGroup = { label: string, options: SelectOption[] }
export type SelectOption = string | Option | OptionGroup;

export type ValueType<T extends keyof FieldConfigMap> =
  T extends 'checkbox' | 'switch'
    ? boolean
    : T extends 'number' | 'range'
      ? number
      : T extends 'select' | 'selectable' | 'creatable'
        ? Option | Option[]
        : T extends 'file'
          ? unknown
          : string;