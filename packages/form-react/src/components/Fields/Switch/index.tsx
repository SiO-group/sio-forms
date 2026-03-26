import React from "react";
import { SwitchFieldProps } from "../../../types";
import InputWrapper from "../InputWrapper";
import { Icon } from "../../Icon";

export const Switch = ({
    value,
    onChange,
    onToggle,

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
}: SwitchFieldProps) => {
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
          type="checkbox"
          id={id}
          checked={value as boolean}
          onChange={(e) => {
            if (onToggle) {
              onToggle(e.target.checked);
            } else {
              onChange?.(e.target.checked);
              setTouched?.(true);
            }
          }}
          readOnly={readOnly}
          disabled={disabled}
        />
        <div>{label}</div> {required && <span aria-hidden={true}>*</span>}
      </label>
    </InputWrapper>
  )
}