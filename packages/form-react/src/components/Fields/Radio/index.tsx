import React from "react";
import { Option } from "@sio-group/form-types";
import { RadioFieldProps } from "../../../types/field-props";
import InputWrapper from "../InputWrapper";
import { Icon } from "../../Icon";

export const Radio = ({
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
}: RadioFieldProps) => {
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
      className={`${className ?? ''}${inline ? ' form-field__radio-inline' : ''}`}
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

          return (
            <label
              htmlFor={`${id}-${opt.value}`}
              key={opt.value}
              className={
                value === opt.value
                  ? 'form-field--has-value'
                  : ''
              }>
              <input
                name={name}
                type={type}
                id={`${id}-${opt.value}`}
                value={opt.value}
                checked={value === opt.value}
                onChange={() => {
                  if (onChange) onChange(opt.value);
                  if (setTouched) setTouched(true);
                }}
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