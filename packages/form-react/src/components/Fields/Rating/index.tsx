import React from "react";
import { Option } from "@sio-group/form-types";
import { RatingFieldProps } from "../../../types/field-props";
import InputWrapper from "../InputWrapper";
import { Icon } from "../../Icon";

export const Rating = ({
  value,
  onChange,

  options,
  showLabel,

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
}: RatingFieldProps) => {
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
      className={`${className ?? ''}`}
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
                type="radio"
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
              {showLabel && <div>{opt.label}</div>}
            </label>
          );
        })}
    </InputWrapper>
  )
}