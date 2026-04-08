import {
  CheckboxFieldConfig, CheckboxGroupFieldConfig, ColorFieldConfig, DateFieldConfig,
  EmailFieldConfig, SwitchFieldConfig,
  FileFieldConfig, HiddenFieldConfig, NumberFieldConfig, PasswordFieldConfig, RadioFieldConfig, RangeFieldConfig,
  SearchFieldConfig, SelectFieldConfig, TelephoneFieldConfig,
  TextareaFieldConfig,
  TextFieldConfig, UrlFieldConfig
} from "./field-config";
import { Base } from "./base";

export type FieldConfigMap = {
  text: TextFieldConfig;
  search: SearchFieldConfig;
  textarea: TextareaFieldConfig;
  email: EmailFieldConfig;
  checkbox: CheckboxFieldConfig;
  'checkbox-group': CheckboxGroupFieldConfig;
  switch: SwitchFieldConfig;
  radio: RadioFieldConfig;
  select: SelectFieldConfig;
  selectable: SelectFieldConfig;
  creatable: SelectFieldConfig;
  tel: TelephoneFieldConfig;
  password: PasswordFieldConfig;
  hidden: HiddenFieldConfig;
  color: ColorFieldConfig;
  number: NumberFieldConfig;
  range: RangeFieldConfig;
  date: Extract<DateFieldConfig, Base<'date'>>;
  time: Extract<DateFieldConfig, Base<'time'>>;
  'datetime-local': Extract<DateFieldConfig, Base<'datetime-local'>>;
  file: FileFieldConfig;
  url: UrlFieldConfig;
};