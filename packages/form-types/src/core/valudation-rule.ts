import { ValueType } from "./value-type";
import { FieldConfigMap } from "../fields";

export type ValidationRule<T extends keyof FieldConfigMap> = (value: ValueType<T>, label?: string) => string | null;