import { BaseFieldProps, FieldProps, FieldState, FieldSetters } from "../types";
import { getColumnClasses } from "./get-column-classes";

export const createFieldProps = (field: FieldState, setters: FieldSetters, disabled: boolean, renderLayout: boolean = false): FieldProps => {
  const classes: string = getColumnClasses(field.layout, field.styling?.className);

  const baseProps: BaseFieldProps = {
    id: field.id,
    name: field.name,
    label: field.label,
    placeholder: field.placeholder,
    value: field.value,
    errors: field.errors,
    required: field.required,
    autocomplete: field.autocomplete,
    touched: field.touched,
    focused: field.focused,
    readOnly: field.readOnly,
    disabled,
    icon: field.icon,
    description: field.description,
    onChange: setters.handleChange,
    setFocused: setters.setFocused,
    setTouched: setters.setTouched,
    className: renderLayout ? classes : field.styling?.className,
    style: field.styling?.style,
  };

  if (field.type === 'textarea') {
    return {
      ...baseProps,
      type: field.type,
      rows: field.rows,
      cols: field.cols,
    }
  }

  if (field.type === "file") {
    return {
      ...baseProps,
      type: field.type,
      accept: field.accept,
      multiple: field.multiple ?? false,
      capture: field.capture ?? false,
      onError: setters.setErrors,
      filesize: field.filesize ?? 10240,
      onFileRemove: field.onFileRemove,
      onRemoveAll: field.onRemoveAll,
    };
  }

  if (field.type === "range" || field.type === "number") {
     const numberProps = {
      ...baseProps,
      type: field.type,
      min: field.min ?? Number.MIN_SAFE_INTEGER,
      max: field.max ?? Number.MAX_SAFE_INTEGER,
      step: field.step ?? 1,
    };

    if (field.type === "number") {
      return {
        ...numberProps,
        spinner: field.spinner ?? true,
      };
    }

    if (field.type === "range") {
      return {
        ...numberProps,
        showValue: field.showValue ?? true,
      };
    }
  }

  if(field.type === "date" || field.type === "time" || field.type === 'datetime-local') {
    return {
      ...baseProps,
      type: field.type,
      min: field.min ?? '',
      max: field.max ?? '',
      step: field.step ?? 1,
    };
  }

  if (field.type === "url") {
    return {
      ...baseProps,
      type: field.type,
      allowLocalhost: field.allowLocalhost ?? false,
      allowFtp: field.allowFtp ?? false,
      secureOnly: field.secureOnly ?? !(field.allowLocalhost || field.allowFtp),
    };
  }

  if (field.type === "select" || field.type === "creatable") {
    return {
      ...baseProps,
      type: field.type,
      options: field.options || [],
      multiple: field.multiple,
    };
  }

  if (field.type === "radio") {
    return {
      ...baseProps,
      type: field.type,
      options: field.options || [],
      inline: field.inline ?? false,
    };
  }

  if (field.type === "switch") {
    return {
      ...baseProps,
      type: field.type,
      onToggle: field.onToggle,
    };
  }

  if (field.type === "search") {
    return {
      ...baseProps,
      type: field.type,
      onSearch: field.onSearch,
    };
  }

  return { ...baseProps, type: field.type, };
}