import { FieldConfigMap } from "./field-config-map";

export type FormField = {
  [K in keyof FieldConfigMap]: {
    name: string;
    type: K;
    config: FieldConfigMap[K];
  }
}[keyof FieldConfigMap]
