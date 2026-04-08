import { FieldConfigMap, FormField } from "@sio-group/form-types";
import { FieldState, FieldValue } from "../types";
import { ValidationRule } from "@sio-group/form-types/src/core/valudation-rule";
import {
  dateIsBiggerThan,
  dateIsSmallerThan,
  isBiggerThan,
  isEmail, isPattern,
  isRequired,
  isSmallerThan,
  isUrl
} from "@sio-group/form-validation";
import { parseDateValue } from "./parse-date";

export const createFieldState = (name: string, id: string, config: FormField): FieldState => {
  return {
    ...config.config,
    id,
    name,
    type: config.type,
    value: config.config?.defaultValue ?? getDefaultValue(config),
    validations: [
      ...(config.config?.validations ?? []),
      ...getDefaultValidations(config),
    ],
    errors: [],
    touched: false,
    focused: false,
  } as FieldState
}

function getDefaultValue<T extends keyof FieldConfigMap> (config: FormField): FieldValue<T> {
  switch (config.type) {
    case "checkbox":
      return false;
    case "range":
      return config.config.min ?? 0;
    case "select":
    case "selectable":
    case "creatable":
      return null;
    case "file":
    case "checkbox-group":
      return [];
    case "color":
      return "#000000";
    case "number":
    case "text":
    default:
      return "";
  }
}

function getDefaultValidations<T extends keyof FieldConfigMap>(config: FormField): ValidationRule<T>[] {
  const validations: ValidationRule<T>[] = [];

  if (config.config?.required) {
    validations.push(isRequired());
  }

  switch (config.type) {
    case 'email':
      validations.push(isEmail());
      break;

    case 'number':
    case 'range':
      if (config.config?.min) validations.push(isBiggerThan(config.config?.min));
      if (config.config?.max) validations.push(isSmallerThan(config.config?.max));
      break;

    case 'date':
    case 'datetime-local':
    case 'time':
      const min: string | undefined = config.config?.min;
      const max: string | undefined = config.config?.max;
      const parsedMin: Date | null = parseDateValue(min);
      const parsedMax: Date | null = parseDateValue(max);
      if (parsedMin) validations.push(dateIsBiggerThan(parsedMin));
      if (parsedMax) validations.push(dateIsSmallerThan(parsedMax));
      break;

    case 'url':
      if (config.config?.pattern) validations.push(isPattern(config.config.pattern));
      validations.push(
        isUrl(
          config.config?.allowLocalhost || false,
          config.config?.allowFtp || false,
          config.config?.secureOnly || !(config.config?.allowLocalhost || config.config?.allowFtp),
        ),
      );
      break;

    case 'text':
    case 'tel':
      if (config.config?.pattern) validations.push(isPattern(config.config.pattern));
      break;
  }

  return validations;
}