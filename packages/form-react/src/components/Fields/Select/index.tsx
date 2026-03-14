import { SelectOption } from "@sio-group/form-types";
import { SelectFieldProps } from "../../../types/field-props";
import InputWrapper from "../InputWrapper";
import { Icon } from "../../Icon";

export const Select = ({
  value,
  onChange,

  options,
  multiple,

  name,
  id,
  placeholder,
  label,
  required,
  autocomplete,
  setTouched,
  setFocused,
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
}: SelectFieldProps) => {
  const renderOption = (option: SelectOption) => {
    if (typeof option === 'string') {
      return <option value={option} key={option}>{option}</option>;
    }

    if ("options" in option) {
      return (
        <optgroup label={option.label} key={option.label}>
          {option.options.map(renderOption)}
        </optgroup>
      );
    }

    if (option.hide) return null;

    return (
      <option
        value={option.value}
        disabled={option.disabled}
        key={option.value}
      >
        {option.label}
      </option>
    )
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
      hasValue={value !== undefined && value !== null && value !== ''}
      hasError={errors.length > 0 && touched}
      errors={errors}
      className={`${className ?? ''} ${multiple ? 'form-field__select-multiple' : 'form-field__select-single'}`}
      style={style}>
      <Icon icon={icon} />
      <select
        name={name}
        id={id}
        value={value as string | string[]}
        autoComplete={autocomplete ? autocomplete : 'off'}
        onChange={e => {
          if (multiple) {
            const values = Array.from(e.target.selectedOptions).map(o => o.value);
            onChange(values);
          } else {
            onChange(e.target.value);
          }
        }}
        onBlur={() => {
          if (setTouched) setTouched(true);
          if (setFocused) setFocused(false);
        }}
        onFocus={() => {
          if (setFocused) setFocused(true);
        }}
        disabled={disabled}
        multiple={multiple}
        aria-label={label || placeholder}
      >
        {placeholder && <option value="" selected disabled>{placeholder}{!label && required ? ' *' : ''}</option>}
        {options.map(renderOption)}
      </select>
    </InputWrapper>
  )
}