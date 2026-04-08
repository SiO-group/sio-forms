import {useState, useEffect, useMemo} from "react";
import { SelectOption, OptionGroup, Option } from "@sio-group/form-types";
import { SelectableFieldProps } from "../../../types/field-props";
import InputWrapper from "../InputWrapper";
import { Icon } from "../../Icon";
import type { ActionMeta } from 'react-select';

export const Selectable = ({
  value,
  onChange,

  options,
  multiple,
  portalTarget = '#modal-root',

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
}: SelectableFieldProps) => {
  const [SelectComponent, setSelectComponent] = useState<any>(null);

  const [opt, setOpt] = useState<(Option | OptionGroup)[]>(
    options.map((x: SelectOption) => (typeof x === 'string' ? { value: x, label: x } as Option : x)),
  );

  useEffect(() => {
    if (type === 'creatable') {
      import('react-select/creatable')
        .then((mod) => setSelectComponent(mod.default))
        .catch(() => setSelectComponent(null))
    } else if (type === 'selectable') {
      import('react-select')
        .then((mod) => setSelectComponent(mod.default))
        .catch(() => setSelectComponent(null))
    }
  }, [type]);

  useEffect(() => {
    if (opt.length === 0 && options.length)
      setOpt(
        options.map((x: SelectOption) =>
          typeof x === 'string' ? { value: x, label: x } : x,
        ),
      );
  }, [options, opt]);

  function isOptionGroup(o: SelectOption): o is OptionGroup {
    return typeof o === 'object' && 'options' in o;
  }

  function isOption(o: SelectOption): o is Option {
    return typeof o === 'object' && 'value' in o;
  }

  const target = useMemo(() => {
    if (typeof portalTarget === "string") {
      return document.querySelector(portalTarget) ?? document.body;
    }

    return portalTarget ?? document.body;
  }, [portalTarget]);

  if (!SelectComponent) return;

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
      className={className ?? ''}
      style={style}>
      <Icon icon={icon} />
      <SelectComponent
        name={name}
        id={id}
        className="sio-select"
        classNamePrefix='sio-select'
        options={opt}
        isMulti={multiple}
        closeMenuOnSelect={!multiple}
        isClearable={!required}
        value={multiple
          ? opt
            .flatMap((item: Option | OptionGroup) => {
              if (isOptionGroup(item)) return item.options;
              if (isOption(item)) return item;
              return item
            })
            .filter(option => {
              if (isOption(option)) return (value as any[])?.includes(option.value);
              return;
            })
          : opt
            .flatMap((item: Option | OptionGroup) => {
              if (isOptionGroup(item)) return item.options;
              if (isOption(item)) return item;
              return item
            })
            .find(option => {
              if (isOption(option)) option.value === (value as any)
              return;
            })
        }
        onChange={(option: any, actionMeta: ActionMeta<any>) => {
          if (actionMeta.action === 'clear') {
            onChange('');
            return;
          }

          if (multiple) {
            onChange(
              option.map((option: any) => {
                if (option.__isNew__) {
                  setOpt([
                    ...opt,
                    {
                      label: option.label,
                      value: option.value,
                    },
                  ]);
                }

                return option.value;
              }),
            );
          } else {
            if (option.__isNew__) {
              setOpt([
                ...opt,
                { label: option.label, value: option.value },
              ]);
            }

            onChange(option.value);
          }
        }}

        onBlur={() => {
          setTouched?.(true);
          setFocused?.(false);
        }}
        onFocus={() => {
          setFocused?.(true);
        }}
        placeholder={placeholder}
        isDisabled={disabled}
        styles={{
          menuPortal: (base: any) => ({
            ...base,
            zIndex: 9999999,
          }),
        }}
        menuPortalTarget={target}
        menuPosition='absolute'
      />
    </InputWrapper>
  )
}