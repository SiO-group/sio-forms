import React from "react";
import { Option } from "@sio-group/form-types";
import { CheckboxGroupFieldProps } from "../../../types/field-props";
import InputWrapper from "../InputWrapper";
import { Icon } from "../../Icon";

export const CheckboxGroup = ({
  value,
  onChange,

  options,
  inline,

  name,
  id,
  label,
  required,
  setTouched,
  readOnly,
  disabled,
  icon,

  description,
  focused,
  errors,
  touched,
  type,
  className,
  style,
}: CheckboxGroupFieldProps) => {
  const currentValue = (value as string[]) ?? [];

  const handleChange = (e: any) => {
    const val = e.target.value;

    const next = currentValue.includes(val)
      ? currentValue.filter(x => x !== val)
      : [...currentValue, val];

    onChange(next);
    setTouched?.(true);
  }

  return (
    <InputWrapper
      type={type}
      id={id}
      label={label}
      description={description}
      required={required}
      focused={focused}
      disabled={disabled || readOnly}
      hasError={errors.length > 0 && touched}
      errors={errors}
      className={`${className ?? ''}${inline ? ' form-field__checkbox-inline' : ''}`}
      style={style}
      hideLayout>
      <Icon icon={icon} />
      {options
        .filter((option: string | Option) => typeof option === 'string' || !option.hide)
        .map((option: string | Option) => {
          const opt: Option =
            typeof option === 'string'
              ? { value: option, label: option }
              : option;

          console.log(opt.value)
          return (
            <label
              htmlFor={`${id}-${opt.value}`}
              key={opt.value}
              className={
                currentValue.includes(String(opt.value))
                  ? 'form-field--has-value'
                  : ''
              }>
              <input
                name={`${name}-${opt.value}`}
                type="checkbox"
                id={`${id}-${opt.value}`}
                value={opt.value}
                checked={currentValue.includes(String(opt.value))}
                onChange={(e) => handleChange(e)}
                readOnly={readOnly}
                disabled={opt.disabled || disabled}
              />
              <div>{opt.label}</div>
            </label>
          );
        })}
    </InputWrapper>
  )
}