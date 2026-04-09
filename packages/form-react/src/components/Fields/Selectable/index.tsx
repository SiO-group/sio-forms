import { useState, useEffect, useMemo } from "react";
import { SelectOption, OptionGroup, Option } from "@sio-group/form-types";
import { SelectableFieldProps } from "../../../types/field-props";
import InputWrapper from "../InputWrapper";
import { Icon } from "../../Icon";
import type { ActionMeta } from 'react-select';
import Select from 'react-select';
import Creatable from 'react-select/creatable';

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
  const SelectComponent = type === 'creatable' ? Creatable : Select;

  const [opt, setOpt] = useState<(Option | OptionGroup)[]>(
    options.map((x: SelectOption) =>
      typeof x === 'string' ? { value: x, label: x } as Option : x
    ),
  );

  useEffect(() => {
    if (opt.length === 0 && options.length) {
      setOpt(
        options.map((x: SelectOption) =>
          typeof x === 'string' ? { value: x, label: x } : x,
        ),
      );
    }
  }, [options, opt]);

  function isOptionGroup(o: SelectOption): o is OptionGroup {
    return typeof o === 'object' && 'options' in o;
  }

  function isOption(o: SelectOption): o is Option {
    return typeof o === 'object' && 'value' in o;
  }

  const target = useMemo(() => {
    if (typeof portalTarget === "string") {
      const el = document.querySelector(portalTarget);
      return el instanceof HTMLElement ? el : document.body;
    }
    return portalTarget instanceof HTMLElement ? portalTarget : document.body;
  }, [portalTarget]);

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
        value={
          multiple
            ? opt
              .flatMap((item: Option | OptionGroup) => {
                if (isOptionGroup(item)) return item.options;
                if (isOption(item)) return item;
                return item;
              })
              .filter(option => {
                if (isOption(option)) return (value as any[])?.includes(option.value);
                return false;
              })
            : opt
            .flatMap((item: Option | OptionGroup) => {
              if (isOptionGroup(item)) return item.options;
              if (isOption(item)) return item;
              return item;
            })
            .find(option => {
              if (isOption(option)) return option.value === (value as any);
              return false;
            }) ?? null
        }
        onChange={(option: any, actionMeta: ActionMeta<any>) => {
          if (actionMeta.action === 'clear') {
            onChange('');
            return;
          }

          if (multiple) {
            onChange(
              option.map((o: any) => {
                if (o.__isNew__) {
                  setOpt(prev => [...prev, { label: o.label, value: o.value }]);
                }
                return o.value;
              }),
            );
          } else {
            if (option.__isNew__) {
              setOpt(prev => [...prev, { label: option.label, value: option.value }]);
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
          menuPortal: (base: any) => ({ ...base, zIndex: 9999999 }),
        }}
        menuPortalTarget={target}
        menuPosition='absolute'
      />
    </InputWrapper>
  );
};