import { FieldConfigMap } from "@sio/form-types";
import { ValidationRule } from "@sio/form-types/src/core/valudation-rule";

export type FieldType = keyof FieldConfigMap;

export type FieldState = {
  [K in FieldType]: {
    type: K;
    id: string;
    name: string;
    value: FieldConfigMap[T]['defaultValue'];

    validations: ValidationRule<T>[];
    errors: string[];

    touched: boolean;
    focused: boolean;
  } & FieldConfigMap[K]
}[FieldType];

export type FieldValue<T extends FieldType> = FieldState<T>['value'];