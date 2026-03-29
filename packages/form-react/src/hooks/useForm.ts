import { useCallback, useState } from "react";
import { useConnectionStatus } from "./useConnectionStatus";
import { FormField, ValidationRule } from "@sio-group/form-types";
import { slugify } from "../utils/slugify";
import { createFieldState } from "../utils/create-field-state";
import { createFieldProps } from "../utils/create-field-props";
import { FieldProps, UseFormOptions, FieldState, FieldSetters } from "../types";

export const  useForm = ({ disableWhenOffline }: UseFormOptions = { disableWhenOffline: true }) => {
  const isOnline: boolean = useConnectionStatus();

  const [fields, setFields] = useState<Record<string, FieldState>>({});
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isBusy, setIsBusy] = useState<boolean>(false);

  /**
   * Runs all validations for a field.
   * @param value
   * @param validations
   * @param label
   */
  const validateField = (value: unknown, validations: ValidationRule<any>[], label?: string): string[] => {
    return validations
      .map((validation: ValidationRule<any>): string | null => validation(value, label))
      .filter((error: string | null): error is string => !!error);
  }

  /**
   * Validates the entire form.
   */
  const validateForm = (): boolean => {
    return Object.values(fields).every((field: FieldState): boolean => field.errors?.length === 0);
  };

  /**
   * Register a field to the form.
   */
  const register = useCallback((name: string, config: FormField, renderLayout?: boolean): FieldProps => {
    if (!name) throw new Error('Field name is required');

    const id: string = slugify(name);

    const existing: FieldState = fields[name];
    const shouldCreate: boolean = !existing || existing.type !== config.type;

    let field: FieldState;
    if (shouldCreate) {
      field = createFieldState(name, id, config);
      setFields((prevState) => ({
        ...prevState,
        [name]: {
          ...field,
          errors: validateField(field.value, field.validations, field.label)
        }
      }));
    } else {
      field = existing;
    }

    const setters: FieldSetters = {
      handleChange: (value: unknown) => {
        setIsDirty(true);
        setFields((prevState) => {
          const current = prevState[name];
          if (!current) return prevState;

          return {
            ...prevState,
            [name]: {
              ...current,
              value,
              errors: validateField(value, current.validations, current.label)
            }
          };
        });
      },
      setFocused: (focused: boolean) => {
        setFields((prevState) => {
          const current: FieldState = prevState[name];
          if (!current) return prevState;

          return {
            ...prevState,
            [name]: {
              ...current,
              focused,
            },
          }
        });
      },
      setTouched: (touched: boolean) => {
        setFields((prevState) => {
          const current: FieldState = prevState[name];
          if (!current) return prevState;

          return {
            ...prevState,
            [name]: {
              ...current,
              touched,
            },
          }
        });
      },
      setErrors: (errors: string[]) => {
        setFields((prevState) => {
          const current: FieldState = prevState[name];
          if (!current) return prevState;

          return {
            ...prevState,
            [name]: {
              ...current,
              errors,
            },
          }
        });
      },
    };

    return createFieldProps(
      field,
      setters,
      config.config?.disabled || (!isOnline && disableWhenOffline),
      renderLayout
    );
  }, [disableWhenOffline, isOnline, fields]);

  /**
   * Unregister a field from the form.
   * @param name
   */
  const unregister = (name: string) => {
    setFields((prevState) => {
      const { [name]: _, ...rest } = prevState;
      return rest;
    });
  }

  /**
   * Set the value of a field.
   * @param name
   * @param value
   */
  const setValue = (name: string, value: unknown) => {
    if (fields[name]) {
      setFields((prevState) => {
        const current: FieldState = prevState[name];
        if (!current) return prevState;

        return {
          ...prevState,
          [name]: {
            ...current,
            value,
            errors: validateField(
              value,
              prevState[name].validations,
              prevState[name].label,
            ),
          },
        }
      });
    }
  };

  /**
   * Set the values of fields
   */
  const setValues = useCallback((updates: Record<string, unknown>) => {
    Object.entries(updates).forEach(([name, value]) => {
      setValue(name, value);
    });
  }, [setValue]);

  /**
   * Get all form values
   */
  const getValues = (): Record<string, any> => {
    return Object.keys(fields).reduce((acc: Record<string, any>, key: string) => {
      acc[key] = fields[key].value || null;
      return acc;
    }, {});
  }

  /**
   * Fet the value of a specific field by name.
   * @param name
   */
  const getValue = (name: string) => {
    return fields[name]?.value ?? null;
  }

  /**
   * Reset and rebuild the form.
   */
  const reset = () => {
    setFields({});
    setIsDirty(false);
    setIsBusy(false);
  }

  /**
   * Handle submit and submit state
   * @param onSubmit
   */
  const handleSubmit = async (onSubmit: (values: Record<string, any>) => void | Promise<void>): Promise<void> => {
    if (isBusy) return;

    try {
      setIsBusy(true);
      await onSubmit(getValues());
    } finally {
      setIsBusy(false);
    }
  }

  /**
   * Get e specific field
   * @param name
   */
  const getField = (name: string): FieldState | undefined => {
    return fields[name] || undefined;
  }

  return {
    register: register,
    unregister: unregister,
    setValue: setValue,
    setValues: setValues,
    getValues: getValues,
    getValue: getValue,
    reset: reset,
    isValid: validateForm,
    isDirty: () => isDirty,
    isBusy: () => isBusy,
    submit: handleSubmit,
    getField: getField,
  };
}