import React from "react";
import { FieldProps } from "../../../types";
import InputWrapper from "../InputWrapper";
import { Icon } from "../../Icon";

export const Checkbox = ({
    value,
    onChange,

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
}: FieldProps) => {
  return (
    <InputWrapper
      type={type}
      id={id}
      description={description}
      required={required}
      focused={focused}
      disabled={disabled || readOnly}
      hasValue={value === true}
      hasError={errors.length > 0 && touched}
      errors={errors}
      className={className}
      style={style}
      hideLayout>
      <Icon icon={icon} />
      <label htmlFor={id}>
        <input
          name={name}
          type={type}
          id={id}
          checked={value as boolean}
          onChange={(e) => {
            onChange?.(e.target.checked);
            setTouched?.(true);
          }}
          readOnly={readOnly}
          disabled={disabled}
        />
        <div>{label}</div> {required && <span aria-hidden={true}>*</span>}
      </label>
    </InputWrapper>
  )
}